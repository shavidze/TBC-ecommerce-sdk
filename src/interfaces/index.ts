import { AxiosResponse } from "axios";

// Interface for the TbcEcommerseSDK class
export interface TbcEcommerseSDKInterface {
  getAccessToken(): Promise<string>;
}

// Interface for the expected response body
export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}
