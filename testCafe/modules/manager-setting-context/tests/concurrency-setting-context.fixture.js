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

fixture`Manage setting-context: concurrency`
    .page(config.UrlAdmin)
    .beforeEach(async t => {
        await config.configBeforeEach();
        await login.login(config.UserName, config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
        await t.wait(2000);
    })
    

test.meta({ type: 'base' })
  
    /*Scenario:  #34727/34740: Check concurrency when users edit setting context with Override option'
       - Open browser, login with user 1, edit a setting context
       - Open new browser, login with user 2, edit the same setting context with user 1
       - Back to user 1, click Save
       - Back to user 2, click Save
       - Click Override
        */
      ('#34727/34740: Check concurrency when users edit the same setting context with override option', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC2 = new CreateSettingContext();
        const editSettingContextTC201 = new EditSettingContext();
        const editSettingContextTC202 = new EditSettingContext();

        //Create setting-context at window 1
        await t.switchToWindow(window1);
        await createSettingContextTC2.createAcc()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit setting context at window 1
        await editSettingContextTC201.searchToEdit(createSettingContextTC2.codeValue)
        await editSettingContextTC201.edit()
        
        //Edit setting-context at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
        await editSettingContextTC202.searchToEdit(createSettingContextTC2.codeValue)
        await editSettingContextTC202.edit()
        //switch to window 1
        await t.switchToWindow(window1);
        await t.click(detailsSelector.saveCloseBtn)
        //switch to window 2
        await t.wait(3000)
        await t.switchToWindow(window2);
        await t.click(detailsSelector.saveCloseBtn)
        await t.wait(3000)
        //Assert message
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC201.codeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC201.nameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC201.descriptionValue)
       
        //Override information
        await t.click(detailsSelector.overrideBtn)
        //Assert
        await t
              .click(indexSelector.searchBox)
             .pressKey('ctrl+a delete')
            .typeText(indexSelector.searchBox, editSettingContextTC202.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC202.codeValue)
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC202.nameValue)
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC202.descriptionValue);

        //switch to window 1
       //Delete data
        await deleteSettingContext.delete(editSettingContextTC202.codeValue)

      })

test.meta({ type: 'base' })
    /*Scenario:  #34727/34740: Check concurrency when users edit setting context with refresh option'
       - Open browser, login with user 1, edit a setting context
       - Open new browser, login with user 2, edit the same setting context with user 1
       - Back to user 1, click Save
       - Back to user 2, click Save
       - Click Refresh
        */
    ('#34727/34740: Check concurrency when users edit the same setting context with refresh option', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC3 = new CreateSettingContext();
        const editSettingContextTC301 = new EditSettingContext();
        const editSettingContextTC302 = new EditSettingContext();

        //Create setting-context at window 1
        await t.switchToWindow(window1);
        await createSettingContextTC3.createAcc()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit setting context at window 1
        await editSettingContextTC301.searchToEdit(createSettingContextTC3.codeValue)
        await editSettingContextTC301.edit()

        //Edit setting-context at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
        await editSettingContextTC302.searchToEdit(createSettingContextTC3.codeValue)
        await editSettingContextTC302.edit()
        //switch to window 1
        await t.switchToWindow(window1);
        await t.click(detailsSelector.saveCloseBtn)
        //switch to window 2
      
        await t.switchToWindow(window2);
        await t.wait(7000)
        await t.click(detailsSelector.saveCloseBtn)
        await t.wait(3000)
        //Assert message
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC301.codeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC301.nameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC301.descriptionValue)
        await t.wait(3000)
        //Refresh information
        await t.click(detailsSelector.refreshBtn)
        await t.wait(5000)
        //Assert
        await t.expect(detailsSelector.codelBox.value).contains(editSettingContextTC301.codeValue)
        await t.expect(detailsSelector.nameBox.value).contains(editSettingContextTC301.nameValue)
        await t.expect(detailsSelector.descriptionBox.value).contains(editSettingContextTC301.descriptionValue)
        await t.click(detailsSelector.backBtn)
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.searchBox, editSettingContextTC301.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC301.codeValue)
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC301.nameValue)
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC301.descriptionValue);

        //switch to window 1
        //Delete data
        await deleteSettingContext.delete(editSettingContextTC301.codeValue)

    })

