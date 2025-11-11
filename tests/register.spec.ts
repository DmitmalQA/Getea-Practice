import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterMessages } from '../test-data/messages/register-messages.ts';

import DashboardPage from '../pom/DashboardPage';
import RegisterPage  from '../pom/registerPage';


test.describe('Register Page Tests', () => {

    let registerPage: RegisterPage;
    let dashboardPage: DashboardPage;
    let url: string

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        dashboardPage = new DashboardPage(page);
        await registerPage.navigateTo();
        url = page.url()
    })

    test('Successful Register', async () => {
        const randomUserName = faker.internet.username()
        const randomEmail = `dmitmal+${Date.now()}@qamadness.com`
        const password = faker.internet.password({ length: 10 })

        await registerPage.register(randomUserName, randomEmail,  password, password);
        await expect(dashboardPage.successRegisttrationMessage).toBeVisible();
        await expect(dashboardPage.navBarUserName).toHaveText(randomUserName);
    })

    test('Username is empty', async ({ }) => {
        const randomEmail = `dmitmal+${Date.now()}@qamadness.com`
        const password = faker.internet.password({ length: 10 })

        await registerPage.register('', randomEmail,  password, password);
        await registerPage.checkEmptyErrorMessage(registerPage.userNameField)
        expect(url).toContain(registerPage.url)
    })

    test('Email is empty', async ({ }) => {
        const password = faker.internet.password({ length: 10 })

        await registerPage.register(faker.internet.username(), '',  password, password);
        await registerPage.checkEmptyErrorMessage(registerPage.emailField)
        expect(url).toContain(registerPage.url)
    })

    test('Email format is incorrect', async ({ }) => {
        const password = faker.internet.password({ length: 10 })

        await registerPage.register(faker.internet.username(), 'dmitmalqamadness.com',  password, password);
        await expect(registerPage.emailField).toHaveJSProperty('validity.typeMismatch', true)
        await expect(registerPage.emailField).toHaveJSProperty('validationMessage', RegisterMessages.EMAIL_INCORRECT_FORMAT_MESSAGE)
        expect(url).toContain(registerPage.url)
    })

    test('Password is empty', async ({ }) => {

        await registerPage.register(faker.internet.username(), `dmitmal+${Date.now()}@qamadness.com`,  '', '');
        await registerPage.checkEmptyErrorMessage(registerPage.passwordField)
        expect(url).toContain(registerPage.url)
    })

    test('Confirm Password is empty', async ({ }) => {
        const password = faker.internet.password({ length: 10 })
        await registerPage.register(faker.internet.username(), `dmitmal+${Date.now()}@qamadness.com`,  password, '');
        await registerPage.checkEmptyErrorMessage(registerPage.confirmPasswordField)
        expect(url).toContain(registerPage.url)
    })

    test("Passwords don't match", async ({ }) => {
        const password = faker.internet.password({ length: 10 })
        await registerPage.register(faker.internet.username(), `dmitmal+${Date.now()}@qamadness.com`,  password, password + '1');
        await expect(registerPage.passwordsDoNotMatchMessage).toBeVisible();
        expect(url).toContain(registerPage.url)
    });
})