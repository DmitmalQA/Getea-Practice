import { expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class DashboardPage extends BasePage {
    public url: string = '/'
    public loginUrl: string = '/user/login?redirect_to=%2f'

    public successRegisttrationMessage: Locator = this.page.locator('.flash-success>p', { hasText: "Account was successfully created. Welcome!"})
    public navBarUserName: Locator = this.page.locator('.gt-ellipsis').first()
    public userMenuButton: Locator = this.page.locator('div[data-tooltip-content="Profile and Settings…"]')
    public logoutButton: Locator = this.page.locator('a[data-url="/user/logout"]')
    public userMenu: Locator = this.page.locator('.user-menu')
    public logoutNavBar: Locator = this.page.locator('.navbar-right')
    public createRepo: Locator = this.page.locator('a[data-tooltip-content="New Repository"]')
    public searchField: Locator = this.page.locator('input[type="search"]')
    public logoButton: Locator = this.page.locator('a#navbar-logo')


    async logout(){
        await this.userMenuButton.click()
        await expect(this.userMenu).toBeVisible()
        await this.logoutButton.click()
    }

    async createNewRepositoryTransition(){
        await this.createRepo.click()
    }

    async goToDashBoard(){
        await this.logoButton.click()
    }
}