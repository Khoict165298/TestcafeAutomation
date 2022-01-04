import { Selector } from "testcafe";

class PageForgotPasswordSelector {
    constructor() {

        //Begin Login page
        this.forgotLink = Selector('#forgot-password')
        //End Login page

        //Begin Forgot password page
        this.accountBox = Selector('#accountName')
        this.forgotBtn = Selector('#btn-submit')

        //message
        this.message_success = Selector('p[class="messageSuccess"]')
        this.message_error = Selector('div[class="validation-message"]')
        this.messagePopup = Selector('div[class="modal-body dxbs-modal-body"]')

        //Reset password page
        this.resest_passwordBox = Selector('#password')
        this.resest_confirm_passwordBox = Selector('#confirmPassword')
        this.confirmBtn = Selector('#btn-submit')
      
    }
}
export default PageForgotPasswordSelector