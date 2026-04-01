import { expect, Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly finishButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly subtotalLabel: Locator;
    readonly itemPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    }

    async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async getItemTotal(): Promise<string> {
        return (await this.subtotalLabel.textContent()) ?? '';
    }

    async calculateItemTotal(): Promise<number> {
        const prices = await this.itemPrice.allTextContents()
        return prices.reduce((sum, price) => sum + Number(price.replace('$', '')), 0)
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}
