import { t } from "testcafe"
import PageForgotPasswordSelector from "../selectors/page.forgot-password.selector"

const forgotPass = new PageForgotPasswordSelector()

class ForgotPassword {
    async forgotPassword(email) {
        await t
            .click(forgotPass.forgotLink)
            .typeText(forgotPass.accountBox, email)
            .click(forgotPass.forgotBtn)
            .wait(5000)
    }

    async loginGoogleEmail(email, password) {
        await t
            .navigateTo(forgotPass.googleURL)
            .maximizeWindow()
            .typeText(forgotPass.google_emailBox, email)
            .pressKey('enter')
            .typeText(forgotPass.google_passwordBox, password)
            .pressKey('enter')
            .wait(2000)
            .eval(() => location.reload(true))
    }

    async openResetPasswordLink() {
        await t
            .click(forgotPass.resetPassLink)
            .wait(2000)
            .maximizeWindow()
    }

    async resetPassword(password, confrim_password) {
        await t
            .typeText(forgotPass.resest_passwordBox, password)
            .typeText(forgotPass.resest_confirm_passwordBox, confrim_password)
            .click(forgotPass.confirmBtn)

    }

}
export default ForgotPassword