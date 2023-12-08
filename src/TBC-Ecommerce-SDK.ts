import axios, { AxiosResponse } from "axios";
import {
  AccessTokenResponse,
  CreatePaymentData,
  ExecuteReccuringPaymentData,
  TbcEcommerseSDKInterface,
} from "./interfaces";

export class TbcEcommerseSDK implements TbcEcommerseSDKInterface {
  private baseURL: string;
  private apiKey: string;
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;

  constructor(apiKey: string, clientId: string, clientSecret: string) {
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseURL = "https://api.tbcbank.ge/v1/tpay";
  }

  /**
   * Function to get an access token from the TBC Bank API.
   * @returns A promise that resolves with the access token or rejects with an error.
   */
  async getAccessToken(): Promise<string> {
    const url = `${this.baseURL}/access-token`;
    const headers = {
      Accept: "application/json",
      apikey: this.apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const data = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    try {
      const response: AxiosResponse<AccessTokenResponse> = await axios.post(
        url,
        data,
        { headers }
      );

      // Extract and return the access token from the response
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error: unknown) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error("Failed to get access token:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to get access token");
    }
  }

  /**
   * Function to create a payment using the TBC Bank API.
   * @param paymentData - The payment data.
   * @param accessToken - The access token.
   * @returns A promise that resolves with the payment details or rejects with an error.
   */
  async createPayment(
    paymentData: CreatePaymentData,
    accessToken: string
  ): Promise<any> {
    const url = `${this.baseURL}/payments`;
    const headers = {
      Accept: "application/json",
      apikey: this.apiKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify(paymentData);

    try {
      const response: AxiosResponse<any> = await axios.post(url, body, {
        headers,
      });
      return response.data;
    } catch (error: unknown) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error("Failed to create payment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to create payment");
    }
  }

  /**
   * Function to get checkout payment details from the TBC Bank API.
   * @param payId - The payment ID.
   * @param accessToken - The access token.
   * @returns A promise that resolves with the payment details or rejects with an error.
   */
  async getCheckoutPaymentDetails(payId: string, accessToken: string) {
    const url = `${this.baseURL}/payments/${payId}`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      apikey: this.apiKey,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error("Failed to get checkout payment details:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to get checkout payment details");
    }
  }

  /**
   * Function to cancel a checkout payment using the TBC Bank API.
   * @param payId - The payment ID (path parameter).
   * @param amount - The amount to cancel (body parameter).
   * @param accessToken - The access token (header).
   * @returns A promise that resolves with the cancellation details or rejects with an error.
   */
  async cancelCheckoutPayment(
    payId: string,
    amount: number,
    accessToken: string
  ): Promise<any> {
    const url = `${this.baseURL}/payments/${payId}/cancel`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      apikey: this.apiKey,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ amount });

    try {
      const response: AxiosResponse<any> = await axios.post(url, body, {
        headers,
      });
      return response.data;
    } catch (error: unknown) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error("Failed to cancel checkout payment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to cancel checkout payment");
    }
  }

  /**
   * Function to complete a pre-authorized payment using the TBC Bank API.
   * @param payId - The payment ID (path parameter).
   * @param amount - The amount to be confirmed (body parameter).
   * @param accessToken - The access token (header).
   * @returns A promise that resolves with the completion details or rejects with an error.
   */
  async completePreAuthorizedPayment(
    payId: string,
    amount: number,
    accessToken: string
  ): Promise<any> {
    const url = `${this.baseURL}/payments/${payId}/completion`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      apikey: this.apiKey,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ amount });

    try {
      const response: AxiosResponse<any> = await axios.post(url, body, {
        headers,
      });
      return response.data;
    } catch (error: unknown) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to complete pre-authorized payment:",
          error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to complete pre-authorized payment");
    }
  }

  /**
   * Function to initiate a recurring payment using the TBC Bank API.
   * @param executeRecurringPaymentData - The data for initiating the recurring payment (body parameter).
   * @param accessToken - The access token (header).
   * @returns A promise that resolves with the execution details or rejects with an error.
   */
  async executeRecurringPayment(
    executeRecurringPaymentData: ExecuteReccuringPaymentData,
    accessToken: string
  ): Promise<any> {
    const url = `${this.baseURL}/tpay/payments/execution`;
    const headers = {
      Accept: "application/json",
      apikey: this.apiKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.post(
        url,
        executeRecurringPaymentData,
        { headers }
      );
      return response.data;
    } catch (error: unknown) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error("Failed to execute recurring payment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to execute recurring payment");
    }
  }

  /**
   * Function to delete a recurring payment using the TBC Bank API.
   * @param recId - The recurring payment ID (path parameter).
   * @param accessToken - The access token (header).
   * @returns A promise that resolves with the deletion details or rejects with an error.
   */
  async deleteRecurringPayment(
    recId: string,
    accessToken: string
  ): Promise<any> {
    const url = `${this.baseURL}/tpay/payments/${recId}/delete`;
    const headers = {
      Accept: "application/json",
      apikey: this.apiKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response: AxiosResponse<any> = await axios.post(url, null, {
        headers,
      });
      return response.data;
    } catch (error: unknown) {
      // Explicitly cast 'error' to AxiosError to access detailed error information
      if (axios.isAxiosError(error)) {
        console.error("Failed to delete recurring payment:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw new Error("Failed to delete recurring payment");
    }
  }
}
