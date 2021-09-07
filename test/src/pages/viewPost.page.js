const { Input, Button, Field } = require('../elements')

class ViewPostPage{
    constructor(){
        this.successField = new Field('div.rrt-middle-container');
    }

    async getSuccessMsg() {
        return {
            successMsg: await this.successField.getText(),
        }
    }
}

module.exports = {ViewPostPage};