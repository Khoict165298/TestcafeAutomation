import { Selector, t } from "testcafe"
import DunningDetailSelector from "../../manage-dunning-level/selectors/dunning.detail.selector";
import PageDetails from "../selectors/page.details.selector";

const pageDetailDunningLevels = new DunningDetailSelector();
const pageDetailTranslated = new PageDetails();

class CreateTranslateData {
    async createTranslate() {
        await t
            .click(pageDetailDunningLevels.translateBtn)
            .typeText(pageDetailTranslated.nameDEbox, 'Name DE')
            .typeText(pageDetailTranslated.nameENbox, 'Name EN')
            .typeText(pageDetailTranslated.nameFRbox, 'Name FR')
            .typeText(pageDetailTranslated.descriptionDEBox, 'Plato description DE')
            .typeText(pageDetailTranslated.descriptionENBox, 'Plato description EN')
            .typeText(pageDetailTranslated.descriptionFRBox, 'Plato description FR')
            .click(pageDetailTranslated.saveBtn);
    }
}
export default CreateTranslateData