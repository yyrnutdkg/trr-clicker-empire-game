config = {
  signupLoginPage: document.getElementById("signupLoginPage"),
};

class GameAccount {
  constructor(userName, years, days, money) {
    this.userName = userName;
    this.years = years;
    this.days = days;
    this.money = money;
  }
}

function gameDataSave(userAcount) {
  let accountEncoded = JSON.stringify(userAcount);
  localStorage.setItem(userAcount.userName, accountEncoded);
}

function gameDataLoad(userName) {
  let gameAccountData = "";

  let savedData = localStorage.getItem(userName);
  if (savedData === null) {
    return gameAccountData;
  }
  gameAccountData = JSON.parse(savedData);

  return gameAccountData;
}

function initializeUserAccount() {
  const initialForm = document.getElementById("userForm");
  let userName = initialForm
    .querySelectorAll(`input[name="userName"]`)
    .item(0).value;

  if (userName === "") return alert("Please put your name");
  let userAccount = new GameAccount(userName, 0, 0, 50000);

  console.log(userAccount);
  config.signupLoginPage.classList.add("d-none");
}

function loginUserAccount() {
  const initialForm = document.getElementById("userForm");
  let userName = initialForm
    .querySelectorAll(`input[name="userName"]`)
    .item(0).value;

  if (userName === "") return alert("Please put your name");

  if (gameDataLoad(userName) === "") return alert("There is no data");
  let userGameAccunt = gameDataLoad(userName);
  console.log(userGameAccunt);
  config.signupLoginPage.classList.add("d-none");
}

let testAcount = new GameAccount("test", "24", "1580", "10000");
gameDataSave(testAcount);
