import { test, expect } from '@playwright/test';

import DashboardPage from '../pom/DashboardPage';
import LoginPage from '../pom/LoginPage.ts';
import { UserData } from '../test-data/messages/user-data.ts';

test.describe('Login Page Tests', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigateTo();
    })

    test('Successful Login', async () => {
        await loginPage.login(UserData.USERNAME, UserData.PASSWORD);
        await expect(dashboardPage.navBarUserName).toHaveText(UserData.USERNAME);
    })

})