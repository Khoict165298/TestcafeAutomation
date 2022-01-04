import { Selector, t } from "testcafe"
import PageLogoutSelector from "../selectors/page.logout.selector";

const logoutOj = new PageLogoutSelector();
class LogoutPage {

    async logout() {
        await t
            .click(logoutOj.userProfileBtn)
            .click(logoutOj.logoutDropdown);
    }
}
export default LogoutPage