import { Selector } from "testcafe";

class PageGmailSelector {
    constructor() {

        //Google email
        this.googleURL = 'https://accounts.google.com/signin/v2/identifier?service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
        this.google_emailBox = Selector('input[type="email"]')
        this.google_passwordBox = Selector('input[type="password"]')
        this.platoForgotPasswordEmail = Selector('#\\:2d span').withText('PlatoNL: Password Forgot')
        this.platoWelcomeEmail = Selector('#\\:2d span').withText('PlatoNL: Welcome To Base Application')
        this.emailContent = Selector('div[class="a3s aiL "]')
        this.resetPassLink = Selector('a').withText('link')
        this.deleteBtn = Selector('#\\:4 .asa').nth(14)

      }
}
export default PageGmailSelector