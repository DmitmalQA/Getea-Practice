import { test, expect } from '@playwright/test';

import DashboardPage from '../pom/DashboardPage';
import LoginPage from '../pom/LoginPage.ts';
import { UserData } from '../test-data/messages/user-data.ts';
import RegisterPage from '../pom/registerPage.ts';
import { faker } from '@faker-js/faker';

test.describe('Login Page Tests', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
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
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.navigateTo();
    })

    test('Successful Login', async () => {
        await loginPage.login(userName, password);
        await expect(dashboardPage.navBarUserName).toHaveText(userName);
    })

})