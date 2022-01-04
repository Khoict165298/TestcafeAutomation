import { Selector, t } from "testcafe"
import Configuration from "../../../commons/configuration";
import LoginPage from "../../authentication/functions/login-page";
import PageCustomizeTermsSelector from "../selectors/page.customize-term.selector";
import CustomizeTerm from "../functions/customize-term";

const config = new Configuration();
const objectLogin = new LoginPage();

const custom_term = new PageCustomizeTermsSelector();
const customTerm = new CustomizeTerm();

fixture`Customize terms`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await objectLogin.login(config.UserName, config.Password)
        await t.wait(3000);
    })

test
    .meta({ type: 'base' })
    ('#32435: Check concurrency when both user update the same term', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        //Select Term to update at window 1
        await t.switchToWindow(window1);
        //Prepare data
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'Prepare data')
            .click(custom_term.updateBtn)
        await t.eval(() => location.reload(true));
        await t.wait(3000)
        //Update value at window 1
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term')
        //Switch to window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await objectLogin.login(config.UserName, config.Password)
        await t.wait(3000)
        //Update term at window 2
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term1')
            .click(custom_term.updateBtn)
        //Switch to window 1
        await t.switchToWindow(window1);
        //Save data
        await t.click(custom_term.updateBtn)
        //Assert
        await t
            .expect(custom_term.titleConflictTerm.exists).ok()
            .expect(Selector('p').withAttribute('class', 'mb-0').innerText).contains('Begriff Wert','update_term1')
    });
test
    .meta({ type: 'base' })
    ('#32435: Check overide data conflict when concurrency happens', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        //Select Term to update at window 1
        await t.switchToWindow(window1);
        //Prepare data
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'Prepare data')
            .click(custom_term.updateBtn)
        await t.eval(() => location.reload(true));
        await t.wait(3000)
        //Update value at window 1
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term')
        //Switch to window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await objectLogin.login(config.UserName, config.Password)
        await t.wait(3000)
        //Update term at window 2
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term1')
            .click(custom_term.updateBtn)
        //Switch to window 1
        await t.switchToWindow(window1);
        //Save data
        await t.click(custom_term.updateBtn)

        //Overide data when conflict data
        await t.click(custom_term.overideConflictBtn)
        //Assert

        await t
            .expect(custom_term.valueTermBox.value).eql('update_term')
    });
test
    .meta({ type: 'base' })
    ('#32435: Check Refresh data conflict when concurrency happens', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        //Select Term to update at window 1
        await t.switchToWindow(window1);
        //Prepare data
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'Prepare data')
            .click(custom_term.updateBtn)
        await t.eval(() => location.reload(true));
        await t.wait(3000)
        //Update value at window 1
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term')
        //Switch to window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await objectLogin.login(config.UserName, config.Password)
        await t.wait(3000)
        //Update term at window 2
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term1')
            .click(custom_term.updateBtn)
        //Switch to window 1
        await t.switchToWindow(window1);
        //Save data
        await t.click(custom_term.updateBtn)

        //Overide data when conflict data
        await t.click(custom_term.refreshConflictBtn)
        //Assert

        await t
            .expect(custom_term.valueTermBox.value).eql('update_term1')
    });
test
    .meta({ type: 'base' })
    ('#32435: Check cancel conflict when concurrency happens', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        //Select Term to update at window 1
        await t.switchToWindow(window1);
        //Prepare data
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'Prepare data')
            .click(custom_term.updateBtn)
        await t.eval(() => location.reload(true));
        await t.wait(3000)
        //Update value at window 1
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term')
        //Switch to window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await objectLogin.login(config.UserName, config.Password)
        await t.wait(3000)
        //Update term at window 2
        await customTerm.selectTerm('term_1')
        await t
            .pressKey('ctrl+a delete')
            .typeText(custom_term.valueTermBox, 'update_term1')
            .click(custom_term.updateBtn)
        //Switch to window 1
        await t.switchToWindow(window1);
        //Save data
        await t.click(custom_term.updateBtn)

        //Overide data when conflict data
        await t.click(custom_term.cancelConflictBtn)
        //Assert

        await t
            .expect(custom_term.valueTermBox.value).eql('update_term')
    });