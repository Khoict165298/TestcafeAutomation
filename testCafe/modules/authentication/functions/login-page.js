import { Selector, t } from "testcafe"
import PageLoginSelector from "../selectors/page.login.selector";

const loginOj = new PageLoginSelector();
class LoginPage {
    async login(username, password) {
        await t
            .wait(5000)
            .typeText(loginOj.accountNameBox, username)
            .typeText(loginOj.passwordBox, password)
            .click(loginOj.loginButton)
            .wait(3000);
    }
}
export default LoginPage