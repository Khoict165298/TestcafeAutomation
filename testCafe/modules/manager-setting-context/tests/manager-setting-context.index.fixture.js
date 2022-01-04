
import { Selector, t } from "testcafe";
import Configuration from "../../../commons/configuration";
import LoginPage from "../../authentication/functions/login-page";
import PageDetailsSelector from "../selectors/page.details.selector";
import PageIndexSelector from "../selectors/page.index.selector";
import CreateSettingContext from "../functions/create-setting-context"
import DeleteSettingContext from "../functions/delete-setting-context"

const config = new Configuration();
const login = new LoginPage();
const detailsSelector = new PageDetailsSelector();
const indexSelector = new PageIndexSelector();
const deleteSettingContext = new DeleteSettingContext();

fixture`Manage setting-context: delete setting-context`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
    })

test('#30106: Check delete setting-context', async t => {
    const createSettingContextTC1 = new CreateSettingContext();
    //Create setting-context
    await createSettingContextTC1.createAcc()
    await t.click(detailsSelector.saveCloseBtn);
    //Delete setting-context
    await deleteSettingContext.delete(createSettingContextTC1.codeValue)
    //Assert
    await t
        .click(indexSelector.searchBox)
        .pressKey('ctrl+a')
        .pressKey('delete')
        .typeText(indexSelector.searchBox, createSettingContextTC1.codeValue)
        .pressKey('enter')
        .expect(Selector('td').withText('Keine Daten').exists).ok();
});
