/**
 * Test Suite: Product Sorting
 *
 * Pre-condition:
 *   - User 1 (standard_user) is used for all tests
 *   - Login is performed before each test via beforeEach
 *
 * Test Cases:
 *
 * TC-01: Sort product by Name (A to Z)
 *   Step 1 - Select sort option "Name (A to Z)" from the sort dropdown
 *   Step 2 - Verify the product list is displayed in ascending alphabetical order by name
 *
 * TC-02: Sort product by Name (Z to A)
 *   Step 1 - Select sort option "Name (Z to A)" from the sort dropdown
 *   Step 2 - Verify the product list is displayed in descending alphabetical order by name
 *
 * TC-03: Sort product by Price (low to high)
 *   Step 1 - Select sort option "Price (low to high)" from the sort dropdown
 *   Step 2 - Verify the product list is displayed in ascending order by price
 *
 * TC-04: Sort product by Price (high to low)
 *   Step 1 - Select sort option "Price (high to low)" from the sort dropdown
 *   Step 2 - Verify the product list is displayed in descending order by price
 */

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { users } from "../../fixtures/data/user.data";
import { ProductPage } from "../../pages/product.page";

const loginUser = users["User 1"]

let login: LoginPage
let product: ProductPage

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page)
    product = new ProductPage(page)
    await login.visitLandingPage()

    await login.login(loginUser.email, loginUser.password)
    await expect(page).toHaveURL(/inventory/)
});

test.describe("Sort product by name", () => {
    test("Should be able to sort product with name (A to Z)", async () => {
        await product.sortName("Name (Z to A)")
        await product.verifySort("Name (A to Z)")
    });

    test("Should be able to sort product with name (Z to A)", async () => {
        await product.sortName("Name (Z to A)")
        await product.verifySort("Name (Z to A)")
    });
})

test.describe("Sort product by price", () => {
    test("Should be able to sort product with price (low to high)", async () => {
        // console.log(product.productPrice)
        await product.sortPrice("Price (low to high)")
        await product.verifyPriceSort("Price (low to high)")
    });

    test("Should be able to sort product with price (high to low)", async () => {
        await product.sortPrice("Price (high to low)")
        await product.verifyPriceSort("Price (high to low)")
    });
})
