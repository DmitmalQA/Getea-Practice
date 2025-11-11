import BasePage from "./BasePage";
import { expect, Locator } from "@playwright/test";
import { RegisterMessages } from "../test-data/messages/register-messages";

export default class NewRepositoryPage extends BasePage {
    public url: string = '/repo/create'

    public repositoryNameField: Locator = this.page.locator('#repo_name')
    public createRepositoryButton: Locator = this.page.locator('.ui.primary.button')
    public repositoryDescriptionField: Locator = this.page.locator('#description')
    public settingsTab: Locator = this.page.locator('span[data-text="Settings"]')
    public createdRepositoryNameField: Locator = this.page.locator('label[for="_aria_label_input_31"]+input[name="repo_name"]')
    public repositoryNameError: Locator = this.page.locator('.flash-error>p', { hasText: /name is already used/})
    //public repositoryIssuesLabelField: Locator = this.page.locator('input[aria-activedescendant="_aria_dropdown_item_25"]')
    public repositoryIssuesLabelField: Locator = this.page.locator('div.ui.search').nth(1)
    public repositoryIssuesLabelDropdown: Locator = this.page.locator('#_aria_dropdown_menu_24')
    public repositoryIssuesAdvancedLabels: Locator = this.page.locator('div[data-value="Advanced"]')
    public issuesTab: Locator = this.page.locator('span[data-text="Issues"]')
    public labelsDropdown: Locator = this.page.locator('div[aria-activedescendant="_aria_dropdown_item_15"]')

    async createNewRepository(repoName: string){
        await this.repositoryNameField.fill(repoName)
        await this.createRepositoryButton.click()
    }

    async createNewRepositoryWithDescription(repoName: string, repoDescription: string){
        await this.repositoryNameField.fill(repoName)
        await this.repositoryDescriptionField.fill(repoDescription)
        await this.createRepositoryButton.click()
    }

    async goToSettingsTab(){
        await this.settingsTab.click()
    }

    async goToIssuesTab(){
        await this.issuesTab.click()
    }


}