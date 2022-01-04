import { Selector, t } from "testcafe";
import Configuration from "../../../../../commons/configuration";
import LoginPage from "../../../../authentication/functions/login-page";
import DunningIndexSelector from "../../manage-dunning-level/selectors/dunning.index.selector";
import DunningDetailSelector from "../../manage-dunning-level/selectors/dunning.detail.selector";
import PageIndex from "../selectors/page.index.selector.js";
import PageDetails from "../selectors/page.details.selector";
import ManageDunningLevel from "../../manage-dunning-level/functions/manage-dunning-level";
import CreateTranslateData from "../functions/create-translate-data";
import EditTranslateData from "../functions/edit-translate-data";

const config = new Configuration();
const login = new LoginPage();
const detailsDunningSelector = new DunningDetailSelector();
const indexDunningSelector = new DunningIndexSelector();
const detailsTranslateSelector = new PageDetails();
const indexTranslateSelector = new PageIndex();
const createTranslateFunction = new CreateTranslateData();
const editTranslateFunction = new EditTranslateData();

fixture`Finance - Dunning levels: Translate dunning levels`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexDunningSelector.financeMenu)
        await t.click(indexDunningSelector.dunningLevelsMenu);
    })

test.meta({ type: 'base' })
    ('Check translated data when input normal data at DE language', async t => {
        const manageDunningTC1 = new ManageDunningLevel()
        //Create Create Currency
        await manageDunningTC1.createDunningLevels()
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Open detail view currency
        await manageDunningTC1.filterDunning(manageDunningTC1.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsDunningSelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageDunningTC1.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageDunningTC1.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageDunningTC1.nameValue)
            .expect(detailsTranslateSelector.descriptionDEBox.value).contains(manageDunningTC1.descriptionValue)
            .expect(detailsTranslateSelector.descriptionENBox.value).contains(manageDunningTC1.descriptionValue)
            .expect(detailsTranslateSelector.descriptionFRBox.value).contains(manageDunningTC1.descriptionValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsDunningSelector.backBtn);
        //Delete data
        await manageDunningTC1.filterDunning(manageDunningTC1.codeValue);
        await manageDunningTC1.deleteDunning();
    })
test.meta({ type: 'base' })
    ('Check translated data when input normal data at EN language', async t => {
        const manageDunningTC2 = new ManageDunningLevel()
        //Switch language to EN
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        //Create Create Currency
        await manageDunningTC2.createDunningLevels()
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Open detail view currency
        await manageDunningTC2.filterDunning(manageDunningTC2.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsDunningSelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageDunningTC2.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageDunningTC2.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageDunningTC2.nameValue)
            .expect(detailsTranslateSelector.descriptionDEBox.value).contains(manageDunningTC2.descriptionValue)
            .expect(detailsTranslateSelector.descriptionENBox.value).contains(manageDunningTC2.descriptionValue)
            .expect(detailsTranslateSelector.descriptionFRBox.value).contains(manageDunningTC2.descriptionValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsDunningSelector.backBtn);
        //Delete data
        await manageDunningTC2.filterDunning(manageDunningTC2.codeValue);
        await manageDunningTC2.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check translated data when input normal data at FR language', async t => {
        const manageDunningTC3 = new ManageDunningLevel()
        //Switch language to FR
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        //Create Create Currency
        await manageDunningTC3.createDunningLevels()
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Open detail view currency
        await manageDunningTC3.filterDunning(manageDunningTC3.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsDunningSelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageDunningTC3.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageDunningTC3.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageDunningTC3.nameValue)
            .expect(detailsTranslateSelector.descriptionDEBox.value).contains(manageDunningTC3.descriptionValue)
            .expect(detailsTranslateSelector.descriptionENBox.value).contains(manageDunningTC3.descriptionValue)
            .expect(detailsTranslateSelector.descriptionFRBox.value).contains(manageDunningTC3.descriptionValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsDunningSelector.backBtn);
        //Delete data
        await manageDunningTC3.filterDunning(manageDunningTC3.codeValue);
        await manageDunningTC3.deleteDunning();
    })

