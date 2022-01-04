
import { Selector, t } from "testcafe";
import Configuration from "../../../commons/configuration";
import LoginPage from "../../authentication/functions/login-page";
import CreateSettingContext from "../../manager-setting-context/functions/create-setting-context";
import EditSettingContext from "../../manager-setting-context/functions/edit-setting-context";
import DeleteSettingContext from "../../manager-setting-context/functions/delete-setting-context";
import PageDetailsSelector from "../../manager-setting-context/selectors/page.details.selector";
import PageIndexSelector from "../../manager-setting-context/selectors/page.index.selector";
import PageDetails from "../selectors/page.details.selector";
import PageIndex from "../selectors/page.index.selector";
import CreateTranslateData from "../functions/create-translate-data";
import EditTranslateData from "../functions/edit-translate-data";

const config = new Configuration();
const login = new LoginPage();
const editSettingContext = new EditSettingContext();
const deleteSettingContext = new DeleteSettingContext();
const pageDetailSettingContext = new PageDetailsSelector();
const pageIndexSettingContext = new PageIndexSelector();
const pageDetailTranslated = new PageDetails();
const pageIndexTranslated = new PageIndex();
const createTransData = new CreateTranslateData();
const editTransData = new EditTranslateData();

fixture`Translated data`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(pageIndexSettingContext.manageSettingContextMenu);
    })

test('#31587: Check translated data when input normal data at default language', async t => {
    const createSettingContextTC1 = new CreateSettingContext();
    await t.expect(pageIndexTranslated.languageDEDrop.exists).ok();
    //Create setting-context
    await createSettingContextTC1.createAcc()
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit setting-context
    await editSettingContext.searchToEdit(createSettingContextTC1.codeValue)
    //Assert
    await t
        .click(pageDetailSettingContext.translateBtn)
        .expect(pageDetailTranslated.nameDEBox.value).contains(createSettingContextTC1.nameValue)
        .expect(pageDetailTranslated.nameENBox.value).contains(createSettingContextTC1.nameValue)
        .expect(pageDetailTranslated.nameFRBox.value).contains(createSettingContextTC1.nameValue)
        .expect(pageDetailTranslated.descriptionDEbox.value).contains(createSettingContextTC1.descriptionValue)
        .expect(pageDetailTranslated.descriptionENbox.value).contains(createSettingContextTC1.descriptionValue)
        .expect(pageDetailTranslated.descriptionFRbox.value).contains(createSettingContextTC1.descriptionValue)
        .click(pageDetailTranslated.cancelBtn)
        .click(pageDetailSettingContext.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC1.codeValue)
})

test('#31600: Check translated data when input normal data at EN language', async t => {
    const createSettingContextTC2 = new CreateSettingContext();
    //Select EN language
    await t.click(pageIndexTranslated.languageToggle);
    await t.click(pageIndexTranslated.languageENDrop);
    await t.wait(3000);
    //Create setting-context
    await createSettingContextTC2.createAcc()
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit setting-context
    await editSettingContext.searchToEdit(createSettingContextTC2.codeValue)
    //Assert
    await t
        .click(pageDetailSettingContext.translateBtn)
        .expect(pageDetailTranslated.nameDEBox.value).contains(createSettingContextTC2.nameValue)
        .expect(pageDetailTranslated.nameENBox.value).contains(createSettingContextTC2.nameValue)
        .expect(pageDetailTranslated.nameFRBox.value).contains(createSettingContextTC2.nameValue)
        .expect(pageDetailTranslated.descriptionDEbox.value).contains(createSettingContextTC2.descriptionValue)
        .expect(pageDetailTranslated.descriptionENbox.value).contains(createSettingContextTC2.descriptionValue)
        .expect(pageDetailTranslated.descriptionFRbox.value).contains(createSettingContextTC2.descriptionValue)
        .click(pageDetailTranslated.cancelBtn)
        .click(pageDetailSettingContext.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC2.codeValue)
})

test('#31595: Check translated data when input normal data at FR language', async t => {
    const createSettingContextTC3 = new CreateSettingContext();
    //Select EN language
    await t.click(pageIndexTranslated.languageToggle);
    await t.click(pageIndexTranslated.languageFRDrop);
    await t.wait(3000);
    //Create setting-context
    await createSettingContextTC3.createAcc()
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit setting-context
    await editSettingContext.searchToEdit(createSettingContextTC3.codeValue)
    //Assert
    await t
        .click(pageDetailSettingContext.translateBtn)
        .expect(pageDetailTranslated.nameDEBox.value).contains(createSettingContextTC3.nameValue)
        .expect(pageDetailTranslated.nameENBox.value).contains(createSettingContextTC3.nameValue)
        .expect(pageDetailTranslated.nameFRBox.value).contains(createSettingContextTC3.nameValue)
        .expect(pageDetailTranslated.descriptionDEbox.value).contains(createSettingContextTC3.descriptionValue)
        .expect(pageDetailTranslated.descriptionENbox.value).contains(createSettingContextTC3.descriptionValue)
        .expect(pageDetailTranslated.descriptionFRbox.value).contains(createSettingContextTC3.descriptionValue)
        .click(pageDetailTranslated.cancelBtn)
        .click(pageDetailSettingContext.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC3.codeValue)
})

