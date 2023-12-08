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

export interface Money {
  amount: number;
  currency: "GEL" | "USD" | "EUR"; // Update the currency types based on the allowed values
}

export interface ExecuteReccuringPaymentData {
  preAuth: boolean;
  recId: string;
  merchantPaymentId: string;
  extra?: string;
  money: Money;
}
