import { Selector } from "testcafe";
import PageForgotPasswordSelector from "../selectors/page.forgot-password.selector";
import ForgotPassword from "../functions/forgot-password";
import Configuration from "../../../commons/configuration";
import LoginPage from '../functions/login-page';
import LogoutPage from '../functions/logout-page';
import PageGmailSelector from "../../gmail/selectors/page.gmail.selector"
import GmailAccount from "../../gmail/functions/gmail"


const config = new Configuration()
const objectLogin = new LoginPage()
const forgotPass = new PageForgotPasswordSelector()
const fgPass = new ForgotPassword()
const objectLogout = new LogoutPage()
const gmailObj = new PageGmailSelector()
const gmailAcc = new GmailAccount()

fixture`Forgot password/Reset password`

    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await t.wait(4000)

    })


test.meta({ type: 'base' })
    /*Scenario:  #33549, #33625, #33626: Basic flow
        - Click on Forgot Password link on Login page
        - Input valid account name
        - Click Forgot Password button
        - Open email, click on Reset Password link
        - Reset password
        - Login with new password
        - Delete received email 
        */
    (' #33549, #33625, #33626: Check forgot/reset password successfully', async t => {
        // Send email
        await fgPass.forgotPassword('user2')
        await t.expect(forgotPass.message_success.innerText).eql('Erfolg zurücksetzen, bitte überprüfen Sie Ihre E-Mail')
        // Open email
        await gmailAcc.loginGoogleEmail('test.plato.nl@gmail.com', '123$%^789')
        await t.click(gmailObj.platoForgotPasswordEmail)
        await t.wait(5000)

        //Check content of email
        await t.expect(gmailObj.emailContent.innerText).contains('PLATO NL - Access for tenant')
        await t.expect(gmailObj.emailContent.innerText).contains('Our security mechanisms require that you set a new password to use our application.')
        await t.expect(gmailObj.emailContent.innerText).contains('Please follow this link to set a new password.')
        await gmailAcc.openResetPasswordLink()

        //Reset password
        await fgPass.resetPassword('12345678', '12345678')
        await t.wait(5000)
        // Login with new password
        await objectLogin.login('user2', '12345678')
        await objectLogout.logout()
        await t.closeWindow()
        //Delete email
        await t.click(gmailObj.deleteBtn)
        await t.wait(2000)
        await t.expect(gmailObj.platoForgotPasswordEmail.exists).notOk()

    });


test.meta({ type: 'advance' })
    /*Scenario: 33550: Check forgot password when input invalid account
        - Click on Forgot Password link on Login page
        - Input invalid account name
        - Click Forgot Password button
        - Verify error message appears
*/
    ('#33550: Check forgot password when input invalid account', async t => {
        await fgPass.forgotPassword('hanh')
        await t.expect(forgotPass.messagePopup.innerText).contains('Konto existiert nicht')
    });


test.meta({ type: 'advance' })
    /*Scenario: 33551: Check forgot password with blank account value
        - Click on Forgot Password link on Login page
        - Input blank account name
        - Click Forgot Password button
        - Verify error message appears
    */
    ('#33551: Check forgot password with blank account value', async t => {
        await fgPass.forgotPassword(' ')
        await t.expect(forgotPass.message_error.innerText).contains('Konto ist erforderlich')
    })


test.meta({ type: 'advance' })
    /*Scenario: #33569: Check reset password with password less than 8 characters
        - Click on Forgot Password link on Login page
        - Input valid account name
        - Click Forgot Password button
        - Open email, click on Reset Password link
        - Reset password with password less than 8 characters
        - Delete received email
*/
    ('#33569: Check reset password with password less than 8 characters', async t => {
        // Send email
        await fgPass.forgotPassword('user2')
        await t.expect(forgotPass.message_success.innerText).eql('Erfolg zurücksetzen, bitte überprüfen Sie Ihre E-Mail')
        // Open email
        await gmailAcc.loginGoogleEmail('test.plato.nl@gmail.com', '123$%^789')
        await t.click(gmailObj.platoForgotPasswordEmail)
        await t.wait(5000)

        //Check content of email
        await t.expect(gmailObj.emailContent.innerText).contains('PLATO NL - Access for tenant')
        await t.expect(gmailObj.emailContent.innerText).contains('Our security mechanisms require that you set a new password to use our application.')
        await t.expect(gmailObj.emailContent.innerText).contains('Please follow this link to set a new password.')
        await gmailAcc.openResetPasswordLink()

        //Reset password
        await fgPass.resetPassword('1234 ', '1234')
        await t.wait(5000)
        // Verify message
        await t.expect(forgotPass.message_error.innerText).eql('Das neue Passwort hat mindestens 8 Zeichen')
        await t.closeWindow()
         
        //Delete email
        await t.click(gmailObj.deleteBtn)
        await t.wait(2000)
        await t.expect(gmailObj.platoForgotPasswordEmail.exists).notOk()

    });


