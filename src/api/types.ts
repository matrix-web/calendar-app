export type ResponseSuccessHandler = (data: any) => void;

export type ResponseErrorHandler = (message: string) => void;

export type Method = 
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK"

export type ApiParams = {
  method: Method;
  url: string;
  contentType?: string;
  baseURL?: string;
  params?: object;
  data?: any;
}