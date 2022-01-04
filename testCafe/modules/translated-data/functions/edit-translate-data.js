import { Selector, t } from "testcafe"
import PageDetailsSelector from "../../manager-setting-context/selectors/page.details.selector";
import PageDetails from "../selectors/page.details.selector";

const pageDetailAccount = new PageDetailsSelector();
const pageDetailTranslated = new PageDetails();

class EditTranslateData {
    async edit() {
        await t
            .click(pageDetailAccount.translateBtn)
            .click(pageDetailTranslated.nameDEBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameDEBox, 'Plato update DE')
            .click(pageDetailTranslated.nameENBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameENBox, 'Plato update EN')
            .click(pageDetailTranslated.nameFRBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameFRBox, 'Plato update FR')
            .click(pageDetailTranslated.descriptionDEbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.descriptionDEbox, 'Description update DE')
            .click(pageDetailTranslated.descriptionENbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.descriptionENbox, 'Description update EN')
            .click(pageDetailTranslated.descriptionFRbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.descriptionFRbox, 'Description update FR')
            .click(pageDetailTranslated.saveBtn);
    }

    async editwithoutSave(de, en, fr) {
        await t
            .click(pageDetailAccount.translateBtn)
            .click(pageDetailTranslated.nameDEBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameDEBox, de)
            .click(pageDetailTranslated.nameENBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameENBox, en)
            .click(pageDetailTranslated.nameFRBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameFRBox, fr)
            
         
    }
}
export default EditTranslateData