import { Selector } from "testcafe";
import Configuration from "../../../commons/configuration";
import PageLoginSelector from '../selectors/page.login.selector';

const config = new Configuration();
const page = new PageLoginSelector;
fixture`Authen: Labels layout`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await t.wait(4000);
    })

test
    /*Scenario: 33615: Check UI overview in default screen
    - Go to Login screen */

    .meta({ type: 'base' })
    ('#33615: Check UI overview in default screen', async t => {
        //Assert
        await t
            .expect(page.accountRegularLabel.withText('Kontoname').exists).ok()
            .expect(page.passwordRegularLabel.withText('Passwort').exists).ok()

    });
test
    /*Scenario: 33616: Check swicth to Floating label option
    - Go to Login screen 
    - Swicth to Floating label option*/

    .meta({ type: 'base' })
    ('#33616: Check swicth to Floating label option', async t => {
        await t
            .click(page.labelDropdown)
            .click(page.floatingLabel)
        //Assert
        await t
            .expect((page.accountNameBox).withAttribute('placeholder', 'Kontoname').exists).ok()
            .expect((page.passwordBox).withAttribute('placeholder', 'Passwort').exists).ok()
    });