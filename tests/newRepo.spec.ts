import { test, expect } from '@playwright/test';
import DashboardPage from '../pom/DashboardPage';
import LoginPage from '../pom/LoginPage.ts';
import NewRepositoryPage from '../pom/NewRepository.ts';
import { faker } from '@faker-js/faker';
import RegisterPage from '../pom/registerPage.ts';

test.describe('New Repository Form Tests', () => {
    let dashboardPage: DashboardPage
    let loginPage: LoginPage
    let newRepositoryPage: NewRepositoryPage
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
        newRepositoryPage = new NewRepositoryPage(page)
        await dashboardPage.goToLoginPage();
        await loginPage.login(userName, password)
        await dashboardPage.createNewRepositoryTransition()
    })

    test('Create a default empty repository', async({ page }) => {
        const repoName = faker.lorem.word({ length: 10 })
        await newRepositoryPage.createNewRepository(repoName)
        expect (page.url()).toContain(`/${userName}/${repoName}`)
        await newRepositoryPage.goToSettingsTab()
        await expect(newRepositoryPage.createdRepositoryNameField).toHaveValue(repoName)
    })

    test('Create a repository with optional description', async({ page }) => {
        const repoName = faker.lorem.word({ length: 10 })
        const repoDescription = faker.lorem.sentence(15)
        await newRepositoryPage.createNewRepositoryWithDescription(repoName, repoDescription)
        expect (page.url()).toContain(`/${userName}/${repoName}`)
        await newRepositoryPage.goToSettingsTab()
        await expect(newRepositoryPage.createdRepositoryNameField).toHaveValue(repoName)
        await expect(newRepositoryPage.repositoryDescriptionField).toHaveValue(repoDescription)
    })

    test('Create repository with existing name', async () => {
        const repoName = faker.lorem.sentence(2)
        await newRepositoryPage.createNewRepository(repoName)
        await dashboardPage.goToDashBoard()
        await dashboardPage.createNewRepositoryTransition()
        await newRepositoryPage.createNewRepository(repoName)
        await expect(newRepositoryPage.repositoryNameError).toBeVisible()
    })

    test('Create Repository with empty name', async () => {
        await newRepositoryPage.createNewRepository('')
        await newRepositoryPage.checkEmptyErrorMessage(newRepositoryPage.repositoryNameField)
    })

    test('Create Repository with Issue Labels', async ({ page }) => {
        const repoName = faker.lorem.word({ length: 12 })
        await newRepositoryPage.repositoryIssuesLabelField.click()
        await newRepositoryPage.repositoryIssuesAdvancedLabels.click()
        await newRepositoryPage.createNewRepository(repoName)
        expect (page.url()).toContain(`/${userName}/${repoName}`)
        await newRepositoryPage.goToIssuesTab()
        await expect(newRepositoryPage.labelsDropdown).toBeEnabled()
    })
})