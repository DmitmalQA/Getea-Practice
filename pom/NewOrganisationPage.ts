import BasePage from "./BasePage";
import { expect, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

export default class NewOrganisationPage extends BasePage {
    public url: string = '/org/create'

    public organisationNameField: Locator = this.page.locator('input#org_name')
    public createOrganisationButton: Locator = this.page.locator('.ui.primary.button')
    private privateOrgRadioButton: Locator = this.page.locator('#_aria_label_input_2')
    private limitedOrgRadioButton: Locator = this.page.locator('#_aria_label_input_1')
    private permissionsCheckbox: Locator = this.page.locator('#_aria_label_input_3')
    private settingsTab: Locator = this.page.locator('span[data-text="Settings"]')
    private visibilityButton: Locator = this.page.locator('button[data-modal="#change-visibility-org-modal"]')
    private limitedOrgVisibility: Locator = this.page.locator('input#_aria_label_input_2')
    private privateOrgVisibility: Locator = this.page.locator('input#_aria_label_input_3')
    private publicOrgVisibility: Locator = this.page.locator('input#_aria_label_input_1')
    private permissionsSetting: Locator = this.page.locator('input[name="repo_admin_change_team_access"]')
    private viewOrg: Locator = this.page.locator('.ui.primary.basic.button')
    public errorMessage: Locator = this.page.locator('.flash-error')

    async createPublicOrgAssigned(){
        let orgName = "AQA-TestOrg-"+faker.lorem.word()
        await this.organisationNameField.fill(orgName)
        await this.createOrganisationButton.click()
        expect (this.page.url()).toContain(`/org/${orgName}`)
    }

    async createSpecificOrg(orgName: string){
        await this.organisationNameField.fill(orgName)
        await this.createOrganisationButton.click()
    }   

    async createPrivateOrgAssigned(){
        let orgName = "AQA-TestOrg-"+faker.lorem.word()
        await this.organisationNameField.fill(orgName)
        await this.privateOrgRadioButton.check()
        await this.createOrganisationButton.click()
        expect (this.page.url()).toContain(`/org/${orgName}`)
    }

    async createLimitedOrgAssigned(){
        let orgName = "AQA-TestOrg-"+faker.lorem.word()
        await this.organisationNameField.fill(orgName)
        await this.limitedOrgRadioButton.check()
        await this.createOrganisationButton.click()
        expect (this.page.url()).toContain(`/org/${orgName}`)
    }

    async createPublicOrgWithoutPermissionsAssigned(){
        let orgName = "AQA-TestOrg-"+faker.lorem.word()
        await this.organisationNameField.fill(orgName)
        if (await this.permissionsCheckbox.isChecked()){
            await this.permissionsCheckbox.uncheck()
        } else {
            await this.permissionsCheckbox.check()
        }
        await this.createOrganisationButton.click()
        expect (this.page.url()).toContain(`/org/${orgName}`)
    }

    async goToSettingsTab(){
        await this.settingsTab.click()
    }

    async goToOrg(){
        await this.viewOrg.click()
    }
    
    async checkVisibility(visibility: string){
        await this.goToOrg()
        await this.goToSettingsTab()
        await this.visibilityButton.click()
        if (visibility === "limited"){
            await expect(this.limitedOrgVisibility).toBeChecked()
        } else if (visibility === "private") {
            await expect(this.privateOrgVisibility).toBeChecked()
        } else if (visibility === "public") {
            await expect(this.publicOrgVisibility).toBeChecked()
        }
    }

    async checkPermissions(setting: string){
        await this.goToOrg()
        await this.goToSettingsTab()
        if (setting === "enabled"){
            await expect(this.permissionsSetting).toBeChecked()
        } else if (setting === "disabled") {
            await expect(this.permissionsSetting).not.toBeChecked()
        }
    }
}