import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import DunningDetailSelector from "../../manage-dunning-level/selectors/dunning.detail.selector";
import DunningIndexSelector from "../../manage-dunning-level/selectors/dunning.index.selector";
import ManageDunningLevel from "../../manage-dunning-level/functions/manage-dunning-level";
import DunningCurrencyIndexSelector from "../selectors/dunning-level-currency.index.selector";
import DunningCurrencyDetailSelector from "../selectors/dunning-level-currency.detail.selector";
import CreateDunningCurrency from "../functions/create-dunning-level-currency";
import EditDunningCurrency from "../functions/edit-dunning-level-currency";

const config = new Configuration();
const login = new LoginPage();
const detailDunningSelector = new DunningDetailSelector();
const indexDunningSelector = new DunningIndexSelector();
const detailSelector = new DunningCurrencyDetailSelector();
const indexSelector = new DunningCurrencyIndexSelector();
const createDunningCurrency = new CreateDunningCurrency();
const editDunningCurrency = new EditDunningCurrency();


fixture`Finance - Dunning: Dunning level currency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexDunningSelector.financeMenu)
        await t.click(indexDunningSelector.dunningLevelsMenu);
    })

test.meta({ type: 'base' })
    ('Check create Dunning level currency successfully', async t => {
        const manageDunningTC1 = new ManageDunningLevel();
        //Create Create Dunning levels
        await manageDunningTC1.createDunningLevels()
        await t.click(detailDunningSelector.saveCloseBtn);
        //Open detail view Dunning level
        await manageDunningTC1.filterDunning(manageDunningTC1.codeValue)
        await t.click(indexDunningSelector.editBtn);
        //Create exchange rate
        await createDunningCurrency.createDunningCurrency()
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('2,05')
            .expect(indexSelector.dataTable.innerText).contains('9999,99')
            .expect(indexSelector.dataTable.innerText).contains('20.10.2021')
            .click(detailDunningSelector.backBtn)
            .wait(3000);
        //Delete data
        await manageDunningTC1.filterDunning(manageDunningTC1.codeValue);
        await manageDunningTC1.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check create Dunning level currency unsuccessfully when duplicate date', async t => {
        const manageDunningTC2 = new ManageDunningLevel();
        //Create Create Dunning levels
        await manageDunningTC2.createDunningLevels()
        await t.click(detailDunningSelector.saveCloseBtn);
        //Open detail view Dunning level
        await manageDunningTC2.filterDunning(manageDunningTC2.codeValue)
        await t.click(indexDunningSelector.editBtn);
        //Create first Dunning level currency
        await createDunningCurrency.createDunningCurrency()
        //Create second Dunning level currency
        await createDunningCurrency.createDunningCurrency()
        //Assertion
        await t
            .expect(Selector('i').withAttribute('style', 'text-align:center; word-wrap:unset').innerText).contains('Der eingegebene Wert muss eindeutig sein')
            .click(Selector('#btn-close-alert'))
            .click(detailDunningSelector.backBtn);
        //Delete data
        await manageDunningTC2.filterDunning(manageDunningTC2.codeValue);
        await manageDunningTC2.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check Edit Dunning level currency successfully', async t => {
        const manageDunningTC3 = new ManageDunningLevel();
        //Create Create Dunning levels
        await manageDunningTC3.createDunningLevels()
        await t.click(detailDunningSelector.saveCloseBtn);
        //Open detail view Dunning level
        await manageDunningTC3.filterDunning(manageDunningTC3.codeValue)
        await t.click(indexDunningSelector.editBtn);
        //Create exchange rate
        await createDunningCurrency.createDunningCurrency()
        //Edit exchange rate
        await editDunningCurrency.editDunningCurrency()
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('10,05')
            .expect(indexSelector.dataTable.innerText).contains('111,25')
            .expect(indexSelector.dataTable.innerText).contains('10.10.2021')
            .click(detailDunningSelector.backBtn)
            .wait(3000);
        //Delete data
        await manageDunningTC3.filterDunning(manageDunningTC3.codeValue);
        await manageDunningTC3.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check Delete Dunning level currency successfully', async t => {
        const manageDunningTC4 = new ManageDunningLevel();
        //Create Create Dunning levels
        await manageDunningTC4.createDunningLevels()
        await t.click(detailDunningSelector.saveCloseBtn);
        //Open detail view Dunning level
        await manageDunningTC4.filterDunning(manageDunningTC4.codeValue)
        await t.click(indexDunningSelector.editBtn);
        //Create Dunning level currency
        await createDunningCurrency.createDunningCurrency()
        //delete Dunning level currency
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.yesConfirmDeleteBtn)
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('Keine Daten zum Anzeigen')
            .click(detailDunningSelector.backBtn)
            .wait(3000);
        //Delete data
        await manageDunningTC4.filterDunning(manageDunningTC4.codeValue);
        await manageDunningTC4.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check cancel Delete Dunning level currency successfully', async t => {
        const manageDunningTC5 = new ManageDunningLevel();
        //Create Create Dunning levels
        await manageDunningTC5.createDunningLevels()
        await t.click(detailDunningSelector.saveCloseBtn);
        //Open detail view Dunning level
        await manageDunningTC5.filterDunning(manageDunningTC5.codeValue)
        await t.click(indexDunningSelector.editBtn);
        //Create Dunning level currency
        await createDunningCurrency.createDunningCurrency()
        //Cancel delete Dunning level currency
        await t
            .click(indexSelector.deleteBtn)
            .click(indexSelector.cancelConfirmDeleteBtn)
        //Assertion
        await t
            .expect(indexSelector.dataTable.innerText).contains('2,05')
            .expect(indexSelector.dataTable.innerText).contains('9999,99')
            .expect(indexSelector.dataTable.innerText).contains('20.10.2021')
            .click(detailDunningSelector.backBtn)
            .wait(3000);
        //Delete data
        await manageDunningTC5.filterDunning(manageDunningTC5.codeValue);
        await manageDunningTC5.deleteDunning();
    })