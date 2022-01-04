import { t } from "testcafe"
import PageGmailSelector from "../selectors/page.gmail.selector"

const gmailObj = new PageGmailSelector()

class GmailAccount {
   
    async loginGoogleEmail(email, password) {
        await t
            .navigateTo(gmailObj.googleURL)
            .maximizeWindow()
            .typeText(gmailObj.google_emailBox, email)
            .pressKey('enter')
            .typeText(gmailObj.google_passwordBox, password)
            .pressKey('enter')
            .wait(2000)
            .eval(() => location.reload(true))
    }

    async openResetPasswordLink() {
        await t
            .click(gmailObj.resetPassLink)
            .wait(2000)
            .maximizeWindow()
    }

 }
export default GmailAccount