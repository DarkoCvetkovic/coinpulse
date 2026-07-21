package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.core.Config;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Shared page plumbing: data-testid locators and explicit-wait helpers.
 * All waits go through WebDriverWait - never Thread.sleep.
 */
public abstract class BasePage {

    protected static final Duration DEFAULT_WAIT = Duration.ofSeconds(10);

    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, DEFAULT_WAIT);
    }

    protected static By byTestId(String id) {
        return By.cssSelector("[data-testid='" + id + "']");
    }

    protected void openPath(String path) {
        driver.get(Config.baseUrl() + path);
    }

    protected WebElement awaitVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected WebElement awaitEnabled(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    protected void type(By locator, String value) {
        WebElement element = awaitVisible(locator);
        element.clear();
        element.sendKeys(value);
    }

    protected boolean isVisible(By locator) {
        return awaitVisible(locator).isDisplayed();
    }
}
