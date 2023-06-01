config = {
  signupLoginPage: document.getElementById("signupLoginPage"),
  mainGamePage: document.getElementById("mainGamePage"),
  imgPass: "images/",
};

class GameAccount {
  constructor(
    userName,
    year,
    days,
    money,
    amountPerClick,
    updateAmountPerSecond,
    itemInfo
  ) {
    this.userName = userName;
    this.year = year;
    this.days = days;
    this.money = money;
    this.clickCount = 0;
    this.amountPerClick = amountPerClick;
    this.updateAmountPerSecond = updateAmountPerSecond;
    this.itemInfo = itemInfo;
  }

  updatePerSeconds() {
    this.updateDay(1);
    this.updateYear(1);
    this.updateMoney();
  }
  updateDay(updateCount) {
    this.days = this.days + updateCount;
  }
  updateYear(updateCount) {
    if (this.days % 365 == 0) this.year = this.year + updateCount;
  }
  updateMoney() {
    this.money = this.money + this.updateAmountPerSecond;
  }

  clicked() {
    this.clickCount = this.clickCount + 1;
    this.money = this.money + this.amountPerClick;
  }
  makePayment(itemCost) {
    this.money = this.money - itemCost;
  }
  updateAmountPerClick(itemProfit) {
    this.amountPerClick = this.amountPerClick + itemProfit;
  }
  addAmountPerSecond(itemProfit) {
    this.updateAmountPerSecond = this.updateAmountPerSecond + itemProfit;
  }
}

class GameItem {
  constructor(
    name,
    type,
    maxItemCount,
    price,
    purchaseIncreaseRate,
    profit,
    profitType,
    profitRate,
    imgUrl
  ) {
    this.name = name;
    this.type = type;
    this.amount = 0;
    this.maxItemCount = maxItemCount;
    this.price = price;
    this.purchaseIncreaseRate = purchaseIncreaseRate;
    this.profit = profit;
    this.profitType = profitType;
    this.profitRate = profitRate;
    this.imgUrl = imgUrl;
  }
}

function gameDataSave(userAcount, counter) {
  let accountEncoded = JSON.stringify(userAcount);
  localStorage.setItem(userAcount.userName, accountEncoded);
  endGame(counter);
}
function gameDataReset(userAccount, counter) {
  localStorage.removeItem(userAccount.userName);
  endGame(counter);
}

function gameDataLoad(userName) {
  let gameAccountDataObj = "";

  let savedData = localStorage.getItem(userName);
  if (savedData === null) {
    return gameAccountDataObj;
  }

  gameAccountDataObj = JSON.parse(savedData);

  let gameAccountData = new GameAccount(
    gameAccountDataObj.userName,
    parseInt(gameAccountDataObj.year),
    parseInt(gameAccountDataObj.days),
    parseInt(gameAccountDataObj.money),
    parseInt(gameAccountDataObj.amountPerClick),
    parseInt(gameAccountDataObj.updateAmountPerSecond),
    gameAccountDataObj.itemInfo
  );

  return gameAccountData;
}

function createInitialUser(name) {
  const itemList = [
    new GameItem(
      "Flip machine",
      "ability",
      500,
      15000,
      0,
      25,
      "click",
      0,
      "grill.png"
    ),
    new GameItem(
      "ETF Stock",
      "investment",
      Infinity,
      300000,
      10,
      0.1,
      "sec",
      0.1,
      "syouken.png"
    ),
    new GameItem(
      "ETF Bonds",
      "investment",
      Infinity,
      300000,
      0,
      0.1,
      "sec",
      0.07,
      "syouken.png"
    ),
    new GameItem(
      "Lemonade Stand",
      "realEstate",
      1000,
      30000,
      0,
      30,
      "sec",
      0,
      "lemonade.png"
    ),
    new GameItem(
      "Ice Cream Truck",
      "realEstate",
      500,
      100000,
      0,
      120,
      "sec",
      0,
      "icecream.png"
    ),
    new GameItem(
      "House",
      "realEstate",
      100,
      20000000,
      0,
      32000,
      "sec",
      0,
      "house_1.png"
    ),
    new GameItem(
      "TownHouse",
      "realEstate",
      100,
      40000000,
      0,
      64000,
      "sec",
      0,
      "designers_house.png"
    ),
    new GameItem(
      "Mansion",
      "realEstate",
      20,
      250000000,
      0,
      500000,
      "sec",
      0,
      "mansion.png"
    ),
    new GameItem(
      "Industrial Space",
      "realEstate",
      10,
      1000000000,
      0,
      2200000,
      "sec",
      0,
      "koujou.png"
    ),
    new GameItem(
      "Hotel Skyscraper",
      "realEstate",
      5,
      10000000000,
      0,
      25000000,
      "sec",
      0,
      "hotel.png"
    ),
    new GameItem(
      "Bullet-Speed Sky Railway",
      "realEstate",
      1,
      10000000000000,
      0,
      30000000000,
      "sec",
      0,
      "shinkansen.png"
    ),
  ];

  let user = new GameAccount(name, 20, 0, 50000, 25, 0, itemList);
  return user;
}

