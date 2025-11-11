import { expect, Locator, Page } from "@playwright/test";
import { RegisterMessages } from "../test-data/messages/register-messages";

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

    async checkEmptyErrorMessage(locator: Locator){
        await expect(locator).toHaveJSProperty('validity.valueMissing', true)
        await expect(locator).toHaveJSProperty('validationMessage', RegisterMessages.EMAIL_EMPTY_MESSAGE)
    }
}