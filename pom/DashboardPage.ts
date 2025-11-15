import { expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import { faker } from "@faker-js/faker";
import NewRepositoryPage from "./NewRepositoryPage";

export default class DashboardPage extends BasePage {
    public url: string = '/'
    public loginUrl: string = '/user/login?redirect_to=%2f'

    public successRegisttrationMessage: Locator = this.page.locator('.flash-success>p', { hasText: "Account was successfully created. Welcome!"})
    public navBarUserName: Locator = this.page.locator('.gt-ellipsis').first()
    public userMenuButton: Locator = this.page.locator('div[data-tooltip-content="Profile and Settings…"]')
    public logoutButton: Locator = this.page.locator('a[data-url="/user/logout"]')
    public userMenu: Locator = this.page.locator('.user-menu')
    public logoutNavBar: Locator = this.page.locator('.navbar-right')
    private createRepo: Locator = this.page.locator('a[data-tooltip-content="New Repository"]')
    public searchField: Locator = this.page.locator('input[type="search"]')
    public logoButton: Locator = this.page.locator('a#navbar-logo')
    public firstSearchResult: Locator = this.page.locator('.tw-py-2').first()
    public paginationNumber: Locator = this.page.locator('.active.item.tw-py-1')
    public paginationNext: Locator = this.page.locator('a[title="Next"]')
    public paginationPrevious: Locator = this.page.locator('a[title="Previous"]')
    private orgTab: Locator = this.page.locator('div.ui.two.item.menu>a.item', {hasText: "Organization"})
    private orgCreate: Locator = this.page.locator('a[data-tooltip-content="New Organization"]')

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
    
    async goToDetectedRepo(){
        await this.firstSearchResult.click()
    }

    async goToNextPaginationPage(){
        await this.paginationNext.click()
    }

    async goToPreviousPaginationPage(){
        await this.paginationPrevious.click()
    }

    async checkWorkingPagination(){
        await expect(this.paginationNumber).toHaveText("1")
        await this.goToNextPaginationPage()
        await expect(this.paginationNumber).toHaveText("2")
        await this.goToPreviousPaginationPage()
        await expect(this.paginationNumber).toHaveText("1")
    }

    async createManyRepositories(number: number, newRepositoryPage: NewRepositoryPage){
        for (let i = 0; i < number; i++){
            let repoName = "AQA-Test-"+faker.lorem.word()
            await this.createNewRepositoryTransition()
            await newRepositoryPage.createNewRepository(repoName)
            await this.goToDashBoard()
        }
    }

    async createSingularRepository(newRepositoryPage: NewRepositoryPage){
        let repoName = "AQA-Test-"+faker.lorem.word()
        await this.createNewRepositoryTransition()
        await newRepositoryPage.createNewRepository(repoName)
        await this.goToDashBoard()
        return repoName
    }

    async createNewOrganisationTransition(){
        await this.orgTab.click()
        await this.orgCreate.click()
    }
}