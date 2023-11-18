"use strict"

function getStocks(){
    ApiConnector.getStocks(response => {
        if(response.success === true){
            myRatesBoard.clearTable();
            myRatesBoard.fillTable(response.data);
        }
    });
}
let myLogoutButton = new LogoutButton();
myLogoutButton.action = () => ApiConnector.logout((response) => {
    if(response.success === true){
        location.reload();
    }
});

ApiConnector.current(response =>{
    if(response.success === true){
        ProfileWidget.showProfile(response.data);
    }
});

let myRatesBoard = new RatesBoard();
getStocks();
setInterval(getStocks, 60000);

let myMoneyManager = new MoneyManager();
myMoneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if(response.success === true){
        ProfileWidget.showProfile(response.data);
        myMoneyManager.setMessage(response.success, "Пополнение счета прошло успешно. Деньги на баланс зачислены.")
    }
    else{
        myMoneyManager.setMessage(response.success, response.error)
    }
});
myMoneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response =>{
    if(response.success === true){
        ProfileWidget.showProfile(response.data);
        myMoneyManager.setMessage(response.success, "Конвертация средств прошла успешно.")
    }
    else{
        myMoneyManager.setMessage(response.success, response.error)
    }
})
myMoneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response =>{
    if(response.success === true){
        ProfileWidget.showProfile(response.data);
        myMoneyManager.setMessage(response.success, "Перевод средств пользователю прошел успешно.")
    }
    else{
        myMoneyManager.setMessage(response.success, response.error)
    }
})

let myFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success === true){
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(response.data);
        myMoneyManager.updateUsersList(response.data);
    }
})
myFavoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if(response.success === true){
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(response.data);
        myMoneyManager.updateUsersList(response.data);
        myFavoritesWidget.setMessage(response.success, "Пользователь был успешно добавлен в список");
    }
    else{
        myFavoritesWidget.setMessage(response.success, response.error);
    }
})
myFavoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    if(response.success === true){
        myFavoritesWidget.clearTable();
        myFavoritesWidget.fillTable(response.data);
        myMoneyManager.updateUsersList(response.data);
        myFavoritesWidget.setMessage(response.success, "Пользователь был успешно удален из списка");
    }
    else{
        myFavoritesWidget.setMessage(response.success, response.error); 
    }
})
