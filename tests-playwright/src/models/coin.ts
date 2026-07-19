export type CoinStatus = 'active' | 'delisted'

export interface Coin {
  id: number
  name: string
  symbol: string
  price: number
  marketCap: number
  change24h: number
  rank: number
  category: string
  launchDate: string
  status: CoinStatus
  description: string
  logoUrl: string
}

export interface CoinInput {
  name: string
  symbol: string
  price: number
  marketCap: number
  change24h: number
  rank: number
  category: string
  launchDate: string
  status: CoinStatus
  description: string
  logoUrl: string
}
