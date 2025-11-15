import { test, expect } from '@playwright/test';
import DashboardPage from '../pom/DashboardPage';
import RegisterPage from '../pom/registerPage.ts';
import LoginPage from '../pom/LoginPage.ts';
import { faker } from '@faker-js/faker';
import NewRepositoryPage from '../pom/NewRepositoryPage.ts';

test.describe('Dashboard Page Tests', () => {

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
    })

    test('Verify User Name in NavBar after Login', async () => {
        await expect(dashboardPage.navBarUserName).toHaveText(userName);
    })

    test('Logout', async () => {
        await dashboardPage.logout()
        await expect(dashboardPage.logoutNavBar).toBeVisible();
    })

    test('Create New Repository form prompt', async ({ page }) => {
        await dashboardPage.createNewRepositoryTransition()
        expect(page.url()).toContain(newRepositoryPage.url);
    })

    test('Search Repository from existing', async () => {
        const repoName = await dashboardPage.createSingularRepository(newRepositoryPage)
        await dashboardPage.searchField.fill(repoName)
        await expect(dashboardPage.firstSearchResult).toContainText(repoName)
    })

    test('Go to repository from the list', async ({ page }) => {
        const repoName = await dashboardPage.createSingularRepository(newRepositoryPage)
        await dashboardPage.searchField.fill(repoName)
        await dashboardPage.goToDetectedRepo()
        expect(page.url()).toContain(repoName)
    })

    test('Change the pages of repository list', async() => {
        await dashboardPage.createManyRepositories(17, newRepositoryPage)
        await dashboardPage.checkWorkingPagination()
    })
})