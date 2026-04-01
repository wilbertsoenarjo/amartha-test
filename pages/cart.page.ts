import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async itemName(name: string) {
        return this.cartItem.filter({ hasText: name })
    }

    getItemByName(name: string): Locator {
        return this.cartItem.filter({
            has: this.page.locator('.inventory_item_name', { hasText: name })
        });
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async verifyProductsInCart(productItems: Array<{ name: string; description: string; price: string }>) {
        await expect(this.cartItem).toHaveCount(productItems.length);

        for (const expected of productItems) {
            const item = this.getItemByName(expected.name);

            await expect(item.locator('.inventory_item_name')).toHaveText(expected.name);
            await expect(item.locator('.inventory_item_desc')).toHaveText(expected.description);
            await expect(item.locator('.inventory_item_price')).toHaveText(expected.price);
        }
    }
}
