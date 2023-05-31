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

  let burgerCon = document.createElement("div");
  burgerCon.classList.add("bg-navy", "text-center", "text-white");
  burgerCon.innerHTML = `<h4>2254 Burgers</h4><p>one click ￥200</p>`;

  let burgerImgCon = document.createElement("div");
  burgerImgCon.classList.add(
    "col-12",
    "d-flex",
    "justify-content-center",
    "p-1"
  );

  let burgerImg = document.createElement("img");
  burgerImg.classList.add("image-fit", "col-10", "pt-4");
  burgerImg.src = "images/hamburger.png";

  burgerImgCon.append(burgerImg);
  leftContainer.append(burgerCon, burgerImgCon);

  let rightContainer = document.createElement("div");
  rightContainer.classList.add("col-8", "px-2");
  rightContainer.id = "right-area";

  let infoCon = document.createElement("div");
  infoCon.classList.add("pt-2", "pb-4", "px-2");
  infoCon.id = "info-area";

  infoCon.innerHTML = `<div class="bg-dark row m-0 text-center text-white">
  <div class="bg-navy border-navy col-6"><p>test2</p></div>
  <div class="bg-navy border-navy col-6"><p>29years old</p></div>
  <div class="bg-navy border-navy col-6"><p>3000days</p></div>
  <div class="bg-navy border-navy col-6"><p>¥3000</p></div></div>`;

  rightContainer.append(infoCon);
  navyContainer.append(leftContainer, rightContainer);
  container.append(navyContainer);

  config.mainGamePage.append(container);
}

let testAcount = new GameAccount("test", "24", "1580", "10000");
gameDataSave(testAcount);
