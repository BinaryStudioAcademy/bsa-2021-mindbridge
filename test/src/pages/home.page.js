const { Button } = require('../elements')
const { Field } = require('../elements')

class HomePage {
    constructor() {
        this.logInButton = new Button('button.styles_dark_button__335By=Log in');
        this.newAccountButton = new Button('button.styles_dark_button__335By=Create new account');
        this.nameField = new Field('div.styles_avatar_and_name_group__1tLkC span');
        this.settingsButton = new Button('div.ui.button.floating.labeled.dropdown');
        this.editProfileButton = new Button('span.text=Edit profile');
        this.signOutButton = new Button('span.text=Sign out');
    }

    async goToLogInForm() {
        await this.logInButton.click();
    }

    async goToSignUpForm() {
        await this.newAccountButton.click();
    }

    async goToProfile() {
        await this.settingsButton.click();
        await this.editProfileButton.click();
    }

    async getNameText() {
        return {
            nameText: await this.nameField.getText()
        }
    }

    async signOut() {
        await this.settingsButton.click();
        await this.signOutButton.click();
    }
}

module.exports = { HomePage };