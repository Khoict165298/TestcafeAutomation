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
        await t.wait(3000);
    })

test
    .meta({ type: 'base' })
    ('#32435: Check update term successfully', async t => {
    //Login
    await objectLogin.login(config.UserName, config.Password)
    //Select term to edit
        await customTerm.selectTerm('term_1')
    //Update value for selected term
    await customTerm.updateTerm('update_term')
    //Verify new value of term displayed
    await t.expect(custom_term.valueTermBox.value).eql('update_term')
  
});

test
    .meta({ type: 'advance' })
    ('#32436: Check update term with blank value', async t => {
    //Login
    await objectLogin.login(config.UserName, config.Password)
    //Select term to edit
        await customTerm.selectTerm('term_1')
    //Update value for selected term
    await customTerm.updateTerm(' ')
    //Verify new value of term displayed
    await t.expect(custom_term.valueTermBox.value).eql(' ')
   
});

test
    .meta({ type: 'advance' })
    ('#32437: Check update term with value more than 254 characters', async t => {
    //Login
    await objectLogin.login(config.UserName, config.Password)
    //Select term to edit
        await customTerm.selectTerm('term_1')
    //Update value for selected term
    await customTerm.updateTerm('Customize term with valid value Customize term with valid value Customize term with valid value Customize term with valid value Customize term with valid value  Customize term with valid value Customize term with valid value  Customize term with valid value  Customize term with valid value')
    //Verify message appear
    await t.expect(custom_term.alerMsg.innerText).contains('254 Zeichen')
    });

test
    .meta({ type: 'advance' })
    ('#32438: Check revert term ', async t => {
        //Login
        await objectLogin.login(config.UserName, config.Password)
        //Select term to edit
        await customTerm.selectTerm('term_1')
        //Update value for selected term
        await customTerm.updateTerm('Check reset')
        //Verify value of term after changing
        await t.expect(custom_term.valueTermBox.value).eql('Check reset')
        await t.wait(2000)
        // Revert term
        await t.click(custom_term.resetBtn)
        // Verify value of term after reverting
        await t.expect(custom_term.valueTermBox.value).eql('@@')
    });

test
    .meta({ type: 'base' })
    ('#32435: Check cancel update term', async t => {
        //Login
        await objectLogin.login(config.UserName, config.Password)
        //Select term to edit
        await customTerm.selectTerm('term_1')
        //Update value for selected term
        await customTerm.updateTerm('update_term')
        //Cancel update term
        await t
            .click(custom_term.editBtn)
            .typeText(custom_term.valueTermBox, 'CheckCancel')
            .click(custom_term.cancelBtn)
            .wait(3000)
        //Verify new value of term displayed
        await t.expect(custom_term.valueTermBox.value).eql('update_term')

    });
