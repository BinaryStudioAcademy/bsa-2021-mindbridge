const { Input, Button, Field } = require('../elements')

class SignUpPage {
    constructor() {
        this.firstNameField = new Input('input#name');
        this.lastNameField = new Input('input#surname');
        this.nicknameField = new Input('input#nickname');
        this.emailField = new Input('input#email');
        this.passwordField = new Input('input#password');
        this.passwordConfirmField = new Input('input#passwordConfirm');
        this.signUpButton = new Button('button.styles_submitButton__3BW0M');
    }

    async signup({ firstName, lastName, nickname, email, password, passwordConfirm }) {
        await this.firstNameField.setValue(firstName);
        await this.lastNameField.setValue(lastName);
        await this.nicknameField.setValue(nickname);
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.passwordConfirmField.setValue(passwordConfirm);
        await this.signUpButton.click();
    }

}

module.exports = { SignUpPage };