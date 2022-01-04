import { Selector, t } from "testcafe"
import PageDetailsSelector from "../../manager-setting-context/selectors/page.details.selector";
import PageDetails from "../selectors/page.details.selector";

const pageDetailAccount = new PageDetailsSelector();
const pageDetailTranslated = new PageDetails();

class CreateTranslateData {
    async createTranslate() {
        await t
            .click(pageDetailAccount.translateBtn)
            .typeText(pageDetailTranslated.nameDEBox, 'Plato DE')
            .typeText(pageDetailTranslated.nameENBox, 'Plato EN')
            .typeText(pageDetailTranslated.nameFRBox, 'Plato FR')
            .typeText(pageDetailTranslated.descriptionDEbox, 'Description DE')
            .typeText(pageDetailTranslated.descriptionENbox, 'Description EN')
            .typeText(pageDetailTranslated.descriptionFRbox, 'Description FR')
            .click(pageDetailTranslated.saveBtn);
    }
}
export default CreateTranslateData