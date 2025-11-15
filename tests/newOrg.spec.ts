import { test, expect } from '@playwright/test';
import DashboardPage from '../pom/DashboardPage';
import RegisterPage from '../pom/registerPage.ts';
import LoginPage from '../pom/LoginPage.ts';
import { faker } from '@faker-js/faker';
import NewOrganisationPage from '../pom/NewOrganisationPage.ts';

test.describe('New Organisation Page Tests', () => {

    let dashboardPage: DashboardPage
    let loginPage: LoginPage
    let newOrganisationPage: NewOrganisationPage
    let registerPage: RegisterPage
    const userName = faker.internet.username()
    const password = faker.internet.password({ length: 10 })
    const userEmail = `dmitmal+${Date.now()}@qamadness.com`

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage()
        registerPage = new RegisterPage(page)
        await registerPage.navigateTo()
        await registerPage.register(userName, userEmail, password, password)
        await page.close()
    })

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page)
        loginPage = new LoginPage(page)
        newOrganisationPage = new NewOrganisationPage(page)
        await dashboardPage.goToLoginPage();
        await loginPage.login(userName, password)
        await dashboardPage.createNewOrganisationTransition()
    })

    test('Create Organisation with Standard Parameters', async() => {
        await newOrganisationPage.createPublicOrgAssigned()
        await newOrganisationPage.checkVisibility("public")
    })

    test('Create a Limited Organisation', async() => {
        await newOrganisationPage.createLimitedOrgAssigned()
        await newOrganisationPage.checkVisibility("limited")
    })

    test('Create a Private Organisation', async() => {
        await newOrganisationPage.createPrivateOrgAssigned()
        await newOrganisationPage.checkVisibility("private")
    })

    test('Create an Organisation without Permissions', async() => {
        await newOrganisationPage.createPublicOrgWithoutPermissionsAssigned()
        await newOrganisationPage.checkPermissions("disabled")
    })

    test('Create Organisation with already Existing Name', async() => {
        const repoName = "AQA-Test-"+faker.lorem.word()
        await newOrganisationPage.createSpecificOrg(repoName)
        await dashboardPage.goToDashBoard()
        await dashboardPage.createNewOrganisationTransition()
        await newOrganisationPage.createSpecificOrg(repoName)
        await expect(newOrganisationPage.errorMessage).toContainText(/already taken/)
    })
})