import { Client, Account } from "appwrite";

class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
  }

  async login({ email, password }) {
   return await this.account.createEmailPasswordSession(email, password);
  }

  async createAccount({ email, password, name }) {
    // Create new user account
    const user = await this.account.create('unique()', email, password, name);
    // Optionally, auto-login after account creation
    await this.login({ email, password });
    return user;
  }

  async getCurrentUser() {
    // Returns user details if logged in, otherwise throws error
    try {
      return await this.account.get();
    } catch {
      return null; // Not logged in
    }
  }

  async logout() {
    // Delete current session (logout)
    return await this.account.deleteSession('current');
  }
}

const authService = new AuthService();
export default authService;