function moveToMainPage(userAccount) {
  config.signupLoginPage.classList.add("d-none");
  config.mainGamePage.classList.add("d-block");
  config.signupLoginPage.classList.remove("d-block");
  config.mainGamePage.classList.remove("d-none");
  config.mainGamePage.append(mainGamePage(userAccount));
}

function moveToSignupLoginPage() {
  config.signupLoginPage.classList.remove("d-none");
  config.signupLoginPage.classList.add("d-block");
  config.mainGamePage.classList.remove("d-block");
  config.mainGamePage.classList.add("d-none");
  config.mainGamePage.innerHTML = "";
}

function startGame(userAccount) {
  moveToMainPage(userAccount);
  let timerId = startCount(userAccount);
  //let systemBtns = config.mainGamePage.querySelectorAll(".system-btn-area")[0];
  config.mainGamePage.setAttribute("data-sbtn", timerId);
}
function endGame(counter) {
  stopCount(counter);
  moveToSignupLoginPage();
}

function newGame() {
  const initialForm = document.getElementById("userForm");
  let userName = initialForm
    .querySelectorAll(`input[name="userName"]`)
    .item(0).value;
  if (userName === "") return alert("Please put your name");
  let userAccount = createInitialUser(userName);
  startGame(userAccount);
}

function loginGame() {
  const initialForm = document.getElementById("userForm");
  let userName = initialForm
    .querySelectorAll(`input[name="userName"]`)
    .item(0).value;

  if (userName === "") return alert("Please put your name");

  if (gameDataLoad(userName) === "") return alert("There is no data");
  let userAccount = gameDataLoad(userName);
  startGame(userAccount);
}

function mainGamePage(userAccount) {
  let container = document.createElement("div");
  container.classList.add("col-12", "col-md-10", "col-lg-9");

  let navyContainer = document.createElement("div");
  navyContainer.classList.add("col-12", "bg-navy", "d-flex", "p-2");

  let leftContainer = document.createElement("div");
  leftContainer.classList.add(
    "col-4",
    "bg-dark",
    "p-2",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );
  leftContainer.id = "left-area";

  let topContainer = document.createElement("div");

  let burgerCon = document.createElement("div");
  burgerCon.classList.add("bg-navy", "text-center", "text-white");
  burgerCon.innerHTML = `<h4 id="click-count">${userAccount.clickCount} Burgers</h4><p>one click ￥${userAccount.amountPerClick}</p>`;

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

  burgerImgCon.addEventListener("click", function () {
    userAccount.clicked();
    let clickCountH4 = document.getElementById("click-count");
    let userMoneyP = document.getElementById("user-money");
    clickCountH4.innerHTML = `${userAccount.clickCount} Burgers`;
    userMoneyP.innerHTML = `¥${userAccount.money}`;
  });
  burgerImgCon.append(burgerImg);
  topContainer.append(burgerCon, burgerImgCon);

  let bottomContainer = document.createElement("div");
  let systemBtnArea = document.createElement("div");
  systemBtnArea.classList.add(
    "col-12",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "system-btn-area"
  );
  systemBtnArea.innerHTML = `<div class="col-5 system-icon reset-btn">
      <i class="fas fa-undo fa-3x p-1"></i>
    </div>
    <div class="col-5 system-icon save-btn">
      <i class="fas fa-save fa-3x p-1"></i>
    </div>`;

  bottomContainer.append(systemBtnArea);
  leftContainer.append(topContainer, bottomContainer);

  let resetBtn = systemBtnArea.querySelectorAll(".reset-btn")[0];
  resetBtn.addEventListener("click", function () {
    let alertMes = confirm("Reset Your Account?");
    if (alertMes) {
      let timerId = parseInt(config.mainGamePage.getAttribute("data-sbtn"));
      gameDataReset(userAccount, timerId);
    }
  });

  let saveBtn = systemBtnArea.querySelectorAll(".save-btn")[0];
  saveBtn.addEventListener("click", function () {
    let alertMes = confirm("Save Your Account?");
    if (alertMes) {
      let timerId = parseInt(config.mainGamePage.getAttribute("data-sbtn"));
      alert(
        `Please enter your username to log in. your username is "${userAccount.userName}"`
      );
      gameDataSave(userAccount, timerId);
    }
  });

  let rightContainer = document.createElement("div");
  rightContainer.classList.add("col-8", "px-2");
  rightContainer.id = "right-area";

  let infoCon = document.createElement("div");
  infoCon.classList.add("pt-2", "pb-4", "px-2");
  infoCon.id = "info-area";

  infoCon.innerHTML = `<div class="bg-dark row m-0 text-center text-white">
  <div class="bg-navy border-navy col-6 user-name"><p>${userAccount.userName}</p></div>
  <div class="bg-navy border-navy col-6"><p id="user-year">${userAccount.year}years old</p></div>
  <div class="bg-navy border-navy col-6"><p id="user-days">${userAccount.days}days</p></div>
  <div class="bg-navy border-navy col-6"><p id="user-money">¥${userAccount.money}</p></div></div>`;

  let itemCon = document.createElement("div");
  itemCon.classList.add("bg-dark", "p-2", "available-items-list");
  itemCon.id = "item-menu";

  itemCon.append(itemList(userAccount));

  rightContainer.append(infoCon, itemCon);
  navyContainer.append(leftContainer, rightContainer);
  container.append(navyContainer);

  return container;
}