test('#31589, #31591, #31592: Check translated data when entering form data translation first in default language', async t => {
    const createSettingContextTC4 = new CreateSettingContext();
    //Create setting-context
    await t
        .click(pageIndexSettingContext.addBtn)
        .click(pageDetailSettingContext.codelBox)
        .typeText(pageDetailSettingContext.codelBox, createSettingContextTC4.codeValue);
    //Create translated data
    await createTransData.createTranslate();
    //Expected
    await t
        .expect(pageDetailSettingContext.nameBox.value).contains('Plato DE')
        .expect(pageDetailSettingContext.descriptionBox.value).contains('Description DE');
    //Save setting-context
    await t.click(pageDetailSettingContext.saveCloseBtn);
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC4.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC4.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato DE')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description DE');
    //Check data after swicth default to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(3000)
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC4.codeValue)
        .pressKey('enter');
    //Assert after swicth default to EN language
    await t
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC4.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato EN')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description EN');
    //Check data after swicth default to FR language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(5000)
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC4.codeValue)
        .pressKey('enter');
    //Assert after swicth default to FR language
    await t
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC4.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato FR')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description FR');
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC4.codeValue)
})

test('#31601, #31603, #31604: Check translated data when entering form data translation first in EN language', async t => {
    const createSettingContextTC5 = new CreateSettingContext();
    //Swicth to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(3000);
    //Create setting-context
    await t
        .click(pageIndexSettingContext.addBtn)
        .click(pageDetailSettingContext.codelBox)
        .typeText(pageDetailSettingContext.codelBox, createSettingContextTC5.codeValue);
    //Create translated data
    await createTransData.createTranslate();
    //Expected
    await t
        .expect(pageDetailSettingContext.nameBox.value).contains('Plato EN')
        .expect(pageDetailSettingContext.descriptionBox.value).contains('Description EN');
    //Save setting-context
    await t.click(pageDetailSettingContext.saveCloseBtn);
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC5.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC5.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato EN')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description EN');
    //Check data after swicth default to DE language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageDEDrop)
        .wait(4000)
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC5.codeValue)
        .pressKey('enter');
    //Assert after swicth default to DE language
    await t
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC5.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato DE')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description DE');
    //Check data after swicth default to FR language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(4000)
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC5.codeValue)
        .pressKey('enter');
    //Assert after swicth default to FR language
    await t
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC5.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato FR')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description FR');
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC5.codeValue)
})

test('#31605, #31607, #31608: Check translated data when entering form data translation first in FR language', async t => {
    const createSettingContextTC6 = new CreateSettingContext();
    //Swicth to FR language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(3000);
    //Create setting-context
    await t
        .click(pageIndexSettingContext.addBtn)
        .click(pageDetailSettingContext.codelBox)
        .typeText(pageDetailSettingContext.codelBox, createSettingContextTC6.codeValue);
    //Create translated data
    await createTransData.createTranslate();
    //Expected
    await t
        .expect(pageDetailSettingContext.nameBox.value).contains('Plato FR')
        .expect(pageDetailSettingContext.descriptionBox.value).contains('Description FR');
    //Save setting-context
    await t.click(pageDetailSettingContext.saveCloseBtn);
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC6.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC6.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato FR')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description FR');
    //Check data after swicth default to DE language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageDEDrop)
        .wait(3000)
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC6.codeValue)
        .pressKey('enter');
    //Assert after swicth default to DE language
    await t
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC6.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato DE')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description DE');
    //Check data after swicth default to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(5000)
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC6.codeValue)
        .pressKey('enter');
    //Assert after swicth default to EN language
    await t
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains(createSettingContextTC6.codeValue)
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato EN')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description EN');
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC6.codeValue)
})

