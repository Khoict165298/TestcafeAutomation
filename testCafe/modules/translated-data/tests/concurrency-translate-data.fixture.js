
import Configuration from "../../../commons/configuration";
import LoginPage from "../../authentication/functions/login-page";
import CreateSettingContext from "../../manager-setting-context/functions/create-setting-context";
import EditSettingContext from "../../manager-setting-context/functions/edit-setting-context";
import DeleteSettingContext from "../../manager-setting-context/functions/delete-setting-context";
import PageDetailsSelector from "../../manager-setting-context/selectors/page.details.selector";
import PageIndexSelector from "../../manager-setting-context/selectors/page.index.selector";
import PageDetails from "../selectors/page.details.selector";
import CreateTranslateData from "../functions/create-translate-data";
import EditTranslateData from "../functions/edit-translate-data";

const config = new Configuration();
const login = new LoginPage();

const editSettingContext = new EditSettingContext();
const deleteSettingContext = new DeleteSettingContext();
const pageDetailSettingContext = new PageDetailsSelector();
const pageIndexSettingContext = new PageIndexSelector();
const pageDetailTranslated = new PageDetails();
const createTransData = new CreateTranslateData();
const editTransData = new EditTranslateData();

fixture`Translate data: concurrency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(pageIndexSettingContext.manageSettingContextMenu);
        await t.wait(2000);
    })

test.meta({ type: 'base' })
    /*Scenario:  #34743/34740: Check concurrency when both user edit Translate data at the same setting context with Override option'
       - Open browser, login with user 1, update translate data of a setting context
       - Open new browser, login with user 2, update translate data of the same setting context with user 1
       - Back to user 1, click Save
       - Back to user 2, click Save
       - Click Override option
   */
     ('#34743/34740: Check concurrency when both user edit Translate data at the same setting context with Override option', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC1 = new CreateSettingContext();

        //Create translate data at window 1
        await t.switchToWindow(window1);
        await t
            .click(pageIndexSettingContext.addBtn)
            .click(pageDetailSettingContext.codelBox)
            .typeText(pageDetailSettingContext.codelBox, createSettingContextTC1.codeValue);      
        await createTransData.createTranslate();
        await t.click(pageDetailSettingContext.saveCloseBtn);
        //Edit translate data at window 1
        await editSettingContext.searchToEdit(createSettingContextTC1.codeValue);
        await t.wait(3000)
        await editTransData.editwithoutSave('Plato update DE', 'Plato update EN', 'Plato update FR')

        //Edit translate data at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(pageIndexSettingContext.manageSettingContextMenu);
        await editSettingContext.searchToEdit(createSettingContextTC1.codeValue);
        await t.wait(3000)
        await editTransData.editwithoutSave('Plato update DE 2', 'Plato update EN 2', 'Plato update FR 2')
        
        //Switch to window 1
        await t.switchToWindow(window1);
        await t.wait(5000)
        await t.click(pageDetailTranslated.saveBtn);
        await t.click(pageDetailSettingContext.saveCloseBtn)
        //Assert  after edit translate data
        await t
             
            //Assert in view table
            .click(pageIndexSettingContext.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(pageIndexSettingContext.searchBox, createSettingContextTC1.codeValue)
            .pressKey('enter')
            .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')
            
        //Switch to window 2
        await t.switchToWindow(window2);
        await t.wait(5000)
        await t.click(pageDetailTranslated.saveBtn);
        await t.click(pageDetailSettingContext.saveCloseBtn)
        await t.wait(3000)
        //Assert  after edit translate data
        //Assert message
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Plato update DE')
         //Click Override
         await t.click(pageDetailTranslated.overrideConflictBtn)
                .click(pageIndexSettingContext.searchBox)
                .pressKey('ctrl+a delete')
                .typeText(pageIndexSettingContext.searchBox, createSettingContextTC1.codeValue)
                .pressKey('enter')
                .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE 2')
        //Switch to window 1
        await t.switchToWindow(window1);
        await deleteSettingContext.delete(createSettingContextTC1.codeValue)

    })

test.meta({ type: 'base' })
        /*Scenario:  #34743/34741: Check concurrency when both user edit Translate data at the same setting context with Refresh option'
           - Open browser, login with user 1, update translate data of a setting context
           - Open new browser, login with user 2, update translate data of the same setting context with user 1
           - Back to user 1, click Save
           - Back to user 2, click Save
           - Click Refersh option
       */
        ('#34743/34741: Check concurrency when both user edit Translate data at the same setting context with Refresh option', async t => {
            const window1 = await t.getCurrentWindow();
            const window2 = await t.openWindow(config.UrlAdmin);
            const createSettingContextTC2 = new CreateSettingContext();

            //Create translate data at window 1
            await t.switchToWindow(window1);
            await t
                .click(pageIndexSettingContext.addBtn)
                .click(pageDetailSettingContext.codelBox)
                .typeText(pageDetailSettingContext.codelBox, createSettingContextTC2.codeValue);

            await createTransData.createTranslate();
            await t.click(pageDetailSettingContext.saveCloseBtn);
            //Edit translate data at window 1
            await editSettingContext.searchToEdit(createSettingContextTC2.codeValue);
            await t.wait(3000)
            await editTransData.editwithoutSave('Plato update DE', 'Plato update EN', 'Plato update FR')

            //Edit translate data at window 2
            await t.switchToWindow(window2);
            await t.maximizeWindow()
            await login.login('user2', config.Password);
            await t.click(pageIndexSettingContext.manageSettingContextMenu);
            await editSettingContext.searchToEdit(createSettingContextTC2.codeValue);
            await t.wait(3000)
            await editTransData.editwithoutSave('Plato update DE 2', 'Plato update EN 2', 'Plato update FR 2')

            //Switch to window 1
            await t.switchToWindow(window1);
            await t.wait(3000)
            await t.click(pageDetailTranslated.saveBtn);
            await t.click(pageDetailSettingContext.saveCloseBtn)
            //Assert  after edit translate data
            await t

                //Assert in view table
                .click(pageIndexSettingContext.searchBox)
                .pressKey('ctrl+a delete')
                .typeText(pageIndexSettingContext.searchBox, createSettingContextTC2.codeValue)
                .pressKey('enter')
                .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')

            //Switch to window 2
            await t.switchToWindow(window2);
            await t.wait(7000)
            await t.click(pageDetailTranslated.saveBtn);
            await t.click(pageDetailSettingContext.saveCloseBtn)
            await t.wait(3000)
            //Assert  after edit translate data
            //Assert message
            await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
            await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
            await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
            await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Widersprüchliche Informationen')
            //Assert informantion
            await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Plato update DE')
            //Click Override
            await t.click(pageDetailTranslated.refreshConflictBtn)
            await t.wait(5000)
            //Assert
            await t.expect(pageDetailSettingContext.nameBox.value).contains('Plato update DE')
            
            await t.click(pageDetailSettingContext.backBtn)
            await t
                .click(pageIndexSettingContext.searchBox)
                .pressKey('ctrl+a delete')
                .typeText(pageIndexSettingContext.searchBox, createSettingContextTC2.codeValue)
                .pressKey('enter')
                .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')
           //Switch to window 1
            await t.switchToWindow(window1);
            await deleteSettingContext.delete(createSettingContextTC2.codeValue)
               
        })

test.meta({ type: 'base' })
    /*Scenario:  #34743/34742: Check concurrency when both user edit Translate data at the same setting context with Refresh option'
       - Open browser, login with user 1, update translate data of a setting context
       - Open new browser, login with user 2, update translate data of the same setting context with user 1
       - Back to user 1, click Save
       - Back to user 2, click Save
       - Click Cancel option
   */
    ('#34743/34741: Check concurrency when both user edit Translate data at the same setting context with Cancel option', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC3 = new CreateSettingContext();

        //Create translate data at window 1
        await t.switchToWindow(window1);
        await t
            .click(pageIndexSettingContext.addBtn)
            .click(pageDetailSettingContext.codelBox)
            .typeText(pageDetailSettingContext.codelBox, createSettingContextTC3.codeValue);

        await createTransData.createTranslate();
        await t.click(pageDetailSettingContext.saveCloseBtn);
        //Edit translate data at window 1
        await editSettingContext.searchToEdit(createSettingContextTC3.codeValue);
        await t.wait(3000)
        await editTransData.editwithoutSave('Plato update DE', 'Plato update EN', 'Plato update FR')

        //Edit translate data at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(pageIndexSettingContext.manageSettingContextMenu);
        await editSettingContext.searchToEdit(createSettingContextTC3.codeValue);
        await t.wait(3000)
        await editTransData.editwithoutSave('Plato update DE 2', 'Plato update EN 2', 'Plato update FR 2')

        //Switch to window 1
        await t.switchToWindow(window1);
        await t.wait(5000)
        await t.click(pageDetailTranslated.saveBtn);
        await t.click(pageDetailSettingContext.saveCloseBtn)
        //Assert  after edit translate data
        await t

            //Assert in view table
            .click(pageIndexSettingContext.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(pageIndexSettingContext.searchBox, createSettingContextTC3.codeValue)
            .pressKey('enter')
            .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')

        //Switch to window 2
        await t.switchToWindow(window2);
        await t.wait(3000)
        await t.click(pageDetailTranslated.saveBtn);
        await t.click(pageDetailSettingContext.saveCloseBtn)
        await t.wait(3000)
        //Assert  after edit translate data
        //Assert message
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(pageDetailTranslated.errorMessage.innerText).contains('Plato update DE')
        //Click Override
        await t.click(pageDetailTranslated.cancelConfictBtn)
        await t.wait(5000)
        //Assert
        await t.expect(pageDetailSettingContext.nameBox.value).contains('Plato update DE 2')

        await t.click(pageDetailSettingContext.backBtn)
        await t
            .click(pageIndexSettingContext.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(pageIndexSettingContext.searchBox, createSettingContextTC3.codeValue)
            .pressKey('enter')
            .expect(pageIndexSettingContext.settingContextTable.innerText).contains('Plato update DE')
        //Switch to window 1
        await t.switchToWindow(window1);
        await deleteSettingContext.delete(createSettingContextTC3.codeValue)

    })