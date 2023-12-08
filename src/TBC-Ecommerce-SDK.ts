import axios, { AxiosResponse } from "axios";
import { AccessTokenResponse, TbcEcommerseSDKInterface } from "./interfaces";

class TbcEcommerseSDK implements TbcEcommerseSDKInterface {
  private baseURL: string;
  private apiKey: string;
  private clientId: string;
  private clientSecret: string;

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
    paymentData: PaymentData,
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
}