test('#31616: Check translated data when edit Setting Context at default language', async t => {
    const createSettingContextTC7 = new CreateSettingContext();
    //Create setting-context
    await createSettingContextTC7.createAcc();
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit setting-context
    await editSettingContext.searchToEdit(createSettingContextTC7.codeValue);
    await t
        .wait(1000)
        .click(pageDetailSettingContext.nameBox)
        .pressKey("ctrl+a delete")
        .typeText(pageDetailSettingContext.nameBox, "Name update DE")
        .click(pageDetailSettingContext.descriptionBox)
        .pressKey("ctrl+a delete")
        .typeText(pageDetailSettingContext.descriptionBox, "Description update DE")
        .click(pageDetailSettingContext.saveCloseBtn);
    //Assert
    await editSettingContext.searchToEdit(createSettingContextTC7.codeValue);
    await t
        .click(pageDetailSettingContext.translateBtn)
        .expect(pageDetailTranslated.nameDEBox.value).contains('Name update DE')
        .expect(pageDetailTranslated.nameENBox.value).contains(createSettingContextTC7.nameValue)
        .expect(pageDetailTranslated.nameFRBox.value).contains(createSettingContextTC7.nameValue)
        .expect(pageDetailTranslated.descriptionDEbox.value).contains('Description update DE')
        .expect(pageDetailTranslated.descriptionENbox.value).contains(createSettingContextTC7.descriptionValue)
        .expect(pageDetailTranslated.descriptionENbox.value).contains(createSettingContextTC7.descriptionValue);
    //Delete data
    await t
        .click(pageDetailTranslated.cancelBtn)
        .click(pageDetailSettingContext.backBtn);
    await deleteSettingContext.delete(createSettingContextTC7.codeValue);
}) 

test('#31617: Check translated data when edit Setting Context at EN language', async t => {
    const createSettingContextTC8 = new CreateSettingContext();
    //Create setting-context
    await createSettingContextTC8.createAcc();
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Swicth language EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(4000);
    //Edit setting-context
    await editSettingContext.searchToEdit(createSettingContextTC8.codeValue);
    await t
        .wait(1000)
        .click(pageDetailSettingContext.nameBox)
        .pressKey("ctrl+a delete")
        .typeText(pageDetailSettingContext.nameBox, "Name update EN")
        .click(pageDetailSettingContext.descriptionBox)
        .pressKey("ctrl+a delete")
        .typeText(pageDetailSettingContext.descriptionBox, "Description update EN")
        .click(pageDetailSettingContext.saveCloseBtn);
    //Assert
    await editSettingContext.searchToEdit(createSettingContextTC8.codeValue);
    await t
        .click(pageDetailSettingContext.translateBtn)
        .expect(pageDetailTranslated.nameDEBox.value).contains(createSettingContextTC8.nameValue)
        .expect(pageDetailTranslated.nameENBox.value).contains('Name update EN')
        .expect(pageDetailTranslated.nameFRBox.value).contains(createSettingContextTC8.nameValue)
        .expect(pageDetailTranslated.descriptionDEbox.value).contains(createSettingContextTC8.descriptionValue)
        .expect(pageDetailTranslated.descriptionENbox.value).contains('Description update EN')
        .expect(pageDetailTranslated.descriptionFRbox.value).contains(createSettingContextTC8.descriptionValue);
    //Delete data
    await t
        .click(pageDetailTranslated.cancelBtn)
        .click(pageDetailSettingContext.backBtn);
    await deleteSettingContext.delete(createSettingContextTC8.codeValue);
})

test('#31618: Check translated data when edit Setting Context at FR language', async t => {
    const createSettingContextTC9 = new CreateSettingContext();
    //Create setting-context
    await createSettingContextTC9.createAcc();
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Swicth language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(4000);
    //Edit setting-context
    await editSettingContext.searchToEdit(createSettingContextTC9.codeValue);
    await t
        .wait(1000)
        .click(pageDetailSettingContext.nameBox)
        .pressKey("ctrl+a delete")
        .typeText(pageDetailSettingContext.nameBox, "Name update FR")
        .click(pageDetailSettingContext.descriptionBox)
        .pressKey("ctrl+a delete")
        .typeText(pageDetailSettingContext.descriptionBox, "Description update FR")
        .click(pageDetailSettingContext.saveCloseBtn);
    //Assert
    await editSettingContext.searchToEdit(createSettingContextTC9.codeValue);
    await t
        .click(pageDetailSettingContext.translateBtn)
        .expect(pageDetailTranslated.nameDEBox.value).contains(createSettingContextTC9.nameValue)
        .expect(pageDetailTranslated.nameENBox.value).contains(createSettingContextTC9.nameValue)
        .expect(pageDetailTranslated.nameFRBox.value).contains('Name update FR')
        .expect(pageDetailTranslated.descriptionDEbox.value).contains(createSettingContextTC9.descriptionValue)
        .expect(pageDetailTranslated.descriptionENbox.value).contains(createSettingContextTC9.descriptionValue)
        .expect(pageDetailTranslated.descriptionFRbox.value).contains('Description update FR');
    //Delete data
    await t
        .click(pageDetailTranslated.cancelBtn)
        .click(pageDetailSettingContext.backBtn);
    await deleteSettingContext.delete(createSettingContextTC9.codeValue);
})

