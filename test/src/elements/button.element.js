const { BaseElement } = require('./base.elements')

class Button extends BaseElement {
    constructor(selector, index) {
        super(selector, index);
    }

    async click() {
        let element;
        if (this.index) {
            element = (await $$(this.selector))[this.index];
        } else {
            element = await $(this.selector);
        }
        await this.waitForVisible(element);
        await element.click();
    }

    async clickByText(text) {
        let element = await $(this.selector.replace('TEXT_TO_REPLACE', text));
        await this.waitForVisible(element);
        await element.click();
    }
}

module.exports = { Button };