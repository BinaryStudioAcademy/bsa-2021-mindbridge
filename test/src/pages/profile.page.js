const { Input, Button, Field } = require('../elements')

class ProfilePage {
    constructor() {
        this.editNameButton = new Button('button.styles_editButton__2qVOA');

        this.userFirstNameInput = new Input('input#name');
        this.userLastNameInput = new Input('input#surname');
        this.userNickNameInput = new Input('input#nickname');

        this.submitButton = new Button('button.styles_submitButton__3BW0M=Save');
        this.submitPasswordButton = new Button('button.styles_submitButton__3BW0M=Save', 1);

        this.successField = new Field('div.rrt-title');

        this.changePasswordButton = new Button('button.styles_submitButton__3BW0M=Change password');

        this.currentPasswordInput = new Input('input#current_password');
        this.newPasswordInput = new Input('input#new_password');
        this.confirmPasswordInput = new Input('input#confirm_password');

        this.homeButton = new Button('div.styles_left__LYk9C > a');

    }

    async editProfileInfo({ name, surname, nickname }) {

        await this.editNameButton.click();
        await this.userNickNameInput.setValue(nickname);
        await this.userFirstNameInput.setValue(name);
        await this.userLastNameInput.setValue(surname);
        await this.submitButton.click();

    }

    async getSuccessMsg() {
        return {
            successMsg: await this.successField.getText()
        }
    }

    async editPassword({ currentPassword, newPassword }) {

        await this.changePasswordButton.click();
        await this.currentPasswordInput.setValue(currentPassword);
        await this.newPasswordInput.setValue(newPassword);
        await this.confirmPasswordInput.setValue(newPassword);
        await this.submitPasswordButton.click();

        await browser.pause(500);

    }

    async goToHome() {
        await this.homeButton.click();
    }

}

module.exports = { ProfilePage };