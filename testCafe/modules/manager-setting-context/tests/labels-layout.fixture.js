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

fixture`Manage setting-context: Labels layout`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
    })
test('#33653: [Desktop] Check default overview in Create form', async t => {
    //Open form create account
    await t.click(indexSelector.addBtn);
    //Assert
    await t
        .expect(detailsSelector.codeNormalLabel.withText('Code').exists).ok()
        .expect(detailsSelector.nameNormalLabel.withText('Name').exists).ok()
        .expect(detailsSelector.descriptionNormalLabel.withText('Beschreibung').exists).ok();
})

test('#33655: [Desktop] Check labels when switch to Floating in Create form', async t => {
    //Switch to Floating
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.floatingLabel)
        .click(indexSelector.closeLabelBtn);
    //Open form create account
    await t.click(indexSelector.addBtn);
    //Assert
    await t
        .expect((detailsSelector.codelBox).withAttribute('placeholder', 'Code').exists).ok()
        .expect((detailsSelector.nameBox).withAttribute('placeholder', 'Name').exists).ok()
        .expect((detailsSelector.descriptionBox).withAttribute('placeholder', 'Beschreibung').exists).ok();
})

test('#33658: [Desktop] Check labels when continuous switch between label types in Create form', async t => {
    //Switch to Floating
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.floatingLabel)
        .click(indexSelector.closeLabelBtn);
    //Open form create account
    await t.click(indexSelector.addBtn);
    //Assert
    await t
        .expect((detailsSelector.codelBox).withAttribute('placeholder', 'Code').exists).ok()
        .expect((detailsSelector.nameBox).withAttribute('placeholder', 'Name').exists).ok()
        .expect((detailsSelector.descriptionBox).withAttribute('placeholder', 'Beschreibung').exists).ok();
    //Switch to Regular
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.regularLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect(detailsSelector.codeNormalLabel.withText('Code').exists).ok()
        .expect(detailsSelector.nameNormalLabel.withText('Name').exists).ok()
        .expect(detailsSelector.descriptionNormalLabel.withText('Beschreibung').exists).ok();
    //Switch to Floating
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.floatingLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect((detailsSelector.codelBox).withAttribute('placeholder', 'Code').exists).ok()
        .expect((detailsSelector.nameBox).withAttribute('placeholder', 'Name').exists).ok()
        .expect((detailsSelector.descriptionBox).withAttribute('placeholder', 'Beschreibung').exists).ok();
    //Switch to Automatic
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.automaticLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect(detailsSelector.codeNormalLabel.withText('Code').exists).ok()
        .expect(detailsSelector.nameNormalLabel.withText('Name').exists).ok()
        .expect(detailsSelector.descriptionNormalLabel.withText('Beschreibung').exists).ok();
})

test('#32507: [Desktop]  Check default overview in Edit form', async t => {
    const createSettingContextTC1 = new CreateSettingContext();
    const editSettingContextTC1 = new EditSettingContext();
    //Create account
    await createSettingContextTC1.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Open Edit account
    await editSettingContextTC1.searchToEdit(createSettingContextTC1.codeValue)
    await t.wait(1000);
    //Assert
    await t
        .expect(detailsSelector.codeNormalLabel.withText('Code').exists).ok()
        .expect(detailsSelector.nameNormalLabel.withText('Name').exists).ok()
        .expect(detailsSelector.descriptionNormalLabel.withText('Beschreibung').exists).ok()
        .click(detailsSelector.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC1.codeValue);
})

test('#32508: [Desktop] Check labels when switch from Default to Floating in Edit form', async t => {
    const createSettingContextTC2 = new CreateSettingContext();
    const editSettingContextTC2 = new EditSettingContext();
    //Create account
    await createSettingContextTC2.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Open Edit account
    await editSettingContextTC2.searchToEdit(createSettingContextTC2.codeValue)
    await t.wait(1000);
    //Switch to Floating
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.floatingLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect((detailsSelector.codelBox).withAttribute('placeholder', 'Code').exists).ok()
        .expect((detailsSelector.nameBox).withAttribute('placeholder', 'Name').exists).ok()
        .expect((detailsSelector.descriptionBox).withAttribute('placeholder', 'Beschreibung').exists).ok()
        .click(detailsSelector.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC2.codeValue);
})

test('#33659: [Desktop] Check labels when continuous switch between label types in Edit form', async t => {
    const createSettingContextTC3 = new CreateSettingContext();
    const editSettingContextTC3 = new EditSettingContext();
    //Create account
    await createSettingContextTC3.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Open Edit account
    await editSettingContextTC3.searchToEdit(createSettingContextTC3.codeValue)
    await t.wait(1000);
    //Switch to Floating
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.floatingLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect((detailsSelector.codelBox).withAttribute('placeholder', 'Code').exists).ok()
        .expect((detailsSelector.nameBox).withAttribute('placeholder', 'Name').exists).ok()
        .expect((detailsSelector.descriptionBox).withAttribute('placeholder', 'Beschreibung').exists).ok()
    //Switch to Regular
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.regularLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect(detailsSelector.codeNormalLabel.withText('Code').exists).ok()
        .expect(detailsSelector.nameNormalLabel.withText('Name').exists).ok()
        .expect(detailsSelector.descriptionNormalLabel.withText('Beschreibung').exists).ok();
    //Switch to Floating
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.floatingLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect((detailsSelector.codelBox).withAttribute('placeholder', 'Code').exists).ok()
        .expect((detailsSelector.nameBox).withAttribute('placeholder', 'Name').exists).ok()
        .expect((detailsSelector.descriptionBox).withAttribute('placeholder', 'Beschreibung').exists).ok();
    //Switch to Automatic
    await t
        .click(indexSelector.userProfileBtn)
        .click(indexSelector.userSettingBtn)
        .click(indexSelector.labelDropdown)
        .click(indexSelector.automaticLabel)
        .click(indexSelector.closeLabelBtn);
    //Assert
    await t
        .expect(detailsSelector.codeNormalLabel.withText('Code').exists).ok()
        .expect(detailsSelector.nameNormalLabel.withText('Name').exists).ok()
        .expect(detailsSelector.descriptionNormalLabel.withText('Beschreibung').exists).ok()
        .click(detailsSelector.backBtn);
    //Delete data
    await deleteSettingContext.delete(createSettingContextTC3.codeValue);
})