test.meta({ type: 'advance' })
    /*Scenario: #33563: Check reset password with password more than 120 characters
        - Click on Forgot Password link on Login page
        - Input valid account name
        - Click Forgot Password button
        - Open email, click on Reset Password link
        - Reset password with password more than 120 characters
        - Delete received email
*/    
    ('#33563: Check reset password with password more than 120 characters', async t => {
       // Send email
        await fgPass.forgotPassword('user2')
        await t.expect(forgotPass.message_success.innerText).eql('Erfolg zurücksetzen, bitte überprüfen Sie Ihre E-Mail')
        // Open email
        await gmailAcc.loginGoogleEmail('test.plato.nl@gmail.com', '123$%^789')
        await t.click(gmailObj.platoForgotPasswordEmail)
        await t.wait(5000)

        //Check content of email
        await t.expect(gmailObj.emailContent.innerText).contains('PLATO NL - Access for tenant')
        await t.expect(gmailObj.emailContent.innerText).contains('Our security mechanisms require that you set a new password to use our application.')
        await t.expect(gmailObj.emailContent.innerText).contains('Please follow this link to set a new password.')
        await gmailAcc.openResetPasswordLink()

        //Reset password
        await fgPass.resetPassword('Password more than 120 characters Password more than 120 characters Password more than 120 characters Password more than 120 characters Password more than 120 character', ' ')
        await t.wait(5000)
        // Verify message
        await t.expect(forgotPass.message_error.innerText).contains('Die maximale Länge des neuen Passworts beträgt 120 Zeichen.')
        await t.closeWindow()

        //Delete email
        await t.click(gmailObj.deleteBtn)
        await t.wait(2000)
        await t.expect(gmailObj.platoForgotPasswordEmail.exists).notOk()

    });


test.meta({ type: 'advance' })
    /*Scenario: #33570: Check reset password with password and confirm password not match
        - Click on Forgot Password link on Login page
        - Input valid account name
        - Click Forgot Password button
        - Open email, click on Reset Password link
        - Reset password with password and confirm password not match
        - Delete received email
*/
    ('#33570: Check reset password with password and confirm password not match', async t => {

        // Send email
        await fgPass.forgotPassword('user2')
        await t.expect(forgotPass.message_success.innerText).eql('Erfolg zurücksetzen, bitte überprüfen Sie Ihre E-Mail')
        // Open email
        await gmailAcc.loginGoogleEmail('test.plato.nl@gmail.com', '123$%^789')
        await t.click(gmailObj.platoForgotPasswordEmail)
        await t.wait(5000)

        //Check content of email
        await t.expect(gmailObj.emailContent.innerText).contains('PLATO NL - Access for tenant')
        await t.expect(gmailObj.emailContent.innerText).contains('Our security mechanisms require that you set a new password to use our application.')
        await t.expect(gmailObj.emailContent.innerText).contains('Please follow this link to set a new password.')
        await gmailAcc.openResetPasswordLink()

        //Reset password
        await fgPass.resetPassword('12345678', '12345677')
        await t.wait(5000)
        // Verify message
        await t.expect(forgotPass.message_error.innerText).eql('Passwörter stimmen nicht überein')
        await t.closeWindow()          
        //Delete email
        await t.click(gmailObj.deleteBtn)
        await t.wait(2000)
        await t.expect(gmailObj.platoForgotPasswordEmail.exists).notOk()

    });


test.meta({ type: 'advance' })
    /*Scenario: #33571: Check reset password with blank password
        - Click on Forgot Password link on Login page
        - Input valid account name
        - Click Forgot Password button
        - Open email, click on Reset Password link
        - Reset password with blank password
        - Delete received email
*/    
    ('#33571: Check reset password with blank password', async t => {
       // Send email
        await fgPass.forgotPassword('user2')
        await t.expect(forgotPass.message_success.innerText).eql('Erfolg zurücksetzen, bitte überprüfen Sie Ihre E-Mail')
        // Open email
        await gmailAcc.loginGoogleEmail('test.plato.nl@gmail.com', '123$%^789')
        await t.click(gmailObj.platoForgotPasswordEmail)
        await t.wait(5000)

        //Check content of email
        await t.expect(gmailObj.emailContent.innerText).contains('PLATO NL - Access for tenant')
        await t.expect(gmailObj.emailContent.innerText).contains('Our security mechanisms require that you set a new password to use our application.')
        await t.expect(gmailObj.emailContent.innerText).contains('Please follow this link to set a new password.')
        await gmailAcc.openResetPasswordLink()

        //Reset password
        await fgPass.resetPassword(' ', ' ')
        await t.wait(5000)
        // Verify message
        await t.expect(await forgotPass.message_error.innerText).eql('Passwort ist erforderlich')

        await t.closeWindow()

        //Delete email
        await t.click(gmailObj.deleteBtn)
        await t.wait(2000)
        await t.expect(gmailObj.platoForgotPasswordEmail.exists).notOk()

    });


