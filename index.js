config = {
  signupLoginPage: document.getElementById("signupLoginPage"),
  mainGamePage: document.getElementById("mainGamePage"),
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
  mainGamePage(userGameAccunt);
}

function mainGamePage(gameAccount) {
  config.mainGamePage.classList.add("d-block");

  let container = document.createElement("div");
  container.classList.add("col-12", "col-md-10", "col-lg-9");

  let navyContainer = document.createElement("div");
  navyContainer.classList.add("col-12", "bg-navy", "d-flex", "p-2");

  let leftContainer = document.createElement("div");
  leftContainer.classList.add("col-4", "bg-dark", "p-2");
  leftContainer.id = "left-area";

  let infoCon = document.createElement("div");
  infoCon.classList.add("bg-navy", "text-center", "text-white");
  infoCon.innerHTML = `<h4>2254 Burgers</h4>`;
  infoCon.innerHTML += `<p>one click ￥200</p>`;

  leftContainer.append(infoCon);
  navyContainer.append(leftContainer);
  container.append(navyContainer);

  config.mainGamePage.append(container);
}

let testAcount = new GameAccount("test", "24", "1580", "10000");
gameDataSave(testAcount);
