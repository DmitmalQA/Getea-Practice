import { Page } from "@playwright/test";

export default class BasePage {

    page: Page
    url: string
    loginUrl: string

    constructor(page: Page) {
        this.page = page
        this.url = ''
        this.loginUrl = ''
    }

    async navigateTo() {
        await this.page.goto(this.url)
    }

    async goToLoginPage(){
        await this.page.goto(this.loginUrl)
    }
}