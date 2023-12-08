interface AmountObject {
  currency: string; // 3 digit ISO code
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

interface InstallmentProduct {
  name: string;
  price: number;
  quantity: number;
}

interface CreatePaymentData {
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
