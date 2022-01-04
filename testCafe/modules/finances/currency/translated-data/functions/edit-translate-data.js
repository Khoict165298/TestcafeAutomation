import { Selector, t } from "testcafe"
import PageDetailsSelector from "../../manage-currency/selectors/currency.detail.selector";
import PageDetails from "../selectors/page.details.selector";

const pageDetailCurrency = new PageDetailsSelector();
const pageDetailTranslated = new PageDetails();

class EditTranslateData {
    async edit() {
        await t
            .click(pageDetailCurrency.translateBtn)
            .click(pageDetailTranslated.codeDEBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.codeDEBox, 'Plato update DE')
            .click(pageDetailTranslated.codeENBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.codeENBox, 'Plato update EN')
            .click(pageDetailTranslated.codeFRBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.codeFRBox, 'Plato update FR')
            .click(pageDetailTranslated.nameDEbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameDEbox, 'Name update DE')
            .click(pageDetailTranslated.nameENbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameENbox, 'Name update EN')
            .click(pageDetailTranslated.nameFRbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameFRbox, 'Name update FR')
            .click(pageDetailTranslated.saveBtn);
    }
}
export default EditTranslateData