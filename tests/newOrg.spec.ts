import { test, expect } from '../utils/fixtures/app.ts';
import { faker } from '@faker-js/faker';
import * as userData from "../test-data/users/testUser1.json"

test.describe('New Organisation Page Tests', () => {

    const userName = userData.userName
    const password = userData.userPassword

    test.beforeEach(async ({ app }) => {
        await app.dashboardPage.goToLoginPage();
        await app.loginPage.login(userName, password)
        await app.dashboardPage.createNewOrganisationTransition()
    })

    test('Create Organisation with Standard Parameters', async({ app }) => {
        await app.newOrganisationPage.createPublicOrgAssigned()
        await app.newOrganisationPage.checkVisibility("public")
    })

    test('Create a Limited Organisation', async({ app }) => {
        await app.newOrganisationPage.createLimitedOrgAssigned()
        await app.newOrganisationPage.checkVisibility("limited")
    })

    test('Create a Private Organisation', async({ app }) => {
        await app.newOrganisationPage.createPrivateOrgAssigned()
        await app.newOrganisationPage.checkVisibility("private")
    })

    test('Create an Organisation without Permissions', async({ app }) => {
        await app.newOrganisationPage.createPublicOrgWithoutPermissionsAssigned()
        await app.newOrganisationPage.checkPermissions("disabled")
    })

    test('Create Organisation with already Existing Name', async({ app }) => {
        const repoName = "AQA-Test-"+faker.lorem.word()
        await app.newOrganisationPage.createSpecificOrg(repoName)
        await app.dashboardPage.goToDashBoard()
        await app.dashboardPage.createNewOrganisationTransition()
        await app.newOrganisationPage.createSpecificOrg(repoName)
        await expect(app.newOrganisationPage.errorMessage).toContainText(/already taken/)
    })
})