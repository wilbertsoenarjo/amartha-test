import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly productItem: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator

    constructor(page: Page) {
        this.page = page;
        this.productItem = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]')
        this.productName = page.locator('[data-test="inventory-item-name"]')
        this.productPrice = page.locator('[data-test="inventory-item-price"]')
    }

    async clickAddToCart(names: string[]) {
        for (const name of names) {
            await this.productItem.filter({ hasText: name }).getByRole('button', { name: 'Add to cart' }).click();
        }
    }

    async goToCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/cart/);
    }

    async sortName(option: "Name (A to Z)" | "Name (Z to A)") {
        await this.sortDropdown.selectOption(option)
    }

    async sortPrice(option: "Price (low to high)" | "Price (high to low)") {
        await this.sortDropdown.selectOption(option)
    }

    async verifySort(option: "Name (A to Z)" | "Name (Z to A)") {
        const sortedProductList = await this.productName.allInnerTexts()
        const serverSortedProductList = option === "Name (A to Z)" ? [...sortedProductList].sort() : [...sortedProductList].sort().reverse()

        expect(sortedProductList).toEqual(serverSortedProductList)
    }

    async verifyPriceSort(option: "Price (low to high)" | "Price (high to low)") {
        const sortedProductList = (await this.productPrice.allInnerTexts()).map(text => text.replace('$', ''));
        const serverSortedProductList =
            option === "Price (low to high)"
                ? [...sortedProductList].sort((a, b) => Number(a) - Number(b))
                : [...sortedProductList].sort((a, b) => Number(b) - Number(a))

        expect(sortedProductList).toEqual(serverSortedProductList)
    }
}
