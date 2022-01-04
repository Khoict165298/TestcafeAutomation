import { Selector } from "testcafe";
import Configuration from "../../../commons/configuration";
import PageLoginSelector from '../selectors/page.login.selector';
import LoginPage from '../functions/login-page';
import LogoutPage from '../functions/logout-page';

const config = new Configuration();
const page = new PageLoginSelector();
const objectLogin = new LoginPage();
const objectLogout = new LogoutPage();

fixture`Authen: Logout`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
    })

test.meta({ type: 'base' })
/*Scenario #33612: Check login successfully by press Login button
    - Input valid value in Username field
    - Input valid value in Password field
    - Click on Login button
    - Logout
    */
    ('#33612: Check logout successfully', async t => {
    //Login to the account
    await t.wait(2000)
    await objectLogin.login(config.UserName, config.Password)
    //Logout to the account
    await objectLogout.logout()
    await t.expect(page.accountNameBox.exists).ok();
});