test.meta({ type: 'base' })
    /*Scenario:  #34727/34740: Check concurrency when users edit setting context with Cancel option'
       - Open browser, login with user 1, edit a setting context
       - Open new browser, login with user 2, edit the same setting context with user 1
       - Back to user 1, click Save
       - Back to user 2, click Save
       - Click Cancel
        */
    ('#34727/34741:Check concurrency when users edit the same setting context with cancel option', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC4 = new CreateSettingContext();
        const editSettingContextTC401 = new EditSettingContext();
        const editSettingContextTC402 = new EditSettingContext();

        //Create setting-context at window 1
        await t.switchToWindow(window1);
        await createSettingContextTC4.createAcc()
        await t.click(detailsSelector.saveCloseBtn)
        // Edit setting context at window 1
        await editSettingContextTC401.searchToEdit(createSettingContextTC4.codeValue)
        await editSettingContextTC401.edit()

        //Edit setting-context at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
        await editSettingContextTC402.searchToEdit(createSettingContextTC4.codeValue)
        await editSettingContextTC402.edit()
        //switch to window 1
        await t.switchToWindow(window1);
        await t.click(detailsSelector.saveCloseBtn)
        //switch to window 2

        await t.switchToWindow(window2);
        await t.wait(3000)
        await t.click(detailsSelector.saveCloseBtn)
        await t.wait(3000)
        //Assert message
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Datensatz, den Sie bearbeiten wollten, wurde vor Ihnen von einem anderen Benutzer geändert.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Der Editiervorgang wurde abgebrochen und die aktuellen Werte in der Datenbank wurden angezeigt.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Wenn Sie diesen Datensatz dennoch bearbeiten möchten, klicken Sie erneut auf die Schaltfläche Überschreiben.')
        await t.expect(detailsSelector.errorMessage.innerText).contains('Widersprüchliche Informationen')
        //Assert informantion
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC401.codeValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC401.nameValue)
        await t.expect(detailsSelector.errorMessage.innerText).contains(editSettingContextTC401.descriptionValue)
        await t.wait(3000)
        //Cancel information
        await t.click(detailsSelector.cancelBtn)
        await t.wait(5000)
        //Assert
        await t.expect(detailsSelector.codelBox.value).contains(editSettingContextTC402.codeValue)
        await t.expect(detailsSelector.nameBox.value).contains(editSettingContextTC402.nameValue)
        await t.expect(detailsSelector.descriptionBox.value).contains(editSettingContextTC402.descriptionValue)
        await t.click(detailsSelector.backBtn)
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.searchBox, editSettingContextTC401.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC401.codeValue)
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC401.nameValue)
            .expect(indexSelector.settingContextTable.innerText).contains(editSettingContextTC401.descriptionValue);

        //switch to window 1
        //Delete data
        await deleteSettingContext.delete(editSettingContextTC401.codeValue)
      
    })

test.meta({ type: 'base' })
    /*Scenario:  #34735: Check concurrency when users delete the same setting context'
       - Open browser, login with user 1, delete a setting context
       - Open new browser, login with user 2, delete the same setting context with user 1
       - Back to user 1, click Save
       - Back to user 2, click Save
   */
    ('#34735: Check concurrency when users delete the same setting context', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC5 = new CreateSettingContext();
       
        //Create setting-context at window 1
        await t.switchToWindow(window1);
        await createSettingContextTC5.createAcc()
        await t.click(detailsSelector.saveCloseBtn)
        // Delete setting context at window 1
        await t
            .typeText(indexSelector.searchBox, createSettingContextTC5.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC5.codeValue)
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC5.nameValue)
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC5.descriptionValue);
        await t
            .click(indexSelector.deleteBtn)

        //Delete setting-context at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.searchBox, createSettingContextTC5.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC5.codeValue)
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC5.nameValue)
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC5.descriptionValue);
        await t
            .click(indexSelector.deleteBtn)

        //switch to window 1
        await t.switchToWindow(window1);
        await t.wait(5000)
        await t.click(indexSelector.confirmDeleteBtn)
        //switch to window 2
        await t.switchToWindow(window2);
        await t.wait(7000)
        await t.click(indexSelector.confirmDeleteBtn)
        await t.expect(detailsSelector.errorMessage.innerText).contains('Kann nicht gelöscht werden. Der Datensatz wurde von einem anderen Benutzer gelöscht.')
        await t.click(detailsSelector.closeErrorMessage)
        //Assert
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.searchBox, createSettingContextTC5.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains('Keine Daten')

    })

test.meta({ type: 'base' })
    /*Scenario:  #34729: Check concurrency when user 1 delete and user 2 edit the same setting context'
       - Open browser, login with user 1, delete a setting context
       - Open new browser, login with user 2, edit the same setting context with user 1
       - Back to user 1, click Sav`e
       - Back to user 2, click Save
   */
    ('#34729: Check concurrency when user 1 delete and user 2 edit the same setting context', async t => {
        const window1 = await t.getCurrentWindow();
        const window2 = await t.openWindow(config.UrlAdmin);
        const createSettingContextTC6 = new CreateSettingContext();
        const editSettingContextTC602 = new EditSettingContext();

        //Create setting-context at window 1
        await t.switchToWindow(window1);
        await createSettingContextTC6.createAcc()
        await t.click(detailsSelector.saveCloseBtn)
        // Delete setting context at window 1
        await t
           
            .typeText(indexSelector.searchBox, createSettingContextTC6.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC6.codeValue)
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC6.nameValue)
            .expect(indexSelector.settingContextTable.innerText).contains(createSettingContextTC6.descriptionValue);
        await t
            .click(indexSelector.deleteBtn)

        //Edit setting-context at window 2
        await t.switchToWindow(window2);
        await t.maximizeWindow()
        await login.login('user2', config.Password);
        await t.click(indexSelector.manageSettingContextMenu);
        await editSettingContextTC602.searchToEdit(createSettingContextTC6.codeValue)
        await editSettingContextTC602.edit()

        //switch to window 1
        await t.switchToWindow(window1);
        await t.wait(10000)
        await t.click(indexSelector.confirmDeleteBtn)
        //switch to window 2
        await t.switchToWindow(window2);
        await t.wait(10000)
        await t.click(detailsSelector.saveCloseBtn)

        await t.expect(detailsSelector.errorMessage.innerText).contains('Speichern nicht möglich. Die Abteilung wurde von einem anderen Benutzer gelöscht.')
        await t.click(detailsSelector.closeErrorMessage)
         //Assert
        await t
            .click(indexSelector.searchBox)
            .pressKey('ctrl+a delete')
            .typeText(indexSelector.searchBox, createSettingContextTC6.codeValue)
            .pressKey('enter')
            .expect(indexSelector.settingContextTable.innerText).contains('Keine Daten')
    })


