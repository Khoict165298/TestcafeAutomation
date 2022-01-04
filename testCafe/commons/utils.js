class Utils {

    constructor() {
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    getText(text, numberChar) {
        if (!text) {
            text = '';
        }
        numberChar = numberChar - text.length;

        if (numberChar <= 0) {
            return text;
        }
        var charactersLength = this.characters.length;
        for (var i = 0; i < numberChar; i++) {
            text += this.characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return text;
    }


}

export default Utils;