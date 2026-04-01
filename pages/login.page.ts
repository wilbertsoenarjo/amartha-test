import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly logo: Locator
    readonly emailPlaceholder: Locator
    readonly passwordPlaceholder: Locator
    readonly submitButton: Locator


    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByText("Swag Labs")
        this.emailPlaceholder = page.getByPlaceholder("Username")
        this.passwordPlaceholder = page.getByPlaceholder("Password")
        this.submitButton = page.getByRole("button", { name: "Login" })
    }

    async visitLandingPage() {
        await this.page.goto("/");
        await expect(this.logo).toBeVisible()
    }

    async login(username: string, password: string) {
        await this.emailPlaceholder.fill(username)
        await this.passwordPlaceholder.fill(password)
        await this.submitButton.click()
    }
}