test.meta({ type: 'base' })
    ('#31589, #31591, #31592: Check translated data when entering form data translation first in default language', async t => {
        const manageDunningTC4 = new ManageDunningLevel()
        //Open dunning levels form
        await t
            .click(indexDunningSelector.addBtn)
            .typeText(detailsDunningSelector.codeBox, manageDunningTC4.codeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Expected
        await t
            .expect(detailsDunningSelector.nameBox.value).contains('Name DE')
            .expect(detailsDunningSelector.descriptionBox.value).contains('Plato description DE');
        //Save dunning levels
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Check master view dunning levels
        await manageDunningTC4.filterDunning(manageDunningTC4.codeValue)
        //Aserrtion
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC4.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name DE')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description DE');

        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageDunningTC4.filterDunning(manageDunningTC4.codeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC4.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name EN')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description EN');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageDunningTC4.filterDunning(manageDunningTC4.codeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC4.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name FR')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description FR');
        //Delete data
        await manageDunningTC4.deleteDunning();
    })

test.meta({ type: 'base' })
    ('#31589, #31591, #31592: Check translated data when entering form data translation first in EN language', async t => {
        const manageDunningTC5 = new ManageDunningLevel()
        //Switch language to EN
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        //Open dunning levels form
        await t
            .click(indexDunningSelector.addBtn)
            .typeText(detailsDunningSelector.codeBox, manageDunningTC5.codeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Expected
        await t
            .expect(detailsDunningSelector.nameBox.value).contains('Name EN')
            .expect(detailsDunningSelector.descriptionBox.value).contains('Plato description EN');
        //Save dunning levels
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Check master view dunning levels
        await manageDunningTC5.filterDunning(manageDunningTC5.codeValue)
        //Aserrtion
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC5.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name EN')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description EN');

        //Check data after swicth default to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageDunningTC5.filterDunning(manageDunningTC5.codeValue)
        //Aserrtion after swicth default to DE language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC5.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name DE')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description DE');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageDunningTC5.filterDunning(manageDunningTC5.codeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC5.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name FR')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description FR');
        //Delete data
        await manageDunningTC5.deleteDunning();
    })

test.meta({ type: 'base' })
    ('#31589, #31591, #31592: Check translated data when entering form data translation first in FR language', async t => {
        const manageDunningTC6 = new ManageDunningLevel()
        //Switch language to FR
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        //Open dunning levels form
        await t
            .click(indexDunningSelector.addBtn)
            .typeText(detailsDunningSelector.codeBox, manageDunningTC6.codeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Expected
        await t
            .expect(detailsDunningSelector.nameBox.value).contains('Name FR')
            .expect(detailsDunningSelector.descriptionBox.value).contains('Plato description FR');
        //Save dunning levels
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Check master view dunning levels
        await manageDunningTC6.filterDunning(manageDunningTC6.codeValue)
        //Aserrtion
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC6.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name FR')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description FR');

        //Check data after swicth default to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageDunningTC6.filterDunning(manageDunningTC6.codeValue)
        //Aserrtion after swicth default to DE language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC6.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name DE')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description DE');

        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageDunningTC6.filterDunning(manageDunningTC6.codeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC6.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name EN')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato description EN');
        //Delete data
        await manageDunningTC6.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check translated data when edit Dunning levels at default language', async t => {
        const manageDunningTC7 = new ManageDunningLevel()
        //Create Create Dunning levels
        await manageDunningTC7.createDunningLevels()
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Open detail view Dunning levels
        await manageDunningTC7.filterDunning(manageDunningTC7.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000)
            .click(detailsDunningSelector.nameBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsDunningSelector.nameBox, 'Name Update DE')
            .click(detailsDunningSelector.descriptionBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsDunningSelector.descriptionBox, 'Description Update DE')
            .click(detailsDunningSelector.saveCloseBtn);
        //Search
        await manageDunningTC7.filterDunning(manageDunningTC7.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsDunningSelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.nameDEbox.value).contains('Name Update DE')
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageDunningTC7.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageDunningTC7.nameValue)
            .expect(detailsTranslateSelector.descriptionDEBox.value).contains('Description Update DE')
            .expect(detailsTranslateSelector.descriptionENBox.value).contains(manageDunningTC7.descriptionValue)
            .expect(detailsTranslateSelector.descriptionFRBox.value).contains(manageDunningTC7.descriptionValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsDunningSelector.backBtn);
        //Delete data
        await manageDunningTC7.filterDunning(manageDunningTC7.codeValue);
        await manageDunningTC7.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check translated data when edit Dunning levels at EN language', async t => {
        const manageDunningTC8 = new ManageDunningLevel()
        //Create Create Dunning levels
        await manageDunningTC8.createDunningLevels()
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Swicth language EN language
        await t
            .click(indexTranslateSelector.languageToggle)
            .click(indexTranslateSelector.languageENDrop)
            .wait(4000);
        //Open detail view Dunning levels
        await manageDunningTC8.filterDunning(manageDunningTC8.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000)
            .click(detailsDunningSelector.nameBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsDunningSelector.nameBox, 'Name Update EN')
            .click(detailsDunningSelector.descriptionBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsDunningSelector.descriptionBox, 'Description Update EN')
            .click(detailsDunningSelector.saveCloseBtn);
        //Search
        await manageDunningTC8.filterDunning(manageDunningTC8.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsDunningSelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageDunningTC8.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains('Name Update EN')
            .expect(detailsTranslateSelector.nameFRbox.value).contains(manageDunningTC8.nameValue)
            .expect(detailsTranslateSelector.descriptionDEBox.value).contains(manageDunningTC8.descriptionValue)
            .expect(detailsTranslateSelector.descriptionENBox.value).contains('Description Update EN')
            .expect(detailsTranslateSelector.descriptionFRBox.value).contains(manageDunningTC8.descriptionValue)
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsDunningSelector.backBtn);
        //Delete data
        await manageDunningTC8.filterDunning(manageDunningTC8.codeValue);
        await manageDunningTC8.deleteDunning();
    })

