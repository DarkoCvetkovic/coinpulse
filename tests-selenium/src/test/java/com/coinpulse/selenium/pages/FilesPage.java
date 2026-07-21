package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Files page object; selectors mirror the Cypress files page object.
 */
public class FilesPage extends BasePage {

    private static final By PAGE = byTestId("files-page");
    private static final By UPLOAD_CARD = byTestId("upload-card");
    private static final By DOWNLOAD_CARD = byTestId("download-card");
    private static final By DOWNLOAD_CSV = byTestId("download-csv");

    public FilesPage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        openPath(Routes.FILES);
        awaitVisible(PAGE);
    }

    public void verifyShellReady() {
        awaitVisible(UPLOAD_CARD);
        awaitVisible(DOWNLOAD_CARD);
        awaitVisible(DOWNLOAD_CSV);
    }
}
