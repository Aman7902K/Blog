import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwritePid);

        this.account = new Account(this.client);
    }
    
    async createAccount({ email, password, name }) {
        try {
            const userAcc = await this.account.create(ID.unique(), email, password, name);

            if (userAcc) {
                return this.login({ email, password });
            } else {
                return null;
            }
        } catch (error) {   
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getUserAcc() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.log("Error encountered:", error);
        }
    }
}

const authService = new AuthService();

export default authService;
