import { test, expect } from '@playwright/test';
import DashboardPage from '../pom/DashboardPage';
import LoginPage from '../pom/LoginPage.ts';
import NewRepositoryPage from '../pom/NewRepository.ts';
import { UserData } from '../test-data/messages/user-data.ts';
import { faker } from '@faker-js/faker';

test.describe('New Repository Form Tests', () => {
    let dashboardPage: DashboardPage
    let loginPage: LoginPage
    let newRepositoryPage: NewRepositoryPage

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page)
        loginPage = new LoginPage(page)
        newRepositoryPage = new NewRepositoryPage(page)
        await dashboardPage.goToLoginPage();
        await loginPage.login(UserData.USERNAME, UserData.PASSWORD)
        await dashboardPage.createNewRepositoryTransition()
    })

    test('Create a default empty repository', async({ page }) => {
        const repoName = faker.lorem.word({ length: 10 })
        await newRepositoryPage.createNewRepository(repoName)
        expect (page.url()).toContain(`/${UserData.USERNAME}/${repoName}`)
        await newRepositoryPage.goToSettingsTab()
        await expect(newRepositoryPage.createdRepositoryNameField).toHaveValue(repoName)
    })

    test('Create a repository with optional description', async({ page }) => {
        const repoName = faker.lorem.word({ length: 10 })
        const repoDescription = faker.lorem.sentence(15)
        await newRepositoryPage.createNewRepositoryWithDescription(repoName, repoDescription)
        expect (page.url()).toContain(`/${UserData.USERNAME}/${repoName}`)
        await newRepositoryPage.goToSettingsTab()
        await expect(newRepositoryPage.createdRepositoryNameField).toHaveValue(repoName)
        await expect(newRepositoryPage.repositoryDescriptionField).toHaveValue(repoDescription)
    })

    
})