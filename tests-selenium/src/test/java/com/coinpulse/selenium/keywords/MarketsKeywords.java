package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.pages.MarketsPage;
import io.qameta.allure.Allure;
import org.openqa.selenium.WebDriver;

/**
 * Markets keywords: specs call these, never the page object directly.
 */
public class MarketsKeywords {

    private final MarketsPage marketsPage;

    public MarketsKeywords(WebDriver driver) {
        this.marketsPage = new MarketsPage(driver);
    }

    public void actionOpenMarkets() {
        Allure.step("Open the markets page", marketsPage::open);
    }

    public void actionSearchCoins(String term) {
        Allure.step("Search the markets table for: " + term,
                () -> marketsPage.search(term));
    }

    public void actionFilterByStatus(String status) {
        Allure.step("Filter markets by status: " + status,
                () -> marketsPage.filterByStatus(status));
    }

    public void actionSortBy(String column) {
        Allure.step("Sort the markets table by column: " + column,
                () -> marketsPage.sortBy(column));
    }

    public void actionToggleWatchlist(String symbol) {
        Allure.step("Toggle the watchlist star for coin: " + symbol,
                () -> marketsPage.toggleWatchlist(symbol));
    }

    public void actionCancelDeleteCoin(String symbol) {
        Allure.step("Open and cancel the delete confirmation for coin: " + symbol, () -> {
            marketsPage.openDeleteModal(symbol);
            marketsPage.cancelDelete();
        });
    }

    public void actionDeleteCoin(String symbol) {
        Allure.step("Delete coin " + symbol + " via the confirmation modal", () -> {
            marketsPage.openDeleteModal(symbol);
            marketsPage.confirmDelete();
        });
    }

    public void checkLandedOnMarkets() {
        Allure.step("Verify navigation to the markets page", marketsPage::awaitLoaded);
    }

    public void checkMarketsShellReady() {
        Allure.step("Verify the markets table, search and filters render",
                marketsPage::verifyShellReady);
    }

    public void checkFirstCoinRow(String symbol) {
        Allure.step("Verify the first market row is coin: " + symbol,
                () -> marketsPage.verifyFirstRow(symbol));
    }

    public void checkSortIndicator(String column, String direction) {
        Allure.step("Verify the " + column + " column shows the " + direction
                        + " sort indicator",
                () -> marketsPage.verifySortIndicator(column, direction));
    }

    public void checkCoinRowVisible(String symbol) {
        Allure.step("Verify the market row for coin " + symbol + " is visible",
                () -> marketsPage.verifyRowVisible(symbol));
    }

    public void checkCoinRowAbsent(String symbol) {
        Allure.step("Verify there is no market row for coin: " + symbol,
                () -> marketsPage.verifyRowAbsent(symbol));
    }

    public void checkMarketsEmptyState() {
        Allure.step("Verify the markets empty state is shown",
                marketsPage::verifyEmptyState);
    }

    public void checkWatchlistStarOn(String symbol) {
        Allure.step("Verify coin " + symbol + " is starred in the watchlist",
                () -> marketsPage.verifyWatchlistStarOn(symbol));
    }

    public void checkWatchlistStarOff(String symbol) {
        Allure.step("Verify coin " + symbol + " is not starred in the watchlist",
                () -> marketsPage.verifyWatchlistStarOff(symbol));
    }

    public void checkAdminControlsVisible(String symbol) {
        Allure.step("Verify admin add, edit and delete controls are visible for coin: "
                + symbol, () -> {
            marketsPage.verifyAddButtonVisible();
            marketsPage.verifyAdminActionsVisible(symbol);
        });
    }

    public void checkAdminControlsAbsent(String symbol) {
        Allure.step("Verify admin controls are hidden for a standard user, coin: "
                + symbol, () -> {
            marketsPage.verifyAddButtonAbsent();
            marketsPage.verifyAdminActionsAbsent(symbol);
        });
    }
}
