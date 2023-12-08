import { Money } from ".";

// Interface for the request body of cancelPayment
interface CancelPaymentData {
  preAuth: boolean;
  recId: string;
  merchantPaymentId: string;
  extra?: string;
  money: Money;
}
