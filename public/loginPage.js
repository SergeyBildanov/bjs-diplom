"use strict";

let userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    if(response.success === true){
        location.reload();
    }
    else{
        alert(response.error);
    }
});
userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    if(response.success === false){
        alert(response.error);
    }
    else{
        location.reload();
    }
});
