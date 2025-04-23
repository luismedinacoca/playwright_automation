class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInBtn = page.getByRole("button", { name: "login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async navigate() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
    console.log("(1) navigate");
  }

  async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInBtn.click();
    console.log("(2) login");
    // await this.page.waitForLoadState("networkidle");
    // console.log("(3) waiting for Dashboard page");
  }
}

export default LoginPage;

/*
const userName = page.getByPlaceholder("email@example.com");
const password = page.getByPlaceholder("enter your passsword");
const loginBtn = page.getByRole("button", { name: "login" });
*/
