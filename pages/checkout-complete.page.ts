import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
    readonly page: Page;
    readonly backHomeButton: Locator
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]')
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click()
    }
}
