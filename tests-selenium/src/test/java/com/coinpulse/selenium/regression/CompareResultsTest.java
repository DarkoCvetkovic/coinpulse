package com.coinpulse.selenium.regression;

import com.coinpulse.selenium.constants.SeedData;
import com.coinpulse.selenium.constants.Users;
import com.coinpulse.selenium.core.BaseTest;
import com.coinpulse.selenium.keywords.CompareKeywords;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Regression: compare results. Two seeded coins compared by double-click show
 * the right overview metrics, charts, news headlines and FAQ behaviour.
 * Estimated execution time: ~20s.
 */
class CompareResultsTest extends BaseTest {

    private static final SeedData.SeedCoin BTC = SeedData.BTC;
    private static final SeedData.SeedCoin ETH = SeedData.ETH;

    private static final String PRICE_METRIC = "price";
    private static final String CHANGE_24H_METRIC = "change24h";
    private static final String RANK_METRIC = "rank";
    private static final String CATEGORY_METRIC = "category";
    private static final String LAUNCH_DATE_METRIC = "launchDate";

    private static final String CHART_TAB = "chart";
    private static final String NEWS_TAB = "news";

    private CompareKeywords compare;

    @BeforeEach
    void signInAndCompareTwoCoins() {
        loginViaApi(Users.standard());
        compare = new CompareKeywords(driver);
        compare.actionOpenCompare();
        compare.actionAddCoinByDoubleClick(BTC.symbol());
        compare.actionAddCoinByDoubleClick(ETH.symbol());
        compare.checkResultsShown();
    }

    @Test
    void showsSeededMetricsForTheComparedCoinsInTheOverviewTable() {
        compare.checkOverviewColumn(BTC.symbol(), BTC.name());
        compare.checkOverviewColumn(ETH.symbol(), ETH.name());
        compare.checkOverviewValue(PRICE_METRIC, BTC.symbol(), BTC.price());
        compare.checkOverviewValue(CHANGE_24H_METRIC, BTC.symbol(), BTC.change24h());
        compare.checkOverviewValue(RANK_METRIC, BTC.symbol(), BTC.rank());
        compare.checkOverviewValue(CATEGORY_METRIC, BTC.symbol(), BTC.category());
        compare.checkOverviewValue(LAUNCH_DATE_METRIC, BTC.symbol(), BTC.launchDate());
        compare.checkOverviewValue(PRICE_METRIC, ETH.symbol(), ETH.price());
    }

    @Test
    void rendersOnePriceChartPerComparedCoinOnTheChartTab() {
        int comparedCount = 2;

        compare.actionSelectCompareTab(CHART_TAB);
        compare.checkChartsRendered(comparedCount);
    }

    @Test
    void listsDeterministicHeadlinesOnTheNewsTab() {
        String btcHeadline = BTC.name() + " climbs 2.45% in 24 hours";
        String btcSecondHeadline = "What " + BTC.symbol() + " holders should know about the "
                + BTC.category() + " sector";

        compare.actionSelectCompareTab(NEWS_TAB);
        compare.checkNewsHeadline(BTC.id(), 1, btcHeadline);
        compare.checkNewsHeadline(BTC.id(), 2, btcSecondHeadline);
    }

    @Test
    void expandsAndCollapsesAnFaqAnswer() {
        String faqKey = "real";
        String faqFragment = "QA portfolio demo";

        compare.checkFaqAnswerHidden(faqKey);
        compare.actionToggleFaqItem(faqKey);
        compare.checkFaqAnswerShown(faqKey, faqFragment);
        compare.actionToggleFaqItem(faqKey);
        compare.checkFaqAnswerHidden(faqKey);
    }
}
