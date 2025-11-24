import { test as base } from "@playwright/test"
import { Page } from "@playwright/test"

type ScreenSize = {
    pageSmall: Page,
    pageMedium: Page,
    pageLarge: Page
}

export const test = base.extend<ScreenSize>({

    pageSmall: async({ page }, use) => {
        await page.setViewportSize({width: 300, height: 300})
        await use(page)
        console.log('AFTER USE')
    },

    pageMedium: async({ page }, use) => {
        await page.setViewportSize({width: 700, height: 700})
        await use(page)
        console.log('AFTER USE')
    },

    pageLarge: async({ page }, use) => {
        await page.setViewportSize({width: 1200, height: 1200})
        await use(page)
        console.log('AFTER USE')
    }
})

