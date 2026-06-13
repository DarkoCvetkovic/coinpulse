import { apiPaths } from '../../constants/routes'
import { users } from '../../constants/users'
import type { Coin, CoinInput } from '../../models/coin'
import { apiToken } from '../../utils/core/api'
import { backendUrl } from '../../utils/core/backend'

Cypress.Commands.add('createCoin', (coin: CoinInput) =>
  apiToken(users.admin).then(token =>
    cy
      .request<Coin>({
        method: 'POST',
        url: backendUrl(apiPaths.coins),
        headers: { Authorization: `Bearer ${token}` },
        body: coin,
      })
      .then(response => response.body),
  ),
)
