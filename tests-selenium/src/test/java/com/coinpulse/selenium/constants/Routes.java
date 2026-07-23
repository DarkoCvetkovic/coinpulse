package com.coinpulse.selenium.constants;

/**
 * Frontend route paths - keep in sync with
 * tests-cypress/cypress/support/constants/routes.ts.
 */
public final class Routes {

    public static final String LOGIN = "/login";
    public static final String DASHBOARD = "/dashboard";
    public static final String MARKETS = "/markets";
    public static final String TRADE = "/trade";
    public static final String COMPARE = "/compare";
    public static final String API_EXPLORER = "/api-explorer";
    public static final String FILES = "/files";
    public static final String DYNAMIC = "/dynamic";
    public static final String COIN_NEW = "/coins/new";

    public static String coinEdit(long id) {
        return "/coins/" + id + "/edit";
    }

    private Routes() {
    }
}
