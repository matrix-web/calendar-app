import { IUser } from "../../models/IUser";
import { ServiceBase } from "../core";

export interface IUsersResponse {
  users: IUser[];
}

export class UserService extends ServiceBase {
  public static async getUsers(): Promise<IUsersResponse> {
    const method = "GET";
    const url = `./users.json`;

    const users = await this.callApi({ method, url });

    return {
      users
    };
  }
}
