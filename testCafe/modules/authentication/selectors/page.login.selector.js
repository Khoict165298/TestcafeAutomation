import { Selector } from "testcafe";

export default class PageLoginSelector {
    constructor() {

        //begin LogIn page
        //Link
        this.forgotLink = Selector('#forgot-password');
        //Box
        this.accountNameBox = Selector('#accountName');
        this.passwordBox = Selector('#password');
        //Button
        this.loginButton = Selector('#btn-submit');
        //End LogIn page
        this.validateMessage = Selector('div').withAttribute('class', 'modal-body dxbs-modal-body');
        this.alertMessage = Selector('div[class="validation-message"]');

        //begin-forgot password screen
        this.emailForgot = Selector('div id="account-name" class="dxbs-textbox">');
        this.requestNewPassBtn = Selector('#btn-submit');
        this.backLogin = Selector('.content.login-page a');
        this.submitNewPassBtn = Selector('#btn-submit');
        this.backForgot = Selector('#forgot-password');
        //end-forgot password screen

        //begin-label layout
        this.labelDropdown = Selector('select').withAttribute('class', 'form-control-sm w-100');
        this.regularLabel = Selector('option').withAttribute('value', 'Regular');
        this.floatingLabel = Selector('option').withAttribute('value', 'Floating');
        this.automaticLabel = Selector('option').withAttribute('value', 'Automatic');
        this.accountRegularLabel = Selector('label').withAttribute('for', 'accountName');
        this.passwordRegularLabel = Selector('label').withAttribute('for', 'password');
        //end-label layout
    }
}