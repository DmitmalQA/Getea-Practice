import { test, expect } from '../utils/fixtures/pages.ts';
import { faker } from '@faker-js/faker';
import { RegisterMessages } from '../test-data/messages/register-messages.ts';


test.describe('Register Page Tests', () => {

    test('Successful Register', async ({registerPage, dashboardPage}) => {
        const randomUserName = faker.internet.username()
        const randomEmail = `dmitmal+${Date.now()}@qamadness.com`
        const password = faker.internet.password({ length: 10 })

        await registerPage.register(randomUserName, randomEmail,  password, password);
        await expect(dashboardPage.successRegisttrationMessage).toBeVisible();
        await expect(dashboardPage.navBarUserName).toHaveText(randomUserName);
    })

    test('Username is empty', async ({ registerPage }) => {
        const randomEmail = `dmitmal+${Date.now()}@qamadness.com`
        const password = faker.internet.password({ length: 10 })

        await registerPage.register('', randomEmail,  password, password);
        await registerPage.checkEmptyErrorMessage(registerPage.userNameField)
        expect(registerPage.url).toContain("/sign_up")
    })

    test('Email is empty', async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 })

        await registerPage.register(faker.internet.username(), '',  password, password);
        await registerPage.checkEmptyErrorMessage(registerPage.emailField)
        expect(registerPage.url).toContain("/sign_up")
    })

    test('Email format is incorrect', async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 })

        await registerPage.register(faker.internet.username(), 'dmitmalqamadness.com',  password, password);
        await expect(registerPage.emailField).toHaveJSProperty('validity.typeMismatch', true)
        await expect(registerPage.emailField).toHaveJSProperty('validationMessage', RegisterMessages.EMAIL_INCORRECT_FORMAT_MESSAGE)
        expect(registerPage.url).toContain("/sign_up")
    })

    test('Password is empty', async ({ registerPage }) => {

        await registerPage.register(faker.internet.username(), `dmitmal+${Date.now()}@qamadness.com`,  '', '');
        await registerPage.checkEmptyErrorMessage(registerPage.passwordField)
        expect(registerPage.url).toContain("/sign_up")
    })

    test('Confirm Password is empty', async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 })
        await registerPage.register(faker.internet.username(), `dmitmal+${Date.now()}@qamadness.com`,  password, '');
        await registerPage.checkEmptyErrorMessage(registerPage.confirmPasswordField)
        expect(registerPage.url).toContain("/sign_up")
    })

    test("Passwords don't match", async ({ registerPage }) => {
        const password = faker.internet.password({ length: 10 })
        await registerPage.register(faker.internet.username(), `dmitmal+${Date.now()}@qamadness.com`,  password, password + '1');
        await expect(registerPage.passwordsDoNotMatchMessage).toBeVisible();
        expect(registerPage.url).toContain("/sign_up")
    });
})