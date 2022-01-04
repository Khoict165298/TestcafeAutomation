import { Selector, t } from "testcafe"
import DunningDetailSelector from "../../manage-dunning-level/selectors/dunning.detail.selector";
import PageDetails from "../selectors/page.details.selector";

const pageDetailDunning = new DunningDetailSelector();
const pageDetailTranslated = new PageDetails();

class EditTranslateData {
    async edit() {
        await t
            .click(pageDetailDunning.translateBtn)
            .click(pageDetailTranslated.nameDEbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameDEbox, 'Name update DE')
            .click(pageDetailTranslated.nameENbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameENbox, 'Name update EN')
            .click(pageDetailTranslated.nameFRbox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.nameFRbox, 'Name update FR')
            .click(pageDetailTranslated.descriptionDEBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.descriptionDEBox, 'Plato update DE')
            .click(pageDetailTranslated.descriptionENBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.descriptionENBox, 'Plato update EN')
            .click(pageDetailTranslated.descriptionFRBox)
            .pressKey('ctrl+a delete')
            .typeText(pageDetailTranslated.descriptionFRBox, 'Plato update FR')
            .click(pageDetailTranslated.saveBtn);
    }
}
export default EditTranslateData