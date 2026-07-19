/** Deterministic facts about the seeded coins (data.sql) that specs assert against. */
export const seedCoins = {
  btc: {
    id: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$64,250.00',
    change24h: '+2.45%',
    rank: '#1',
    category: 'L1',
    launchDate: '2009-01-03',
  },
  eth: {
    id: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,480.50',
    change24h: '+1.82%',
    rank: '#2',
    category: 'L1',
    launchDate: '2015-07-30',
  },
  sol: {
    id: 5,
    symbol: 'SOL',
    name: 'Solana',
    price: '$148.90',
    change24h: '+4.30%',
    rank: '#5',
    category: 'L1',
    launchDate: '2020-03-16',
  },
  link: {
    id: 12,
    symbol: 'LINK',
    name: 'Chainlink',
    price: '$14.85',
    change24h: '+3.15%',
    rank: '#12',
    category: 'oracle',
    launchDate: '2017-09-19',
  },
}

/** Watchlist seeded for standard_user, in insertion order. */
export const seedWatchlistSymbols = [
  seedCoins.btc.symbol,
  seedCoins.eth.symbol,
  seedCoins.sol.symbol,
  seedCoins.link.symbol,
]

/** Total number of seeded coins. */
export const seedCoinCount = 20
