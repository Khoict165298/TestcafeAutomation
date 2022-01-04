import { Selector } from "testcafe";

export default class TranslatePaymentIndex {
    constructor() {
        //Begin menu bar
        this.languageToggle = Selector('a').withAttribute('data-toggle', 'dropdown');
        this.languageENDrop = Selector('img').withAttribute('src', '_content/ACAG.UtilityNL.Blazor/imgs/united-kingdom-flag.svg');
        this.languageDEDrop = Selector('img').withAttribute('src', '_content/ACAG.UtilityNL.Blazor/imgs/germany-flag.svg');
        this.languageFRDrop = Selector('img').withAttribute('src', '_content/ACAG.UtilityNL.Blazor/imgs/france-flag.svg');
    }
};