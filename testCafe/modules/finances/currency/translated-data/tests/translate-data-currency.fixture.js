import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import CurrencyIndexSelector from "../../manage-currency/selectors/currency.index.selector";
import CurrencyDetailSelector from "../../manage-currency/selectors/currency.detail.selector";
import PageIndex from "../selectors/page.index.selector.js";
import PageDetails from "../selectors/page.details.selector";
import ManageCurrency from "../../manage-currency/functions/manage-currency";
import CreateTranslateData from "../functions/create-translate-data";
import EditTranslateData from "../functions/edit-translate-data";

const config = new Configuration();
const login = new LoginPage();
const detailsCurrencySelector = new CurrencyDetailSelector();
const indexCurrencySelector = new CurrencyIndexSelector();
const detailsTranslateSelector = new PageDetails();
const indexTranslateSelector = new PageIndex();
const createTranslateFunction = new CreateTranslateData();
const editTranslateFunction = new EditTranslateData();

fixture`Finance - Currency: Translate Currency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexCurrencySelector.financeMenu)
        await t.click(indexCurrencySelector.currencyMenu);
    })

test.meta({ type: 'base' })
    ('Check translated data when input normal data at DE language', async t => {
        const manageCurrencyTC1 = new ManageCurrency()
        //Create Create Currency
        await manageCurrencyTC1.createCurrency()
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC1.filterCurrency(manageCurrencyTC1.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsCurrencySelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.codeDEBox.value).contains(manageCurrencyTC1.codeValue)
            .expect(detailsTranslateSelector.codeENBox.value).contains(manageCurrencyTC1.codeValue)
            .expect(detailsTranslateSelector.codeFRBox.value).contains(manageCurrencyTC1.codeValue)
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageCurrencyTC1.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageCurrencyTC1.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageCurrencyTC1.nameValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsCurrencySelector.backBtn);
        //Delete data
        await manageCurrencyTC1.filterCurrency(manageCurrencyTC1.ISOcodeValue);
        await manageCurrencyTC1.deleteCurrency();
})

test.meta({ type: 'base' })
    ('Check translated data when input normal data at EN language', async t => {
        const manageCurrencyTC2 = new ManageCurrency()
        //Switch language to EN
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        //Create Create Currency
        await manageCurrencyTC2.createCurrency()
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC2.filterCurrency(manageCurrencyTC2.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsCurrencySelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.codeDEBox.value).contains(manageCurrencyTC2.codeValue)
            .expect(detailsTranslateSelector.codeENBox.value).contains(manageCurrencyTC2.codeValue)
            .expect(detailsTranslateSelector.codeFRBox.value).contains(manageCurrencyTC2.codeValue)
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageCurrencyTC2.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageCurrencyTC2.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageCurrencyTC2.nameValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsCurrencySelector.backBtn);
        //Delete data
        await manageCurrencyTC2.filterCurrency(manageCurrencyTC2.ISOcodeValue);
        await manageCurrencyTC2.deleteCurrency();
})

test.meta({ type: 'base' })
    ('Check translated data when input normal data at FR language', async t => {
        const manageCurrencyTC3 = new ManageCurrency()
        //Switch language to FR 
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        //Create Create Currency
        await manageCurrencyTC3.createCurrency()
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC3.filterCurrency(manageCurrencyTC3.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsCurrencySelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.codeDEBox.value).contains(manageCurrencyTC3.codeValue)
            .expect(detailsTranslateSelector.codeENBox.value).contains(manageCurrencyTC3.codeValue)
            .expect(detailsTranslateSelector.codeFRBox.value).contains(manageCurrencyTC3.codeValue)
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageCurrencyTC3.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageCurrencyTC3.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageCurrencyTC3.nameValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsCurrencySelector.backBtn);
        //Delete data
        await manageCurrencyTC3.filterCurrency(manageCurrencyTC3.ISOcodeValue);
        await manageCurrencyTC3.deleteCurrency();
})

test.meta({ type: 'base' })
    ('#31589, #31591, #31592: Check translated data when entering form data translation first in default language', async t => {
        const manageCurrencyTC4 = new ManageCurrency()
        //Open currency form
        await t
            .click(indexCurrencySelector.addBtn)
            .typeText(detailsCurrencySelector.isocodeBox, manageCurrencyTC4.ISOcodeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Expected
        await t
            .expect(detailsCurrencySelector.codeBox.value).contains('Plato DE')
            .expect(detailsCurrencySelector.nameBox.value).contains('Name DE');
        //Save currency
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Check master view currency
        await manageCurrencyTC4.filterCurrency(manageCurrencyTC4.ISOcodeValue)
        //Aserrtion
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC4.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato DE')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name DE');

        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageCurrencyTC4.filterCurrency(manageCurrencyTC4.ISOcodeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC4.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato EN')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name EN');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageCurrencyTC4.filterCurrency(manageCurrencyTC4.ISOcodeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC4.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato FR')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name FR');
        //Delete data
        await manageCurrencyTC4.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('#31601, #31603, #31604: Check translated data when entering form data translation first in EN language', async t => {
        const manageCurrencyTC5 = new ManageCurrency()
        //Switch language to EN
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        //Open currency form
        await t
            .click(indexCurrencySelector.addBtn)
            .typeText(detailsCurrencySelector.isocodeBox, manageCurrencyTC5.ISOcodeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Expected
        await t
            .expect(detailsCurrencySelector.codeBox.value).contains('Plato EN')
            .expect(detailsCurrencySelector.nameBox.value).contains('Name EN');
        //Save currency
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Check master view currency
        await manageCurrencyTC5.filterCurrency(manageCurrencyTC5.ISOcodeValue)
        //Aserrtion
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC5.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato EN')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name EN');

        //Check data after swicth default to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageCurrencyTC5.filterCurrency(manageCurrencyTC5.ISOcodeValue)
        //Aserrtion after swicth default to DE language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC5.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato DE')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name DE');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageCurrencyTC5.filterCurrency(manageCurrencyTC5.ISOcodeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC5.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato FR')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name FR');
        //Delete data
        await manageCurrencyTC5.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('#31601, #31603, #31604: Check translated data when entering form data translation first in FR language', async t => {
        const manageCurrencyTC6 = new ManageCurrency()
        //Switch language to DE
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        //Open currency form
        await t
            .click(indexCurrencySelector.addBtn)
            .typeText(detailsCurrencySelector.isocodeBox, manageCurrencyTC6.ISOcodeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Expected
        await t
            .expect(detailsCurrencySelector.codeBox.value).contains('Plato FR')
            .expect(detailsCurrencySelector.nameBox.value).contains('Name FR');
        //Save currency
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Check master view currency
        await manageCurrencyTC6.filterCurrency(manageCurrencyTC6.ISOcodeValue)
        //Aserrtion
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC6.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato FR')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name FR');

        //Check data after swicth default to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageCurrencyTC6.filterCurrency(manageCurrencyTC6.ISOcodeValue)
        //Aserrtion after swicth default to DE language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC6.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato DE')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name DE');

        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageCurrencyTC6.filterCurrency(manageCurrencyTC6.ISOcodeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC6.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato EN')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name EN');
        //Delete data
        await manageCurrencyTC6.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('Check translated data when edit Currency at default language', async t => {
        const manageCurrencyTC7 = new ManageCurrency()
        //Create Create Currency
        await manageCurrencyTC7.createCurrency()
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC7.filterCurrency(manageCurrencyTC7.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000)
            .click(detailsCurrencySelector.codeBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsCurrencySelector.codeBox, 'Code Update DE')
            .click(detailsCurrencySelector.nameBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsCurrencySelector.nameBox, 'Name Update DE')
            .click(detailsCurrencySelector.saveCloseBtn);
        //Search
        await manageCurrencyTC7.filterCurrency(manageCurrencyTC7.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsCurrencySelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.codeDEBox.value).contains('Code Update DE')
            .expect(detailsTranslateSelector.codeENBox.value).contains(manageCurrencyTC7.codeValue)
            .expect(detailsTranslateSelector.codeFRBox.value).contains(manageCurrencyTC7.codeValue)
            .expect(detailsTranslateSelector.nameDEbox.value).contains('Name Update DE')
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageCurrencyTC7.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageCurrencyTC7.nameValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsCurrencySelector.backBtn);
        //Delete data
        await manageCurrencyTC7.filterCurrency(manageCurrencyTC7.ISOcodeValue);
        await manageCurrencyTC7.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('Check translated data when edit Currency at EN language', async t => {
        const manageCurrencyTC8 = new ManageCurrency()
        //Create Create Currency
        await manageCurrencyTC8.createCurrency()
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Swicth language EN language
        await t
            .click(indexTranslateSelector.languageToggle)
            .click(indexTranslateSelector.languageENDrop)
            .wait(4000);
        //Open detail view currency
        await manageCurrencyTC8.filterCurrency(manageCurrencyTC8.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000)
            .click(detailsCurrencySelector.codeBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsCurrencySelector.codeBox, 'Code Update EN')
            .click(detailsCurrencySelector.nameBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsCurrencySelector.nameBox, 'Name Update EN')
            .click(detailsCurrencySelector.saveCloseBtn);
        //Search
        await manageCurrencyTC8.filterCurrency(manageCurrencyTC8.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsCurrencySelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.codeDEBox.value).contains(manageCurrencyTC8.codeValue)
            .expect(detailsTranslateSelector.codeENBox.value).contains('Code Update EN')
            .expect(detailsTranslateSelector.codeFRBox.value).contains(manageCurrencyTC8.codeValue)
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageCurrencyTC8.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains('Name Update EN')
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageCurrencyTC8.nameValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsCurrencySelector.backBtn);
        //Delete data
        await manageCurrencyTC8.filterCurrency(manageCurrencyTC8.ISOcodeValue);
        await manageCurrencyTC8.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('Check translated data when edit Currency at FR language', async t => {
        const manageCurrencyTC9 = new ManageCurrency()
        //Create Create Currency
        await manageCurrencyTC9.createCurrency()
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Swicth language EN language
        await t
            .click(indexTranslateSelector.languageToggle)
            .click(indexTranslateSelector.languageFRDrop)
            .wait(4000);
        //Open detail view currency
        await manageCurrencyTC9.filterCurrency(manageCurrencyTC9.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000)
            .click(detailsCurrencySelector.codeBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsCurrencySelector.codeBox, 'Code Update FR')
            .click(detailsCurrencySelector.nameBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsCurrencySelector.nameBox, 'Name Update FR')
            .click(detailsCurrencySelector.saveCloseBtn);
        //Search
        await manageCurrencyTC9.filterCurrency(manageCurrencyTC9.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsCurrencySelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.codeDEBox.value).contains(manageCurrencyTC9.codeValue)
            .expect(detailsTranslateSelector.codeENBox.value).contains(manageCurrencyTC9.codeValue)
            .expect(detailsTranslateSelector.codeFRBox.value).contains('Code Update FR')
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageCurrencyTC9.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageCurrencyTC9.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains('Name Update FR')
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsCurrencySelector.backBtn);
        //Delete data
        await manageCurrencyTC9.filterCurrency(manageCurrencyTC9.ISOcodeValue);
        await manageCurrencyTC9.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('#31619, #31620, #31621: Check translated data when edit form data translation at default language', async t => {
        const manageCurrencyTC10 = new ManageCurrency()
        //Open currency form
        await t
            .click(indexCurrencySelector.addBtn)
            .typeText(detailsCurrencySelector.isocodeBox, manageCurrencyTC10.ISOcodeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Save currency
        await t.click(detailsCurrencySelector.saveCloseBtn);
        //Open detail view currency
        await manageCurrencyTC10.filterCurrency(manageCurrencyTC10.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Edit translate data
        await editTranslateFunction.edit();
        //Aserrtion in Detail view
        await t
            .expect(detailsCurrencySelector.codeBox.value).contains('Plato update DE')
            .expect(detailsCurrencySelector.nameBox.value).contains('Name update DE')
            .click(detailsCurrencySelector.saveCloseBtn);
        //Assert in view table
        await manageCurrencyTC10.filterCurrency(manageCurrencyTC10.ISOcodeValue)
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC10.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update DE')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update DE');
        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageCurrencyTC10.filterCurrency(manageCurrencyTC10.ISOcodeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC10.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update EN')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update EN');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageCurrencyTC10.filterCurrency(manageCurrencyTC10.ISOcodeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC10.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update FR')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update FR');
        //Delete data
        await manageCurrencyTC10.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('#31619, #31620, #31621: Check translated data when edit form data translation at EN language', async t => {
        const manageCurrencyTC11 = new ManageCurrency()
        //Open currency form
        await t
            .click(indexCurrencySelector.addBtn)
            .typeText(detailsCurrencySelector.isocodeBox, manageCurrencyTC11.ISOcodeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Save currency
        await t.click(detailsCurrencySelector.saveCloseBtn);

        //swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        //Open detail view currency
        await manageCurrencyTC11.filterCurrency(manageCurrencyTC11.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Edit translate data
        await editTranslateFunction.edit();
        //Aserrtion in Detail view
        await t
            .expect(detailsCurrencySelector.codeBox.value).contains('Plato update EN')
            .expect(detailsCurrencySelector.nameBox.value).contains('Name update EN')
            .click(detailsCurrencySelector.saveCloseBtn);
        //Assert in view table
        await manageCurrencyTC11.filterCurrency(manageCurrencyTC11.ISOcodeValue)
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC11.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update EN')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update EN');

        //Check data after swicth EN to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageCurrencyTC11.filterCurrency(manageCurrencyTC11.ISOcodeValue)
        //Aserrtion after swicth EN to DE language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC11.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update DE')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update DE');

        //Check data after swicth EN to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageCurrencyTC11.filterCurrency(manageCurrencyTC11.ISOcodeValue)
        //Aserrtion after swicth EN to FR language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC11.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update FR')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update FR');
        //Delete data
        await manageCurrencyTC11.deleteCurrency();
    })

test.meta({ type: 'base' })
    ('#31619, #31620, #31621: Check translated data when edit form data translation at FR language', async t => {
        const manageCurrencyTC12 = new ManageCurrency()
        //Open currency form
        await t
            .click(indexCurrencySelector.addBtn)
            .typeText(detailsCurrencySelector.isocodeBox, manageCurrencyTC12.ISOcodeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Save currency
        await t.click(detailsCurrencySelector.saveCloseBtn);

        //swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        //Open detail view currency
        await manageCurrencyTC12.filterCurrency(manageCurrencyTC12.ISOcodeValue)
        await t
            .click(indexCurrencySelector.editBnt)
            .wait(2000);
        //Edit translate data
        await editTranslateFunction.edit();
        //Aserrtion in Detail view
        await t
            .expect(detailsCurrencySelector.codeBox.value).contains('Plato update FR')
            .expect(detailsCurrencySelector.nameBox.value).contains('Name update FR')
            .click(detailsCurrencySelector.saveCloseBtn);
        //Assert in view table
        await manageCurrencyTC12.filterCurrency(manageCurrencyTC12.ISOcodeValue)
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC12.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update FR')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update FR');

        //Check data after swicth FR to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageCurrencyTC12.filterCurrency(manageCurrencyTC12.ISOcodeValue)
        //Aserrtion after swicth FR to DE language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC12.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update DE')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update DE');

        //Check data after swicth FR to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageCurrencyTC12.filterCurrency(manageCurrencyTC12.ISOcodeValue)
        //Aserrtion after swicth FR to EN language
        await t
            .expect(indexCurrencySelector.currencyTable.innerText).contains(manageCurrencyTC12.ISOcodeValue)
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Plato update EN')
            .expect(indexCurrencySelector.currencyTable.innerText).contains('Name update EN');
        //Delete data
        await manageCurrencyTC12.deleteCurrency();
    })