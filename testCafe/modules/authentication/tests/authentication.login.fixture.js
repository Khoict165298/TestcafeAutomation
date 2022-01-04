
import { Selector } from "testcafe";
import Configuration from "../../../commons/configuration";
import PageLoginSelector from '../selectors/page.login.selector';
import LoginPage from '../functions/login-page';
import LogoutPage from '../functions/logout-page'

const config = new Configuration();
const page = new PageLoginSelector;
const objectLogin = new LoginPage();
const objectLogout = new LogoutPage();

fixture`Authen: Login`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await t.wait(5000)
    })

test.meta({ type: 'base' })
    /*Scenario #33530: Check login successfully by press Login button
       - Input valid value in Username field
       - Input valid value in Password field
       - Click on Login button
       - Verify the text on dashboard
       - Logout 
       */
    ('#33530: Check login successfully', async t => {
    //Input valid value
    await objectLogin.login(config.UserName, config.Password)
    //Assert
    await t
          .expect(Selector('a').withExactText('Kontext einstellen').exists).ok();
    await objectLogout.logout()
    // Assert
    await t.expect(page.accountNameBox.exists).ok();
    });

test.meta({ type: 'advance' })
    /*Scenario: #33535: Check log in unsuccessfully when entered blank username
        - Leave Username field blank
        - Input value in Password field 
        - Click on Login button
        - Verify error message 
        */
     ('#33535: Check log in unsuccessfully when entered blank password', async t => {
        //Input valid value
        await objectLogin.login(' ', config.Password)
        //Assert
        await t
            .expect(page.alertMessage.innerText).eql('Konto ist erforderlich')
    });

test.meta({ type: 'advance' })
    /*Scenario #33534: Check log in unsuccessfully when entered blank password
        - Input Username field blank
        - Leave Password field blank
        - Click on Login button
        - Verify error message 
        */
        ('#33534: Check log in unsuccessfully when entered blank password', async t => {
        //Input valid value
        await objectLogin.login(config.UserName, ' ')
        //Assert
        await t
            .expect(page.alertMessage.innerText).eql('Passwort ist erforderlich')
    });


test.meta({ type: 'advance' })
    /*Scenario #33536: Check log in unsuccessfully when entered valid account name and entered invalid password
        - Input valid value in Username field
        - Input invalid value in Password field
        - Verify error message 
        */
    ('#33536: Check log in unsuccessfully when entered valid account name and entered invalid password', async t => {
    //Input valid value
        await objectLogin.login(config.UserName, '122222222222')
    //Assert
    await t
        .expect(page.validateMessage.withText('Falscher Kontoname oder Passwort.').exists).ok();
});


test.meta({ type: 'advance' })
    /*Scenario #33537: Check log in unsuccessfully when entered invalid account name and entered valid password
        - Input invalid value in Username field
        - Input valid value in Password field
        - Click on Login button
        - Verify error message 
        */
    ('#33537: Check log in unsuccessfully when entered invalid account name and entered valid password', async t => {
    //Input valid value
    await objectLogin.login('sys-plato', config.Password)
    //Assert
    await t
        .expect(page.validateMessage.withText('Falscher Kontoname oder Passwort.').exists).ok();
});

test.meta({ type: 'advance' })
    /*Scenario #33537: Check log in unsuccessfully when entered invalid account name and password
        - Input invalid value in Username field
        - Input invalid value in Password field
        - Click on Login button
        - Verify error message
    */
    ('#33537: Check log in unsuccessfully when entered invalid account name and password', async t => {
    //Input valid value
    await objectLogin.login('sys-plato', '66668888')
    //Assert
    await t
        .expect(page.validateMessage.withText('Falscher Kontoname oder Passwort.').exists).ok();
});
