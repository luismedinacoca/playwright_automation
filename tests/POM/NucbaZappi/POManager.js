import RegisterPage from "./pages/RegisterPage.js";
import HomePage from "./pages/HomePage.js";

class POManager {
  constructor(page) {
    this.page = page;
    this.registerPage = new RegisterPage(page);
    this.homePage = new HomePage(page);
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getHomePage() {
    return this.homePage;
  }
}

export default POManager;
