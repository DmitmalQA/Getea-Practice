import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
    public url: string = '/user/login?redirect_to=%2f'

    public loginUserName: Locator = this.page.locator('#user_name')
    public loginPassword: Locator = this.page.locator('#password')
    public loginButton: Locator = this.page.locator('.primary.button')
    
    async login(username: string, password: string){
        await this.loginUserName.fill(username)
        await this.loginPassword.fill(password)
        await this.loginButton.click()
    }
}