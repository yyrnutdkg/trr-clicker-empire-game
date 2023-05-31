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
  constructor(name, amount, maxItemCount, price, profit, profitType, imgUrl) {
    this.name = name;
    this.amount = amount;
    this.maxItemCount = maxItemCount;
    this.price = price;
    this.profit = profit;
    this.profitType = profitType;
    this.imgUrl = imgUrl;
  }
}

const gameItems = [
  new GameItem("Flip machine", 0, 500, 15000, 25, "click", "grill.png"),
  new GameItem("ETF Stock", 0, Infinity, 300000, 0.1, "sec", "syouken.png"),
  new GameItem("ETF Bonds", 0, Infinity, 300000, 0.1, "sec", "syouken.png"),
  new GameItem("Lemonade Stand", 0, 1000, 30000, 30, "sec", "lemonade.png"),
  new GameItem("Ice Cream Truck", 0, 500, 100000, 120, "sec", "icecream.png"),
  new GameItem("House", 0, 100, 20000000, 32000, "sec", "house_1.png"),
  new GameItem(
    "TownHouse",
    0,
    100,
    40000000,
    64000,
    "sec",
    "designers_house.png"
  ),
  new GameItem("Mansion", 0, 20, 250000000, 500000, "sec", "mansion.png"),
  new GameItem(
    "Industrial Space",
    0,
    10,
    1000000000,
    2200000,
    "sec",
    "koujou.png"
  ),
  new GameItem(
    "Hotel Skyscraper",
    0,
    5,
    10000000000,
    25000000,
    "sec",
    "hotel.png"
  ),
  new GameItem(
    "Bullet-Speed Sky Railway",
    0,
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
  let userGameAccount = new GameAccount(userName, 0, 0, 50000);

  config.signupLoginPage.classList.add("d-none");
  config.mainGamePage.classList.add("d-block");
  config.mainGamePage.append(mainGamePage(userGameAccount));
}

function loginUserAccount() {
  const initialForm = document.getElementById("userForm");
  let userName = initialForm
    .querySelectorAll(`input[name="userName"]`)
    .item(0).value;

  if (userName === "") return alert("Please put your name");

  if (gameDataLoad(userName) === "") return alert("There is no data");
  let userGameAccount = gameDataLoad(userName);
  config.signupLoginPage.classList.add("d-none");
  config.mainGamePage.classList.add("d-block");

  config.mainGamePage.append(mainGamePage(userGameAccount));
}

function mainGamePage(gameAccount) {
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

  return container;
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
      let itemDetail = showItem(container, gameItems[i]);
      container.innerHTML = "";
      container.append(itemDetail);
    });
    container.append(itemCon);
  }

  return container;
}

function showItem(nodeList, item) {
  let container = document.createElement("div");
  container.classList.add("col-12", "bg-navy");

  container.innerHTML = `
    <div class="d-flex justify-content-between">
      <div class="col-6 p-3 text-white">
        <h4>${item.name}</h4>
        <p>Max purchases: ${
          item.maxItemCount === Infinity ? "∞" : item.maxItemCount
        }</p>
        <p>Price: ￥${item.price}</p>
        <p>Get ￥${item.profit} /${item.profitType}</p>
      </div>
      <div class="col-6 d-flex align-items-center justify-content-center">
        <img src="${config.imgPass}${item.imgUrl}" alt="" class="image-fit" />
      </div>
    </div>
    <div>
      <p class="ps-2 text-white">How many would you like to buy?</p>
      <form class="pt-1 px-2" action="">
        <input type="number" placeholder="0" class="col-12 form-control" />
      </form>
      <p class="p-2 text-end text-white">total: ¥0</p>
    </div>`;

  let btnCon = document.createElement("div");
  btnCon.classList.add("row", "m-0", "mb-2", "pb-3");
  btnCon.innerHTML = `<div class="row m-0 mb-2 pb-3">
  <div class="col-6 p-2">
    <button
      class="btn btn-outline-primary col-12 bg-light back-btn"
    >
      Go Back
    </button>
  </div>
  <div class="col-6 p-2">
    <button class="btn btn-primary col-12 next-btn">
      Purchase
    </button>
  </div>`;
  container.append(btnCon);

  let backbtn = btnCon.querySelectorAll(".back-btn")[0];
  backbtn.addEventListener("click", function () {
    container.innerHTML = "";
    container.append(itemList());
  });

  return container;
}

let testAcount = new GameAccount("test", "24", "1580", "10000");
gameDataSave(testAcount);
