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

export interface CancelPaymentData {
  preAuth: boolean;
  recId: string;
  merchantPaymentId: string;
  extra?: string;
  money: Money;
}

export interface AmountObject {
  currency: string; // 3 digit ISO code
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

export interface InstallmentProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface CreatePaymentData {
  amount: AmountObject;
  returnurl: string;
  extra: string;
  expirationMinutes: number;
  methods: number[];
  installmentProducts?: InstallmentProduct[];
  callbackUrl: string;
  preAuth: boolean;
  language: string;
  merchantPaymentId: string;
  skipInfoMessage: boolean;
  saveCard: boolean;
  saveCardToDate?: string;
}
