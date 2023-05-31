config = {
  signupLoginPage: document.getElementById("signupLoginPage"),
  mainGamePage: document.getElementById("mainGamePage"),
  imgPass: "images/",
};

class GameAccount {
  constructor(userName, years, days, money) {
    this.userName = userName;
    this.years = years;
    this.days = days;
    this.money = money;
  }
}

class GameItem {
  constructor(name, maxItemCount, price, profit, profitType, imgUrl) {
    this.name = name;
    this.maxItemCount = maxItemCount;
    this.price = price;
    this.profit = profit;
    this.profitType = profitType;
    this.imgUrl = imgUrl;
  }
}

const gameItems = [
  new GameItem("Flip machine", 500, 15000, 25, "click", "grill.png"),
  new GameItem("ETF Stock", Infinity, 300000, 0.1, "sec", "syouken.png"),
  new GameItem("ETF Bonds", Infinity, 300000, 0.1, "sec", "syouken.png"),
  new GameItem("Lemonade Stand", 1000, 30000, 30, "sec", "lemonade.png"),
  new GameItem("Ice Cream Truck", 500, 100000, 120, "sec", "icecream.png"),
  new GameItem("House", 100, 20000000, 32000, "sec", "house_1.png"),
  new GameItem("TownHouse", 100, 40000000, 64000, "sec", "designers_house.png"),
  new GameItem("Mansion", 20, 250000000, 500000, "sec", "mansion.png"),
  new GameItem(
    "Industrial Space",
    10,
    1000000000,
    2200000,
    "sec",
    "koujou.png"
  ),
  new GameItem(
    "Hotel Skyscraper",
    5,
    10000000000,
    25000000,
    "sec",
    "hotel.png"
  ),
  new GameItem(
    "Bullet-Speed Sky Railway",
    1,
    10000000000000,
    30000000000,
    "sec",
    "shinkansen.png"
  ),
];

console.log(gameItems);

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
  burgerImg.src = `${config.imgPass}hamburger.png`;

  burgerImgCon.append(burgerImg);
  leftContainer.append(burgerCon, burgerImgCon);

  let rightContainer = document.createElement("div");
  rightContainer.classList.add("col-8", "px-2");
  rightContainer.id = "right-area";

  let infoCon = document.createElement("div");
  infoCon.classList.add("pt-2", "pb-4", "px-2");
  infoCon.id = "info-area";

  infoCon.innerHTML = `<div class="bg-dark row m-0 text-center text-white">
  <div class="bg-navy border-navy col-6"><p>${gameAccount.userName}</p></div>
  <div class="bg-navy border-navy col-6"><p>${gameAccount.years}years old</p></div>
  <div class="bg-navy border-navy col-6"><p>${gameAccount.days}days</p></div>
  <div class="bg-navy border-navy col-6"><p>¥${gameAccount.money}</p></div></div>`;

  let itemCon = document.createElement("div");
  itemCon.classList.add("bg-dark", "p-2", "available-items-list");
  itemCon.id = "item-menu";

  itemCon.append(itemList());

  rightContainer.append(infoCon, itemCon);
  navyContainer.append(leftContainer, rightContainer);
  container.append(navyContainer);

  config.mainGamePage.append(container);
}

function itemList() {
  let container = document.createElement("div");
  container.id = "item-container";

  for (let i = 0; i < gameItems.length; i++) {
    let itemCon = document.createElement("div");
    itemCon.classList.add(
      "text-white",
      "bg-navy",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mb-1",
      "item-card",
      "p-2"
    );
    itemCon.innerHTML = `<div class="col-4 d-flex justify-content-center">
    <img
      class="col-12 image-fit"
      src=${config.imgPass}${gameItems[i].imgUrl}
      alt=""
    />
  </div>
  <div class="col-4 text-start">
    <h4>${gameItems[i].name}</h4>
    <p>¥${gameItems[i].price}</p>
  </div>
  <div class="col-4 text-end">
    <h4>1</h4>
    <p class="text-success">¥${gameItems[i].profit} / ${gameItems[i].profitType}</p>
  </div>`;

    itemCon.addEventListener("click", function () {
      showItem(container, gameItems[i]);
    });
    container.append(itemCon);
  }

  return container;
}

function showItem(node, item) {
  console.log(node);
}

let testAcount = new GameAccount("test", "24", "1580", "10000");
gameDataSave(testAcount);
