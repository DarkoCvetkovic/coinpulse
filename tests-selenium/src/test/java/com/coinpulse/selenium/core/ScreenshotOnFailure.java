package com.coinpulse.selenium.core;

import io.qameta.allure.Allure;
import org.junit.jupiter.api.extension.AfterTestExecutionCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.ByteArrayInputStream;
import java.util.function.Supplier;

/**
 * Attaches a screenshot to the Allure report when a test fails. Runs before
 * the @AfterEach driver quit, so the browser is still alive.
 */
public final class ScreenshotOnFailure implements AfterTestExecutionCallback {

    private final Supplier<WebDriver> driver;

    public ScreenshotOnFailure(Supplier<WebDriver> driver) {
        this.driver = driver;
    }

    @Override
    public void afterTestExecution(ExtensionContext context) {
        if (context.getExecutionException().isEmpty()) {
            return;
        }
        WebDriver activeDriver = driver.get();
        if (activeDriver == null) {
            return;
        }
        byte[] screenshot = ((TakesScreenshot) activeDriver).getScreenshotAs(OutputType.BYTES);
        Allure.addAttachment("failure-screenshot", "image/png",
                new ByteArrayInputStream(screenshot), ".png");
    }
}
