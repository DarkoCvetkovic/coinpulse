package com.coinpulse.selenium.keywords;

import com.coinpulse.selenium.api.ApiClient;
import com.coinpulse.selenium.api.Coin;
import com.coinpulse.selenium.api.CoinInput;
import com.coinpulse.selenium.api.TransactionSummary;
import com.coinpulse.selenium.constants.Users;
import io.qameta.allure.Allure;

import java.util.Comparator;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * API keywords for hybrid tests: seed and verify backend state around UI
 * steps. Specs call these, never ApiClient directly.
 */
public class ApiKeywords {

    public Coin actionSeedCoin(CoinInput coin) {
        return Allure.step("Seed coin via the API: " + coin.symbol(),
                () -> ApiClient.createCoin(coin));
    }

    public void actionDeleteCoinViaApi(Coin coin) {
        Allure.step("Delete coin via the API: " + coin.symbol(),
                () -> ApiClient.deleteCoin(coin.id()));
    }

    public void actionSeedTransaction(Users.Credentials user, long coinId, String type,
                                      String amount, String price, String date) {
        Allure.step("Seed a " + type + " transaction via the API for coin id: " + coinId,
                () -> ApiClient.createTransaction(
                        ApiClient.loginToken(user.username(), user.password()),
                        coinId, type, amount, price, date));
    }

    public int actionGetTransactionCount(Users.Credentials user) {
        return Allure.step("Read the transaction count over the API",
                () -> ApiClient.getTransactions(
                        ApiClient.loginToken(user.username(), user.password())).size());
    }

    public void checkLatestTransaction(Users.Credentials user, int expectedCount,
                                       String symbol, String type, double amount) {
        Allure.step("Verify the API lists " + expectedCount + " transactions and the "
                + "newest is a " + type + " of " + amount + " " + symbol, () -> {
            List<TransactionSummary> transactions = ApiClient.getTransactions(
                    ApiClient.loginToken(user.username(), user.password()));
            assertThat(transactions).hasSize(expectedCount);
            TransactionSummary latest = transactions.stream()
                    .max(Comparator.comparingLong(TransactionSummary::id))
                    .orElseThrow();
            assertThat(latest.coinSymbol()).isEqualTo(symbol);
            assertThat(latest.type()).isEqualTo(type);
            assertThat(latest.amount()).isEqualTo(amount);
        });
    }

    public void checkWatchlistExcludesCoin(Users.Credentials user, long coinId) {
        Allure.step("Verify the watchlist API no longer lists coin id: " + coinId,
                () -> assertThat(ApiClient.getWatchlistCoinIds(
                        ApiClient.loginToken(user.username(), user.password())))
                        .doesNotContain(coinId));
    }

    public void checkCoinAbsentFromApi(String symbol) {
        Allure.step("Verify the coins API no longer finds symbol: " + symbol,
                () -> assertThat(ApiClient.searchCoinSymbols(symbol))
                        .doesNotContain(symbol));
    }
}
