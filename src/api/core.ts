import axios, { AxiosRequestConfig } from "axios";
import { ApiParams } from "./types";
import { Handlers } from "../helpers/handlers";

const URL: string = process.env.REACT_APP_BASE_URL || "";

export class ServiceBase {
  protected static async callApi({
    data = null,
    method,
    url,
    baseURL,
    contentType,
    params
  }: ApiParams) {
    const config: AxiosRequestConfig = {
      baseURL,
      data,
      method,
      url,
      params,
      withCredentials: false
    }

    if (!config.baseURL) config.baseURL = baseURL || URL;

    if (contentType) {
      config.headers = {
        "content-type": contentType
      };
    }

    try {
      const response = await axios.request(config);

      return response.data;
    } catch (error: any) {
      if (Object.prototype.hasOwnProperty.call(error, "response")) {
        Handlers.defaultErrorAPIHandler(
          error.response.data.error !== null
            ? error.response.data.error
            : error.response.data,
          error.response.status
        )
        throw new Error(error.reponse.data.error);
      } else if (error.request) {
        Handlers.defaultErrorHandler("An error occurred when sending the request, or the server did not respond in time")
      }

      throw new Error(error)
    }
  }
}