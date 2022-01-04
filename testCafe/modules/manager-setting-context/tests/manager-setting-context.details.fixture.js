
import { Selector, t } from "testcafe";
import Configuration from "../../../commons/configuration";
import LoginPage from "../../authentication/functions/login-page";
import PageDetailsSelector from "../selectors/page.details.selector";
import PageIndexSelector from "../selectors/page.index.selector";
import CreateSettingContext from "../functions/create-setting-context"
import DeleteSettingContext from "../functions/delete-setting-context"
import EditSettingContext from "../functions/edit-setting-context"

const config = new Configuration();
const login = new LoginPage();
const detailsSelector = new PageDetailsSelector();
const indexSelector = new PageIndexSelector();
const deleteSettingContext = new DeleteSettingContext();


fixture`Manage setting-context: create -update setting-context`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
    })

test('#29903: Check create setting-context succsessfully by Save&Close button', async t => {
    const createSettingContextTC1 = new CreateSettingContext();
    //Create setting-context
    await createSettingContextTC1.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Assert
    await t
        .typeText(indexSelector.searchBox, createSettingContextTC1.codeValue)
        .pressKey('enter')
        .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC1.codeValue)
        .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC1.nameValue)
        .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC1.descriptionValue);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC1.codeValue)
})

test('#29904: Check create setting-context succsessfully by Save&New button', async t => {
    const createSettingContextTC2 = new CreateSettingContext();
    //Create setting-context
    await createSettingContextTC2.createAcc()
    await t.click(detailsSelector.saveNewBtn);
    await t.click(detailsSelector.backBtn);
    //Assert
    await t
        .typeText(indexSelector.searchBox, createSettingContextTC2.codeValue)
        .pressKey('enter')
        .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC2.codeValue)
        .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC2.nameValue)
        .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC2.descriptionValue);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC2.codeValue)
})

test('#29905: Check create new setting-context unsuccessfully when code duplicated', async t => {
    const createSettingContextTC3 = new CreateSettingContext();
    //Create setting-context A
    await createSettingContextTC3.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Create setting-context B
    await createSettingContextTC3.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Assert
    await t
        .expect(detailsSelector.errorMessage.exists).ok()
        .click(Selector('#btn-close-alert'))
        .click(detailsSelector.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC3.codeValue)
})

test('#29907/29945/29908/29909: Check create setting-context unsuccessful when required fields is blank', async t => {
    const createSettingContextTC4 = new CreateSettingContext();
    //Create setting-context A
    await t
        .click(indexSelector.addBtn)
        .click(detailsSelector.descriptionBox)
        .typeText(detailsSelector.descriptionBox, createSettingContextTC4.descriptionValue);
    await t.click(detailsSelector.saveCloseBtn);
    //Assert
    await t
        .expect(Selector('div').withText('Kontextcode setzen ist erforderlich').exists).ok()
        .expect(Selector('div').withText('Einstellungskontext name ist erforderlich').exists).ok();
})

test('#29935: Check edit setting-context successfully when use Save&Close button', async t => {
    const createSettingContextTC5 = new CreateSettingContext();
    const editSettingContextTC5 = new EditSettingContext();
    //Create setting-context
    await createSettingContextTC5.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Edit setting-context
    await editSettingContextTC5.searchToEdit(createSettingContextTC5.codeValue)
    await editSettingContextTC5.edit()
    await t.click(detailsSelector.saveCloseBtn);
    //Assert
    await t
        .click(indexSelector.searchBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(indexSelector.searchBox, editSettingContextTC5.codeValue)
        .pressKey('enter')
        .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC5.codeValue)
        .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC5.nameValue)
        .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC5.descriptionValue);
    //Delete data
    await deleteSettingContext.delete(editSettingContextTC5.codeValue)
})

test('#29934/29929: Check edit setting-context unsuccessful when required be blank', async t => {
    const createSettingContextTC6 = new CreateSettingContext();
    const editSettingContextTC6 = new EditSettingContext();
    //Create setting-context
    await createSettingContextTC6.createAcc();
    await t.click(detailsSelector.saveCloseBtn);
    //Edit setting-context
    await editSettingContextTC6.searchToEdit(createSettingContextTC6.codeValue)
    await t
        //edit code
        .click(detailsSelector.codelBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        //edit name
        .click(detailsSelector.nameBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        //save
        .click(detailsSelector.saveCloseBtn);
    //Assert
    await t
        .expect(Selector('div').withText('Kontextcode setzen ist erforderlich').exists).ok()
        .expect(Selector('div').withText('Einstellungskontext name ist erforderlich').exists).ok()
        .click(detailsSelector.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC6.codeValue)
})

test('#30107: Check edit setting-context unsuccessful when code is duplicated', async t => {
    const createSettingContextTC701 = new CreateSettingContext();
    const createSettingContextTC702 = new CreateSettingContext();
    const editSettingContextTC702 = new EditSettingContext();
    //Create setting-context A
    await createSettingContextTC701.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Create setting-context B
    await createSettingContextTC702.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Edit setting-context
    await editSettingContextTC702.searchToEdit(createSettingContextTC702.codeValue)
    await t
        //edit code
        .click(detailsSelector.codelBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(detailsSelector.codelBox, createSettingContextTC701.codeValue)
        .click(detailsSelector.saveCloseBtn);
    //Assert
    await t
        .expect(detailsSelector.errorMessage.exists).ok()
        .click(Selector('#btn-close-alert'))
        .click(detailsSelector.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC701.codeValue)
    await deleteSettingContext.delete(createSettingContextTC702.codeValue)
})

