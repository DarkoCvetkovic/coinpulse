export type CoinStatus = 'active' | 'delisted'

export interface CoinInput {
  name: string
  symbol: string
  price: number
  marketCap?: number | null
  change24h?: number | null
  rank?: number | null
  category: string
  launchDate?: string | null
  status?: CoinStatus
  description?: string | null
  logoUrl?: string | null
}

export interface Coin extends CoinInput {
  id: number
  status: CoinStatus
}
