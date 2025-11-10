import BasePage from "./BasePage";
import { faker } from '@faker-js/faker'
import { Locator } from "@playwright/test";

export default class NewRepositoryPage extends BasePage {
    public url: string = '/repo/create'

    public repositoryNameField: Locator = this.page.locator('#repo_name')
    public createRepositoryButton: Locator = this.page.locator('.ui.primary.button')
    public repositoryDescriptionField: Locator = this.page.locator('#description')
    public settingsTab: Locator = this.page.locator('span[data-text="Settings"]')
    public createdRepositoryNameField: Locator = this.page.locator('label[for="_aria_label_input_31"]+input[name="repo_name"]')

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
}