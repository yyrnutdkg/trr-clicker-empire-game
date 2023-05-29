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

function initializeUserAccount() {
  const initialForm = document.getElementById("userForm");
  console.log(initialForm);

  let userAccount = new GameAccount(
    initialForm.querySelectorAll(`input[name="userName"]`).item(0).value
  );

  console.log(userAccount);

  signupLoginPage.classList.add("d-none");
}

function gamePlaySave(userAcount) {
  let accountEncoded = JSON.stringify(userAcount);
  localStorage.setItem(userAcount.userName, accountEncoded);
}

let testAcount = new GameAccount("test", "24", "1580", "10000");
gamePlaySave(testAcount);

function gamePlayLoad(userName) {
  let accountData = localStorage.getItem(userName);
  console.log(accountData);
  let accountDataDecode = JSON.parse(accountData);
  console.log(typeof accountDataDecode);
  console.log(accountDataDecode);
}
