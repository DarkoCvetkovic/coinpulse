package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.FilesPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Files keywords: specs call these, never the page object directly.
 */
public class FilesKeywords {

    private final FilesPage filesPage;

    public FilesKeywords(WebDriver driver) {
        this.filesPage = new FilesPage(driver);
    }

    public void actionOpenFiles() {
        Allure.step("Open the files page", filesPage::open);
    }

    public void checkFilesShellReady() {
        Allure.step("Verify the upload and download cards render", filesPage::verifyShellReady);
    }
}