test('#31619, #31620, #31621: Check translated data when edit form data translation at default language', async t => {
    const createSettingContextTC10 = new CreateSettingContext();
    //Create setting-context
    await t
        .click(pageIndexSettingContext.addBtn)
        .click(pageDetailSettingContext.codelBox)
        .typeText(pageDetailSettingContext.codelBox, createSettingContextTC10.codeValue);
    //Create translated data
    await createTransData.createTranslate();
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit translate data
    await editSettingContext.searchToEdit(createSettingContextTC10.codeValue);
    await editTransData.edit();
    //Assert  after edit translate data
    await t
        //Assert in view detail
        .expect(pageDetailSettingContext.nameBox.value).contains('Plato update DE')
        .expect(pageDetailSettingContext.descriptionBox.value).contains('Description update DE')
        .click(pageDetailSettingContext.saveCloseBtn)
        //Assert in view table
        .click(pageIndexSettingContext.searchBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC10.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update DE');
    //Check when switch to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(3000);
    //Assert after switch to EN language
    await t
        .click(pageIndexSettingContext.searchBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC10.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update EN')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update EN');
    //Check when switch to FR language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(3000);
    //Assert after switch to FR language
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC10.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update FR')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update FR');
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC10.codeValue);
})

test('#31622, #31623, #31624: Check translated data when edit form data translation at EN language', async t => {
    const createSettingContextTC11 = new CreateSettingContext();
    //Switch to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(3000);
    //Create setting-context
    await t
        .click(pageIndexSettingContext.addBtn)
        .click(pageDetailSettingContext.codelBox)
        .typeText(pageDetailSettingContext.codelBox, createSettingContextTC11.codeValue);
    //Create translated data
    await createTransData.createTranslate();
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit translate data
    await editSettingContext.searchToEdit(createSettingContextTC11.codeValue);
    await editTransData.edit();
    //Assert  after edit translate data
    await t
        //Assert in view detail
        .expect(pageDetailSettingContext.nameBox.value).contains('Plato update EN')
        .expect(pageDetailSettingContext.descriptionBox.value).contains('Description update EN')
        .click(pageDetailSettingContext.saveCloseBtn)
        //Assert in view table
        .click(pageIndexSettingContext.searchBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC11.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update EN')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update EN');
    //Check when switch to DE language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageDEDrop)
        .wait(3000);
    //Assert after switch to DE language
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC11.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update DE');
    //Check when switch to FR language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(3000);
    //Assert after switch to FR language
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC11.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update FR')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update FR');
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC11.codeValue);
})

test('#31625, #31626, #31627: Check translated data when edit form data translation at FR language', async t => {
    const createSettingContextTC12 = new CreateSettingContext();
    //Switch to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageFRDrop)
        .wait(3000);
    //Create setting-context
    await t
        .click(pageIndexSettingContext.addBtn)
        .click(pageDetailSettingContext.codelBox)
        .typeText(pageDetailSettingContext.codelBox, createSettingContextTC12.codeValue);
    //Create translated data
    await createTransData.createTranslate();
    await t.click(pageDetailSettingContext.saveCloseBtn);
    //Edit translate data
    await editSettingContext.searchToEdit(createSettingContextTC12.codeValue);
    await editTransData.edit();
    //Assert  after edit translate data
    await t
        //Assert in view detail
        .expect(pageDetailSettingContext.nameBox.value).contains('Plato update FR')
        .expect(pageDetailSettingContext.descriptionBox.value).contains('Description update FR')
        .click(pageDetailSettingContext.saveCloseBtn)
        //Assert in view table
        .click(pageIndexSettingContext.searchBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC12.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update FR')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update FR');
    //Check when switch to DE language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageDEDrop)
        .wait(3000);
    //Assert after switch to DE language
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC12.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update DE');
    //Check when switch to EN language
    await t
        .click(pageIndexTranslated.languageToggle)
        .click(pageIndexTranslated.languageENDrop)
        .wait(3000);
    //Assert after switch to EN language
    await t
        .click(pageIndexSettingContext.searchBox)
        .typeText(pageIndexSettingContext.searchBox, createSettingContextTC12.codeValue)
        .pressKey('enter')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update EN')
        .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Description update EN');
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC12.codeValue);
})