function itemList(userAccount) {
  let container = document.createElement("div");
  container.id = "item-container";
  let items = userAccount.itemInfo;

  for (let i = 0; i < items.length; i++) {
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
      src=${config.imgPass}${items[i].imgUrl}
      alt=""
    />
  </div>
  <div class="col-4 text-start">
    <h4>${items[i].name}</h4>
    <p>¥${items[i].price}</p>
  </div>
  <div class="col-4 text-end">
    <h4>${items[i].amount}</h4>
    <p class="text-success">¥${items[i].profit} / ${items[i].profitType}</p>
  </div>`;

    itemCon.addEventListener("click", function () {
      let itemDetail = showItem(userAccount, i);
      container.innerHTML = "";
      container.append(itemDetail);
    });
    container.append(itemCon);
  }

  return container;
}

function showItem(userAccount, itemNumber) {
  let item = userAccount.itemInfo[itemNumber];

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
      <form class="pt-1 px-2">
        <input type="number" id="quantity" placeholder="0" class="col-12 form-control" />
      </form>
      <p class="p-2 text-end text-white" id="total-price">total: ¥0</p>
    </div>`;

  container.querySelector("#quantity").addEventListener("change", function () {
    let quantity = container.querySelector("#quantity");
    let totalPrice = calcTotalPrice(item, parseInt(quantity.value));
    container.querySelector("#total-price").innerHTML = `total: ¥${totalPrice}`;
  });

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
    config.mainGamePage.innerHTML = "";
    config.mainGamePage.append(mainGamePage(userAccount));
  });

  let purchaseBtn = btnCon.querySelectorAll(".next-btn")[0];
  purchaseBtn.addEventListener("click", function () {
    let purchaseInput = parseInt(document.getElementById("quantity").value);
    purchaseItem(userAccount, itemNumber, purchaseInput);
    config.mainGamePage.innerHTML = "";
    config.mainGamePage.append(mainGamePage(userAccount));
  });

  return container;
}

function calcTotalPrice(item, quantity) {
  if (quantity <= 0) return 0;
  if (item.name === "ETF Stock") {
    let priceUpRate = item.purchaseIncreaseRate / 100;

    let total = 0;
    let culcPrice = 0;

    for (let i = 1; i <= quantity; i++) {
      culcPrice != 0
        ? (culcPrice = Math.floor(culcPrice * (1 + priceUpRate)))
        : (culcPrice = item.price);
      total = total + culcPrice;
    }

    return total;
  }
  return item.price * quantity;
}

function purchaseItem(userAccount, itemNumber, purchaseInput) {
  if (purchaseInput <= 0) return alert(`You may check count for buying`);

  let item = userAccount.itemInfo[itemNumber];

  if (purchaseInput > item.maxItemCount - item.amount)
    return alert(`You cannot purchase any more`);

  let totalPrice = calcTotalPrice(item, purchaseInput);
  if (userAccount.money < totalPrice)
    return alert(`Couldn't purchase it due to insufficient funds`);

  userAccount.makePayment(totalPrice);
  item.amount += purchaseInput;

  if (item.type === "investment") {
    let profitByPerSeconds = Math.floor((totalPrice * item.profitRate) / 100);
    userAccount.addAmountPerSecond(profitByPerSeconds);
    if (item.name === "ETF Stock") {
      item.price = Math.floor(item.price * 1.1);
    }
  }
  if (item.type === "ability") {
    userAccount.updateAmountPerClick(item.profit * purchaseInput);
  }
  if (item.type === "realEstate") {
    userAccount.addAmountPerSecond(item.profit * purchaseInput);
  }
  return alert(`Purchase of the ${item.name} was successful!.`);
}

function startCount(userGameAccount) {
  let timerId = setInterval(function () {
    let userDay = document.getElementById("user-days");
    userGameAccount.updatePerSeconds();
    userDay.innerHTML = `${userGameAccount.days}days`;

    let userYear = document.getElementById("user-year");

    userYear.innerHTML = `${userGameAccount.year}years old`;

    let userMoney = document.getElementById("user-money");
    userMoney.innerHTML = `¥${userGameAccount.money}`;
  }, 1000);

  return timerId;
}

function stopCount(timerId) {
  clearInterval(timerId);
}
