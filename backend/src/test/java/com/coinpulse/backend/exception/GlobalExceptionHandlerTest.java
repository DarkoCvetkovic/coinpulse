package com.coinpulse.backend.exception;

import com.coinpulse.backend.exception.GlobalExceptionHandler.ApiError;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.mock.http.MockHttpInputMessage;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.server.ResponseStatusException;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionHandlerTest {

    private static final String NOT_FOUND_MESSAGE = "Coin 999 not found";
    private static final String CONFLICT_MESSAGE = "Username already exists";
    private static final String FORBIDDEN_REASON = "Admin role required";

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void notFoundMapsTo404WithMessage() {
        ResponseEntity<ApiError> response = handler.handleNotFound(new NotFoundException(NOT_FOUND_MESSAGE));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isEqualTo(new ApiError(404, NOT_FOUND_MESSAGE, null));
    }

    @Test
    void conflictMapsTo409WithMessage() {
        ResponseEntity<ApiError> response = handler.handleConflict(new ConflictException(CONFLICT_MESSAGE));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
        assertThat(response.getBody()).isEqualTo(new ApiError(409, CONFLICT_MESSAGE, null));
    }

    @Test
    void validationErrorsMapTo422WithFieldMessages() throws Exception {
        ResponseEntity<ApiError> response = handler.handleValidation(validationException(
                new FieldError("request", "username", "must not be blank"),
                new FieldError("request", "password", "size must be between 8 and 64")));

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNPROCESSABLE_ENTITY);
        assertThat(response.getBody().status()).isEqualTo(422);
        assertThat(response.getBody().message()).isEqualTo("Validation failed");
        assertThat(response.getBody().errors())
                .containsEntry("username", "must not be blank")
                .containsEntry("password", "size must be between 8 and 64");
    }

    @Test
    void validationKeepsFirstMessagePerField() throws Exception {
        ResponseEntity<ApiError> response = handler.handleValidation(validationException(
                new FieldError("request", "username", "must not be blank"),
                new FieldError("request", "username", "size must be between 3 and 50")));

        assertThat(response.getBody().errors()).containsEntry("username", "must not be blank");
    }

    @Test
    void unreadableBodyMapsTo400() {
        HttpMessageNotReadableException exception =
                new HttpMessageNotReadableException("boom", new MockHttpInputMessage(new byte[0]));

        ResponseEntity<ApiError> response = handler.handleUnreadable(exception);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isEqualTo(new ApiError(400, "Malformed request body", null));
    }

    @Test
    void responseStatusExceptionKeepsItsStatusAndReason() {
        ResponseStatusException exception = new ResponseStatusException(HttpStatus.FORBIDDEN, FORBIDDEN_REASON);

        ResponseEntity<ApiError> response = handler.handleResponseStatus(exception);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
        assertThat(response.getBody()).isEqualTo(new ApiError(403, FORBIDDEN_REASON, null));
    }

    @Test
    void uploadTooLargeMapsTo413() {
        ResponseEntity<ApiError> response = handler.handleUploadTooLarge();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.PAYLOAD_TOO_LARGE);
        assertThat(response.getBody()).isEqualTo(new ApiError(413, "Uploaded file is too large", null));
    }

    private MethodArgumentNotValidException validationException(FieldError... fieldErrors) throws Exception {
        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(new Object(), "request");
        for (FieldError fieldError : fieldErrors) {
            bindingResult.addError(fieldError);
        }
        MethodParameter parameter = new MethodParameter(
                getClass().getDeclaredMethod("dummyEndpoint", String.class), 0);
        return new MethodArgumentNotValidException(parameter, bindingResult);
    }

    @SuppressWarnings("unused")
    private void dummyEndpoint(String body) {
    }
}
