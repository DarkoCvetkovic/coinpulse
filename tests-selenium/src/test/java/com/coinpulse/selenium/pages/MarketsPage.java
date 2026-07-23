package com.coinpulse.selenium.pages;

import com.coinpulse.selenium.constants.Routes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Markets page object; selectors mirror the Cypress markets page object.
 */
public class MarketsPage extends BasePage {

    private static final By PAGE = byTestId("markets-page");
    private static final By TABLE = byTestId("markets-table");
    private static final By SEARCH = byTestId("markets-search");
    private static final By FILTER_CATEGORY = byTestId("markets-filter-category");
    private static final By FILTER_STATUS = byTestId("markets-filter-status");
    private static final By EMPTY = byTestId("markets-empty");
    private static final By ADD_BUTTON = byTestId("coin-add-button");
    private static final By DELETE_MODAL = byTestId("coin-delete-modal");
    private static final By DELETE_CANCEL = byTestId("coin-delete-cancel");
    private static final By DELETE_CONFIRM = byTestId("coin-delete-confirm");
    private static final By FIRST_ROW = By.cssSelector("[data-testid='markets-table'] tbody tr");

    private static final String ROW_TESTID_PREFIX = "markets-row-";
    private static final String STAR_ON_CLASS = "markets__star--on";
    private static final String SORT_ASC_INDICATOR = "▲";
    private static final String SORT_DESC_INDICATOR = "▼";

    public MarketsPage(WebDriver driver) {
        super(driver);
    }

    private static By row(String symbol) {
        return byTestId(ROW_TESTID_PREFIX + symbol);
    }

    private static By sortHeader(String column) {
        return byTestId("markets-sort-" + column);
    }

    private static By watchlistToggle(String symbol) {
        return byTestId("watchlist-toggle-" + symbol);
    }

    private static By editButton(String symbol) {
        return byTestId("coin-edit-" + symbol);
    }

    private static By deleteButton(String symbol) {
        return byTestId("coin-delete-" + symbol);
    }

    public void open() {
        openPath(Routes.MARKETS);
        awaitVisible(PAGE);
        awaitVisible(TABLE);
    }

    public void awaitLoaded() {
        awaitVisible(PAGE);
        awaitVisible(TABLE);
        awaitPath(Routes.MARKETS);
    }

    public void verifyShellReady() {
        awaitVisible(TABLE);
        awaitVisible(SEARCH);
        awaitVisible(FILTER_CATEGORY);
    }

    public void search(String term) {
        type(SEARCH, term);
    }

    public void filterByStatus(String status) {
        selectByValue(FILTER_STATUS, status);
    }

    public void sortBy(String column) {
        click(sortHeader(column));
    }

    public void toggleWatchlist(String symbol) {
        click(watchlistToggle(symbol));
    }

    public void openDeleteModal(String symbol) {
        click(deleteButton(symbol));
        awaitVisible(DELETE_MODAL);
    }

    public void cancelDelete() {
        click(DELETE_CANCEL);
        awaitAbsent(DELETE_MODAL);
    }

    public void confirmDelete() {
        click(DELETE_CONFIRM);
        awaitAbsent(DELETE_MODAL);
    }

    public void verifyFirstRow(String symbol) {
        wait.until(ExpectedConditions.attributeToBe(FIRST_ROW, "data-testid",
                ROW_TESTID_PREFIX + symbol));
    }

    public void verifySortIndicator(String column, String direction) {
        awaitTextContains(sortHeader(column),
                "asc".equals(direction) ? SORT_ASC_INDICATOR : SORT_DESC_INDICATOR);
    }

    public void verifyRowVisible(String symbol) {
        awaitVisible(row(symbol));
    }

    public void verifyRowAbsent(String symbol) {
        awaitAbsent(row(symbol));
    }

    public void verifyEmptyState() {
        awaitVisible(EMPTY);
    }

    public void verifyWatchlistStarOn(String symbol) {
        wait.until(d -> d.findElement(watchlistToggle(symbol))
                .getAttribute("class").contains(STAR_ON_CLASS));
    }

    public void verifyWatchlistStarOff(String symbol) {
        wait.until(d -> !d.findElement(watchlistToggle(symbol))
                .getAttribute("class").contains(STAR_ON_CLASS));
    }

    public void verifyAddButtonVisible() {
        awaitVisible(ADD_BUTTON);
    }

    public void verifyAddButtonAbsent() {
        awaitAbsent(ADD_BUTTON);
    }

    public void verifyAdminActionsVisible(String symbol) {
        awaitVisible(editButton(symbol));
        awaitVisible(deleteButton(symbol));
    }

    public void verifyAdminActionsAbsent(String symbol) {
        awaitVisible(row(symbol));
        awaitAbsent(editButton(symbol));
        awaitAbsent(deleteButton(symbol));
    }
}
