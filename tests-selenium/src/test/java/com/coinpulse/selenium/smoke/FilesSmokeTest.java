package com.coinpulse.selenium.smoke;

import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.FilesKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Smoke: files page. Signs in as the standard user over the API and verifies
 * the upload and download cards render.
 * Estimated execution time: ~6s.
 */
class FilesSmokeTest extends BaseTest {

    private FilesKeywords files;

    @BeforeEach
    void signIn() {
        loginViaApi(Users.standard());
        files = new FilesKeywords(driver);
    }

    @Test
    void rendersTheUploadAndDownloadCards() {
        files.actionOpenFiles();
        files.checkFilesShellReady();
    }
}
