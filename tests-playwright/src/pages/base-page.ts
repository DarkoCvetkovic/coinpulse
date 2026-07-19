import type { Page } from '@playwright/test'

/**
 * Shared base for all page objects: holds the Playwright Page and the
 * navigation helper every POM builds on.
 */
export abstract class BasePage {
  constructor(readonly page: Page) {}

  protected async goto(path: string): Promise<void> {
    await this.page.goto(path)
  }
}
