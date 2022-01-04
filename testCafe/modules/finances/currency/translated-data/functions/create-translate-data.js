import { Selector, t } from "testcafe"
import PageDetailsSelector from "../../manage-currency/selectors/currency.detail.selector";
import PageDetails from "../selectors/page.details.selector";

const pageDetailCurrency = new PageDetailsSelector();
const pageDetailTranslated = new PageDetails();

class CreateTranslateData {
    async createTranslate() {
        await t
            .click(pageDetailCurrency.translateBtn)
            .typeText(pageDetailTranslated.codeDEBox, 'Plato DE')
            .typeText(pageDetailTranslated.codeENBox, 'Plato EN')
            .typeText(pageDetailTranslated.codeFRBox, 'Plato FR')
            .typeText(pageDetailTranslated.nameDEbox, 'Name DE')
            .typeText(pageDetailTranslated.nameENbox, 'Name EN')
            .typeText(pageDetailTranslated.nameFRbox, 'Name FR')
            .click(pageDetailTranslated.saveBtn);
    }
}
export default CreateTranslateData