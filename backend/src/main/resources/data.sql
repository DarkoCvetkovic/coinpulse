-- CoinPulse deterministic seed data.
-- Executed at startup (after Hibernate creates the schema) and by POST /api/test/reset.
-- Passwords are BCrypt hashes of: standard_user/locked_user -> Test123!, admin -> Admin123!

INSERT INTO users (id, username, password, role, locked) VALUES
(1, 'standard_user', '$2a$10$1j0dtqWAihV97Xv3fVLKiuwt/qOiojY/67TvuJg1ul5hTxrFrA5qC', 'USER', FALSE),
(2, 'locked_user', '$2a$10$1j0dtqWAihV97Xv3fVLKiuwt/qOiojY/67TvuJg1ul5hTxrFrA5qC', 'USER', TRUE),
(3, 'admin', '$2a$10$WJecbenNSY3zmBv2cWCDI.060/p6ZszXS0AvO1d.G6LrIt4m1pTde', 'ADMIN', FALSE);

INSERT INTO coins (id, name, symbol, price, market_cap, change24h, market_rank, category, launch_date, status, description, logo_url) VALUES
(1, 'Bitcoin', 'BTC', 64250.00000000, 1265000000000.00, 2.45, 1, 'L1', '2009-01-03', 'active', 'The first and largest cryptocurrency by market cap.', '/logos/btc.png'),
(2, 'Ethereum', 'ETH', 3480.50000000, 418000000000.00, 1.82, 2, 'L1', '2015-07-30', 'active', 'Smart contract platform powering most of DeFi.', '/logos/eth.png'),
(3, 'Tether', 'USDT', 1.00000000, 112000000000.00, 0.01, 3, 'stablecoin', '2014-10-06', 'active', 'US dollar pegged stablecoin.', '/logos/usdt.png'),
(4, 'BNB', 'BNB', 585.20000000, 86000000000.00, -0.75, 4, 'exchange', '2017-07-08', 'active', 'Native token of the BNB Chain ecosystem.', '/logos/bnb.png'),
(5, 'Solana', 'SOL', 148.90000000, 69000000000.00, 4.30, 5, 'L1', '2020-03-16', 'active', 'High-throughput L1 blockchain.', '/logos/sol.png'),
(6, 'XRP', 'XRP', 0.52000000, 29000000000.00, -1.20, 6, 'payments', '2012-06-02', 'active', 'Token of the XRP Ledger payment network.', '/logos/xrp.png'),
(7, 'USD Coin', 'USDC', 1.00000000, 33000000000.00, 0.00, 7, 'stablecoin', '2018-09-26', 'active', 'Fully reserved US dollar stablecoin.', '/logos/usdc.png'),
(8, 'Cardano', 'ADA', 0.45000000, 16000000000.00, 0.95, 8, 'L1', '2017-09-29', 'active', 'Proof-of-stake blockchain with research-driven development.', '/logos/ada.png'),
(9, 'Dogecoin', 'DOGE', 0.16000000, 23000000000.00, 6.80, 9, 'meme', '2013-12-06', 'active', 'The original meme coin.', '/logos/doge.png'),
(10, 'TRON', 'TRX', 0.12000000, 10500000000.00, 0.40, 10, 'L1', '2017-09-13', 'active', 'Blockchain focused on content and entertainment.', '/logos/trx.png'),
(11, 'Avalanche', 'AVAX', 36.70000000, 14000000000.00, -2.10, 11, 'L1', '2020-09-21', 'active', 'L1 platform with subnet architecture.', '/logos/avax.png'),
(12, 'Chainlink', 'LINK', 14.85000000, 8700000000.00, 3.15, 12, 'oracle', '2017-09-19', 'active', 'Decentralized oracle network.', '/logos/link.png'),
(13, 'Polkadot', 'DOT', 7.20000000, 9300000000.00, -0.55, 13, 'L1', '2020-05-26', 'active', 'Multichain network connecting parachains.', '/logos/dot.png'),
(14, 'Polygon', 'MATIC', 0.72000000, 6700000000.00, 1.05, 14, 'L2', '2019-04-26', 'active', 'Ethereum scaling ecosystem.', '/logos/matic.png'),
(15, 'Shiba Inu', 'SHIB', 0.00002500, 14700000000.00, 8.90, 15, 'meme', '2020-08-01', 'active', 'Meme token with a large community.', '/logos/shib.png'),
(16, 'Litecoin', 'LTC', 84.30000000, 6200000000.00, 0.65, 16, 'payments', '2011-10-13', 'active', 'Early Bitcoin fork for cheaper payments.', '/logos/ltc.png'),
(17, 'Uniswap', 'UNI', 9.80000000, 5900000000.00, -1.85, 17, 'DeFi', '2020-09-17', 'active', 'Token of the largest decentralized exchange.', '/logos/uni.png'),
(18, 'Cosmos', 'ATOM', 8.40000000, 3300000000.00, 2.70, 18, 'L1', '2019-03-14', 'active', 'Ecosystem of interoperable blockchains.', '/logos/atom.png'),
(19, 'Terra Classic', 'LUNC', 0.00008000, 480000000.00, -5.40, 19, 'L1', '2019-04-24', 'delisted', 'Original Terra chain token, delisted after the 2022 collapse.', '/logos/lunc.png'),
(20, 'FTX Token', 'FTT', 1.25000000, 410000000.00, -3.20, 20, 'exchange', '2019-05-08', 'delisted', 'Token of the defunct FTX exchange, delisted.', '/logos/ftt.png');

INSERT INTO transactions (id, user_id, coin_id, type, amount, price, tx_date, note) VALUES
(1, 1, 1, 'buy', 0.05000000, 58300.00000000, '2026-01-12', 'First DCA buy of the year'),
(2, 1, 1, 'buy', 0.03000000, 61150.00000000, '2026-02-10', 'Monthly DCA'),
(3, 1, 2, 'buy', 1.20000000, 3105.00000000, '2026-02-18', 'ETH position open'),
(4, 1, 5, 'buy', 10.00000000, 132.40000000, '2026-03-05', 'SOL after dip'),
(5, 1, 9, 'buy', 5000.00000000, 0.12500000, '2026-03-21', 'Fun money'),
(6, 1, 2, 'sell', 0.40000000, 3690.00000000, '2026-04-02', 'Partial profit taking'),
(7, 1, 12, 'buy', 25.00000000, 13.10000000, '2026-04-15', 'LINK accumulation'),
(8, 1, 5, 'sell', 4.00000000, 155.20000000, '2026-05-08', 'Rebalancing'),
(9, 1, 8, 'buy', 300.00000000, 0.41000000, '2026-05-20', 'ADA starter position'),
(10, 1, 1, 'buy', 0.02000000, 63800.00000000, '2026-06-01', 'Monthly DCA'),
(11, 3, 2, 'buy', 2.00000000, 3400.00000000, '2026-05-14', 'Admin demo transaction'),
(12, 3, 17, 'buy', 50.00000000, 10.25000000, '2026-05-28', 'Admin demo transaction');

INSERT INTO watchlist_items (id, user_id, coin_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 5),
(4, 1, 12),
(5, 3, 2);

-- Keep identity counters clear of seeded ids so new inserts never collide,
-- both at startup and after every /api/test/reset.
ALTER TABLE users ALTER COLUMN id RESTART WITH 1000;
ALTER TABLE coins ALTER COLUMN id RESTART WITH 1000;
ALTER TABLE transactions ALTER COLUMN id RESTART WITH 1000;
ALTER TABLE watchlist_items ALTER COLUMN id RESTART WITH 1000;
