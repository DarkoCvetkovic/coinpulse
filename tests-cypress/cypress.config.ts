import { plugin as cypressGrepPlugin } from '@cypress/grep/plugin'
import { defineConfig } from 'cypress'
import mochawesomePlugin from 'cypress-mochawesome-reporter/plugin'

const DEFAULT_BASE_URL = 'http://localhost:5173'
const DEFAULT_BACKEND_URL = 'http://localhost:8080'

const EXPOSED_ENV_KEYS = [
  'BACKEND_URL',
  'STANDARD_USERNAME',
  'STANDARD_PASSWORD',
  'LOCKED_USERNAME',
  'LOCKED_PASSWORD',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'grep',
  'grepTags',
  'grepBurn',
  'grepUntagged',
  'grepOmitFiltered',
  'grepFilterSpecs',
] as const

function collectExposedConfig(env: Record<string, unknown>) {
  return Object.fromEntries(EXPOSED_ENV_KEYS.flatMap(key => (key in env ? [[key, env[key]]] : [])))
}

export default defineConfig({
  allowCypressEnv: false,
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  viewportWidth: 1440,
  viewportHeight: 900,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: '[status]_[datetime]-[name]-report',
    timestamp: 'longDate',
    reportPageTitle: 'CoinPulse E2E',
    reportTitle: 'CoinPulse - Cypress E2E',
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    code: false,
  },
  e2e: {
    baseUrl: DEFAULT_BASE_URL,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      BACKEND_URL: DEFAULT_BACKEND_URL,
    },
    setupNodeEvents(on, config) {
      mochawesomePlugin(on)
      cypressGrepPlugin(config)
      config.expose = { ...(config.expose ?? {}), ...collectExposedConfig(config.env) }

      return config
    },
  },
})
