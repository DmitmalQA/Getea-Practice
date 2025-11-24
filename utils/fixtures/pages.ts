import { test as base } from "@playwright/test"
import RegisterPage from "../../pom/registerPage"
import DashboardPage from "../../pom/DashboardPage"

type PageObjects = {
    registerPage: RegisterPage
    dashboardPage: DashboardPage
}

export const test = base.extend<PageObjects>({
    registerPage: async({ page }, use) => {
        let registerPage = new RegisterPage(page);
        await registerPage.navigateTo()
        await use(registerPage)
    },
    dashboardPage: async({ page }, use) => {
        let dashboardPage = new DashboardPage(page);
        await use(dashboardPage)
    }
})

export { expect } from "@playwright/test"