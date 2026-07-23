package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.ComparePage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Compare keywords: specs call these, never the page object directly.
 */
public class CompareKeywords {

    private final ComparePage comparePage;

    public CompareKeywords(WebDriver driver) {
        this.comparePage = new ComparePage(driver);
    }

    public void actionOpenCompare() {
        Allure.step("Open the compare page", comparePage::open);
    }

    public void actionAddCoinByDoubleClick(String symbol) {
        Allure.step("Add coin " + symbol + " to the compare zone by double-click",
                () -> comparePage.addByDoubleClick(symbol));
    }

    public void actionSelectCompareTab(String key) {
        Allure.step("Switch the compare results to the " + key + " tab",
                () -> comparePage.selectTab(key));
    }

    public void actionToggleFaqItem(String key) {
        Allure.step("Toggle the FAQ accordion item: " + key,
                () -> comparePage.toggleFaq(key));
    }

    public void checkCompareShellReady() {
        Allure.step("Verify the compare watchlist, zone card and drop area render",
                comparePage::verifyShellReady);
    }

    public void checkResultsShown() {
        Allure.step("Verify the compare results card is shown",
                comparePage::verifyResultsShown);
    }

    public void checkOverviewColumn(String symbol, String coinName) {
        Allure.step("Verify the overview table has a column for " + coinName,
                () -> comparePage.verifyOverviewColumn(symbol, coinName));
    }

    public void checkOverviewValue(String metric, String symbol, String expected) {
        Allure.step("Verify overview metric " + metric + " for " + symbol + " is: "
                        + expected,
                () -> comparePage.verifyOverviewValue(metric, symbol, expected));
    }

    public void checkChartsRendered(int count) {
        Allure.step("Verify the chart tab renders " + count + " price charts",
                () -> comparePage.verifyChartCount(count));
    }

    public void checkNewsHeadline(long coinId, int ordinal, String headline) {
        Allure.step("Verify news headline " + ordinal + " for coin id " + coinId,
                () -> comparePage.verifyNewsHeadline(coinId, ordinal, headline));
    }

    public void checkFaqAnswerShown(String key, String textFragment) {
        Allure.step("Verify the FAQ answer for " + key + " is expanded",
                () -> comparePage.verifyFaqAnswerShown(key, textFragment));
    }

    public void checkFaqAnswerHidden(String key) {
        Allure.step("Verify the FAQ answer for " + key + " is collapsed",
                () -> comparePage.verifyFaqAnswerHidden(key));
    }
}
