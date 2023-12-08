// Interface for the request body of cancelPayment
interface CancelPaymentData {
  preAuth: boolean;
  recId: string;
  merchantPaymentId: string;
  extra?: string;
  money: {
    amount: number;
    currency: "GEL" | "USD" | "EUR"; // Update the currency types based on the allowed values
  };
}