test.meta({ type: 'base' })
    ('Check translated data when edit Dunning levels at FR language', async t => {
        const manageDunningTC9 = new ManageDunningLevel()
        //Create Create Dunning levels
        await manageDunningTC9.createDunningLevels()
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Swicth language FR language
        await t
            .click(indexTranslateSelector.languageToggle)
            .click(indexTranslateSelector.languageFRDrop)
            .wait(4000);
        //Open detail view Dunning levels
        await manageDunningTC9.filterDunning(manageDunningTC9.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000)
            .click(detailsDunningSelector.nameBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsDunningSelector.nameBox, 'Name Update FR')
            .click(detailsDunningSelector.descriptionBox)
            .pressKey('Ctrl+a delete')
            .typeText(detailsDunningSelector.descriptionBox, 'Description Update FR')
            .click(detailsDunningSelector.saveCloseBtn);
        //Search
        await manageDunningTC9.filterDunning(manageDunningTC9.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Open translate data detail view
        await t.click(detailsDunningSelector.translateBtn)
        //Assertion
        await t
            .expect(detailsTranslateSelector.nameDEbox.value).contains(manageDunningTC9.nameValue)
            .expect(detailsTranslateSelector.nameENbox.value).contains(manageDunningTC9.nameValue)
            .expect(detailsTranslateSelector.nameFRbox.value).contains('Name Update FR')
            .expect(detailsTranslateSelector.descriptionDEBox.value).contains(manageDunningTC9.descriptionValue)
            .expect(detailsTranslateSelector.descriptionENBox.value).contains(manageDunningTC9.descriptionValue)
            .expect(detailsTranslateSelector.descriptionFRBox.value).contains('Description Update FR')
            .click(detailsTranslateSelector.cancelBtn)
            .click(detailsDunningSelector.backBtn);
        //Delete data
        await manageDunningTC9.filterDunning(manageDunningTC9.codeValue);
        await manageDunningTC9.deleteDunning();
    })

test.meta({ type: 'base' })
    ('#31619, #31620, #31621: Check translated data when edit form data translation at default language', async t => {
        const manageDunningTC10 = new ManageDunningLevel()
        //Open dunning levels form
        await t
            .click(indexDunningSelector.addBtn)
            .typeText(detailsDunningSelector.codeBox, manageDunningTC10.codeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Save dunning levels
        await t.click(detailsDunningSelector.saveCloseBtn);
        //Open detail view dunning levels
        await manageDunningTC10.filterDunning(manageDunningTC10.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Edit translate data
        await editTranslateFunction.edit();
        //Aserrtion in Detail view
        await t
            .expect(detailsDunningSelector.nameBox.value).contains('Name update DE')
            .expect(detailsDunningSelector.descriptionBox.value).contains('Plato update DE')
            .click(detailsDunningSelector.saveCloseBtn);
        //Assert in view table
        await manageDunningTC10.filterDunning(manageDunningTC10.codeValue)
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC10.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update DE')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update DE');

        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageDunningTC10.filterDunning(manageDunningTC10.codeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC10.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update EN')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update EN');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageDunningTC10.filterDunning(manageDunningTC10.codeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC10.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update FR')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update FR');
        //Delete data
        await manageDunningTC10.deleteDunning();
    })

test.meta({ type: 'base' })
    ('#31619, #31620, #31621: Check translated data when edit form data translation at EN language', async t => {
        const manageDunningTC11 = new ManageDunningLevel()
        //Open dunning levels form
        await t
            .click(indexDunningSelector.addBtn)
            .typeText(detailsDunningSelector.codeBox, manageDunningTC11.codeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Save dunning levels
        await t.click(detailsDunningSelector.saveCloseBtn);

        //swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);

        //Open detail view dunning levels
        await manageDunningTC11.filterDunning(manageDunningTC11.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Edit translate data
        await editTranslateFunction.edit();
        //Aserrtion in Detail view
        await t
            .expect(detailsDunningSelector.nameBox.value).contains('Name update EN')
            .expect(detailsDunningSelector.descriptionBox.value).contains('Plato update EN')
            .click(detailsDunningSelector.saveCloseBtn);
        //Assert in view table
        await manageDunningTC11.filterDunning(manageDunningTC11.codeValue)
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC11.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update EN')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update EN');

        //Check data after swicth default to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageDunningTC11.filterDunning(manageDunningTC11.codeValue)
        //Aserrtion after swicth default to DE language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC11.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update DE')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update DE');

        //Check data after swicth default to FR language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);
        await manageDunningTC11.filterDunning(manageDunningTC11.codeValue)
        //Aserrtion after swicth default to FR language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC11.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update FR')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update FR');
        //Delete data
        await manageDunningTC11.deleteDunning();
    })

test.meta({ type: 'base' })
    ('#31619, #31620, #31621: Check translated data when edit form data translation at FR language', async t => {
        const manageDunningTC12 = new ManageDunningLevel()
        //Open dunning levels form
        await t
            .click(indexDunningSelector.addBtn)
            .typeText(detailsDunningSelector.codeBox, manageDunningTC12.codeValue)
        //Create translate data
        await createTranslateFunction.createTranslate();
        //Save dunning levels
        await t.click(detailsDunningSelector.saveCloseBtn);

        //swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageFRDrop);
        await t.wait(3000);

        //Open detail view dunning levels
        await manageDunningTC12.filterDunning(manageDunningTC12.codeValue)
        await t
            .click(indexDunningSelector.editBtn)
            .wait(2000);
        //Edit translate data
        await editTranslateFunction.edit();
        //Aserrtion in Detail view
        await t
            .expect(detailsDunningSelector.nameBox.value).contains('Name update FR')
            .expect(detailsDunningSelector.descriptionBox.value).contains('Plato update FR')
            .click(detailsDunningSelector.saveCloseBtn);
        //Assert in view table
        await manageDunningTC12.filterDunning(manageDunningTC12.codeValue)
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC12.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update FR')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update FR');

        //Check data after swicth default to DE language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageDEDrop);
        await t.wait(3000);
        await manageDunningTC12.filterDunning(manageDunningTC12.codeValue)
        //Aserrtion after swicth default to DE language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC12.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update DE')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update DE');

        //Check data after swicth default to EN language
        await t.click(indexTranslateSelector.languageToggle);
        await t.click(indexTranslateSelector.languageENDrop);
        await t.wait(3000);
        await manageDunningTC12.filterDunning(manageDunningTC12.codeValue)
        //Aserrtion after swicth default to EN language
        await t
            .expect(indexDunningSelector.dunningTable.innerText).contains(manageDunningTC12.codeValue)
            .expect(indexDunningSelector.dunningTable.innerText).contains('Name update EN')
            .expect(indexDunningSelector.dunningTable.innerText).contains('Plato update EN');
        //Delete data
        await manageDunningTC12.deleteDunning();
    })
