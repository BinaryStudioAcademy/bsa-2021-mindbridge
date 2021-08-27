const { Input, Button, Field } = require('../elements')

class SignInPage {
    constructor() {
        this.emailField = new Input('input#email');
        this.passwordField = new Input('input#password');
        this.signInButton = new Button('button.styles_submitButton__3BW0M');
        this.errorField = new Field('div.rrt-title');
    }

    async login({ email, password }) {

        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.signInButton.click();
    }

}

module.exports = { SignInPage };