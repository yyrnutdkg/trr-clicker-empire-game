config = {
  signupLoginPage: document.getElementById("signupLoginPage"),
};

class GameAccount {
  constructor(userName) {
    this.userName = userName;
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
