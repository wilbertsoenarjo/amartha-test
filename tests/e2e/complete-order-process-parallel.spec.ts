/**
 * Test Suite: Complete Order Process — Parallel (Two Users Simultaneously)
 *
 * Pre-condition:
 *   - User 1 (standard_user) and User 2 (performance_glitch_user) are used in separate tests
 *   - Both tests run in parallel (test.describe.configure({ mode: 'parallel' }))
 *   - Each test manages its own isolated browser session and page object instances
 *   - Login is performed at the start of each individual test
 *
 * Test Cases:
 *
 * TC-01: User 1 — Complete order process — Sauce Labs Backpack + Sauce Labs Bolt T-Shirt
 *   Step 1  - Navigate to the landing page and log in as User 1 (standard_user)
 *   Step 2  - Verify the URL contains /inventory after login
 *   Step 3  - Add "Sauce Labs Backpack" and "Sauce Labs Bolt T-Shirt" to the cart
 *   Step 4  - Verify the cart badge shows the correct number of added items
 *   Step 5  - Navigate to the cart page
 *   Step 6  - Verify both products are listed in the cart
 *   Step 7  - Click Checkout
 *   Step 8  - Fill in checkout info (first name, last name, postal code) from User 1 fixture
 *   Step 9  - Dynamically calculate the expected item total from listed product prices
 *   Step 10 - Verify the displayed item total matches the calculated total
 *   Step 11 - Click Finish to complete the order
 *   Step 12 - Verify the URL navigates to /checkout-complete
 *   Step 13 - Verify the confirmation header reads "Thank you for your order!"
 *   Step 14 - Click Back Home button
 *   Step 15 - Verify the URL returns to /inventory and the cart badge is gone
 *
 * TC-02: User 2 — Complete order process — Sauce Labs Backpack + Sauce Labs Fleece Jacket
 *   Step 1  - Navigate to the landing page and log in as User 2 (performance_glitch_user)
 *   Step 2  - Verify the URL contains /inventory after login
 *   Step 3  - Add "Sauce Labs Backpack" and "Sauce Labs Fleece Jacket" to the cart
 *   Step 4  - Verify the cart badge shows the correct number of added items
 *   Step 5  - Navigate to the cart page
 *   Step 6  - Verify both products are listed in the cart
 *   Step 7  - Click Checkout
 *   Step 8  - Fill in checkout info (first name, last name, postal code) from User 2 fixture
 *   Step 9  - Dynamically calculate the expected item total from listed product prices
 *   Step 10 - Verify the displayed item total matches the calculated total
 *   Step 11 - Click Finish to complete the order
 *   Step 12 - Verify the URL navigates to /checkout-complete
 *   Step 13 - Verify the confirmation header reads "Thank you for your order!"
 *   Step 14 - Click Back Home button
 *   Step 15 - Verify the URL returns to /inventory and the cart badge is gone
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

const user1 = users["User 1"]
const user2 = users["User 2"]

const selectedProducts = [
    products["Sauce Labs Backpack"],
    products["Sauce Labs Bolt T-Shirt"],
]
const secondSelectedProducts = [
    products["Sauce Labs Backpack"],
    products["Sauce Labs Fleece Jacket"],
]

test.describe("Complete order process parallel", () => {
    test.describe.configure({ mode: 'parallel' })

    test("User 1 should be able to complete order process of Sauce Labs Backpack and Sauce Labs Bolt T-Shirt", async ({ page }) => {
        const login = new LoginPage(page)
        const product = new ProductPage(page)
        const cart = new CartPage(page)
        const checkout = new CheckoutPage(page)
        const checkoutOverview = new CheckoutOverviewPage(page)
        const checkoutComplete = new CheckoutCompletePage(page)

        await login.visitLandingPage()
        await login.login(user1.email, user1.password)
        await expect(page).toHaveURL(/inventory/)

        await product.clickAddToCart(selectedProducts.map(p => p.name))
        await expect(product.cartBadge).toHaveText(String(selectedProducts.length))

        await product.goToCart()
        await cart.verifyProductsInCart(selectedProducts)
        await cart.clickCheckout()

        await checkout.fillCheckoutInfo(user1.firstName, user1.lastName, user1.postalCode)

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

    test("User 2 should be able to complete order process of Sauce Labs Backpack and Sauce Labs Fleece Jacket", async ({ page }) => {
        const login = new LoginPage(page)
        const product = new ProductPage(page)
        const cart = new CartPage(page)
        const checkout = new CheckoutPage(page)
        const checkoutOverview = new CheckoutOverviewPage(page)
        const checkoutComplete = new CheckoutCompletePage(page)

        await login.visitLandingPage()
        await login.login(user2.email, user2.password)
        await expect(page).toHaveURL(/inventory/)

        await product.clickAddToCart(secondSelectedProducts.map(p => p.name))
        await expect(product.cartBadge).toHaveText(String(secondSelectedProducts.length))

        await product.goToCart()
        await cart.verifyProductsInCart(secondSelectedProducts)
        await cart.clickCheckout()

        await checkout.fillCheckoutInfo(user2.firstName, user2.lastName, user2.postalCode)

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
