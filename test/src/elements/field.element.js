const { BaseElement } = require('./base.elements')

class Field extends BaseElement {
    constructor(selector, index) {
        super(selector, index);
    }

    async getText() {
        let element;
        if (this.index) {
            element = (await $$(this.selector))[this.index];
        } else {
            element = await $(this.selector);
        }
        await this.waitForVisible(element);
        const text = await element.getText();
        return text;
    }

}

module.exports = { Field };