import { test, expect } from '@playwright/test';
import DashboardPage from '../pom/DashboardPage';
import LoginPage from '../pom/LoginPage.ts';
import NewRepositoryPage from '../pom/NewRepository.ts';
import { UserData } from '../test-data/messages/user-data.ts';

test.describe('Dashboard Page Tests', () => {

    let dashboardPage: DashboardPage
    let loginPage: LoginPage
    let newRepositoryPage: NewRepositoryPage

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page)
        loginPage = new LoginPage(page)
        newRepositoryPage = new NewRepositoryPage(page)
        await dashboardPage.goToLoginPage();
        await loginPage.login(UserData.USERNAME, UserData.PASSWORD)
    })

    test('Verify User Name in NavBar after Login', async () => {
        await expect(dashboardPage.navBarUserName).toHaveText(UserData.USERNAME);
    })

    test('Logout', async () => {
        await dashboardPage.logout()
        await expect(dashboardPage.logoutNavBar).toBeVisible();
    })

    test('Create New Repository form prompt', async ({ page }) => {
        await dashboardPage.createNewRepositoryTransition()
        expect(page.url()).toContain(newRepositoryPage.url);
    })

})