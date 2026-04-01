/**
 * Test Suite: Complete Order Process
 *
 * Pre-condition:
 *   - User 1 (standard_user) is used for all tests
 *   - Login is performed before each test via beforeEach
 *
 * Test Cases:
 *
 * TC-01: Complete order process — Sauce Labs Backpack + Sauce Labs Bolt T-Shirt
 *   Step 1  - Add "Sauce Labs Backpack" and "Sauce Labs Bolt T-Shirt" to the cart
 *   Step 2  - Verify the cart badge shows the correct number of added items
 *   Step 3  - Navigate to the cart page
 *   Step 4  - Verify both products are listed in the cart
 *   Step 5  - Click Checkout
 *   Step 6  - Fill in checkout info (first name, last name, postal code) from user fixture
 *   Step 7  - Dynamically calculate the expected item total from listed product prices
 *   Step 8  - Verify the displayed item total matches the calculated total
 *   Step 9  - Click Finish to complete the order
 *   Step 10 - Verify the URL navigates to /checkout-complete
 *   Step 11 - Verify the confirmation header reads "Thank you for your order!"
 *   Step 12 - Click Back Home button
 *   Step 13 - Verify the URL returns to /inventory and the cart badge is gone
 *
 * TC-02: Complete order process — Sauce Labs Backpack + Sauce Labs Fleece Jacket
 *   Step 1  - Add "Sauce Labs Backpack" and "Sauce Labs Fleece Jacket" to the cart
 *   Step 2  - Verify the cart badge shows the correct number of added items
 *   Step 3  - Navigate to the cart page
 *   Step 4  - Verify both products are listed in the cart
 *   Step 5  - Click Checkout
 *   Step 6  - Fill in checkout info (first name, last name, postal code) from user fixture
 *   Step 7  - Dynamically calculate the expected item total from listed product prices
 *   Step 8  - Verify the displayed item total matches the calculated total
 *   Step 9  - Click Finish to complete the order
 *   Step 10 - Verify the URL navigates to /checkout-complete
 *   Step 11 - Verify the confirmation header reads "Thank you for your order!"
 *   Step 12 - Click Back Home button
 *   Step 13 - Verify the URL returns to /inventory and the cart badge is gone
 */

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { users } from "../../fixtures/data/user.data";
import { ProductPage } from "../../pages/product.page";
import { products } from "../../fixtures/data/product.data";
import { CartPage } from "../../pages/cart.page";
import { CheckoutPage } from "../../pages/checkout.page";
import { CheckoutOverviewPage } from "../../pages/checkout-overview.page";
import { CheckoutCompletePage } from "../../pages/checkout-complete.page";

const loginUser = users["User 1"]
const selectedProducts = [
    products["Sauce Labs Backpack"],
    products["Sauce Labs Bolt T-Shirt"],
]
const secondSelectedProducts = [
    products["Sauce Labs Backpack"],
    products["Sauce Labs Fleece Jacket"],
]

let login: LoginPage
let product: ProductPage
let cart: CartPage
let checkout: CheckoutPage
let checkoutOverview: CheckoutOverviewPage
let checkoutComplete: CheckoutCompletePage

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page)
    product = new ProductPage(page)
    cart = new CartPage(page)
    checkout = new CheckoutPage(page)
    checkoutOverview = new CheckoutOverviewPage(page)
    checkoutComplete = new CheckoutCompletePage(page)
    await login.visitLandingPage()

    await login.login(loginUser.email, loginUser.password)
    await expect(page).toHaveURL(/inventory/)
});

test.describe("Complete order process", () => {
    test("Should be able to complete order process of Sauce Labs Backpack and Sauce Labs Bolt T-Shirt", async ({ page }) => {
        await product.clickAddToCart(selectedProducts.map(p => p.name))
        await expect(product.cartBadge).toHaveText(String(selectedProducts.length))

        await product.goToCart()
        await cart.verifyProductsInCart(selectedProducts)
        await cart.clickCheckout()

        await checkout.fillCheckoutInfo(loginUser.firstName, loginUser.lastName, loginUser.postalCode)

        const expectedTotal = await checkoutOverview.calculateItemTotal()
        const itemTotal = await checkoutOverview.getItemTotal()
        expect(itemTotal).toBe(`Item total: $${expectedTotal}`)
        await checkoutOverview.finishOrder()

        await expect(page).toHaveURL(/checkout-complete/)
        await expect(checkoutComplete.completeHeader).toHaveText('Thank you for your order!')
        await checkoutComplete.clickBackHomeButton()

        await expect(page).toHaveURL(/inventory/)
        await expect(product.cartBadge).not.toBeAttached()
    });

    test("Should be able to complete order process of Sauce Labs Backpack and Sauce Labs Fleece Jacket", async ({ page }) => {
        await product.clickAddToCart(secondSelectedProducts.map(p => p.name))
        await expect(product.cartBadge).toHaveText(String(secondSelectedProducts.length))

        await product.goToCart()
        await cart.verifyProductsInCart(secondSelectedProducts)
        await cart.clickCheckout()

        await checkout.fillCheckoutInfo(loginUser.firstName, loginUser.lastName, loginUser.postalCode)

        const expectedTotal = await checkoutOverview.calculateItemTotal()
        const itemTotal = await checkoutOverview.getItemTotal()
        expect(itemTotal).toBe(`Item total: $${expectedTotal}`)
        await checkoutOverview.finishOrder()

        await expect(page).toHaveURL(/checkout-complete/)
        await expect(checkoutComplete.completeHeader).toHaveText('Thank you for your order!')
        await checkoutComplete.clickBackHomeButton()

        await expect(page).toHaveURL(/inventory/)
        await expect(product.cartBadge).not.toBeAttached()
    });
})
