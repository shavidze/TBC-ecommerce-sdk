import express from "express";
import bodyParser from "body-parser";
import { TbcEcommerseSDK } from "../src/TBC-Ecommerce-SDK"; // Update with the correct path

const app = express();
const port = 3000; // Update with your desired port

// Replace these with your actual values from TBC Bank
const API_KEY = "your-api-key";
const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";

// Middleware to parse JSON data
app.use(bodyParser.json());

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  const { PaymentId } = req.body;

  if (PaymentId) {
    const tbcSdk = new TbcEcommerseSDK(API_KEY, CLIENT_ID, CLIENT_SECRET);

    try {
      /**
       * TODO retrieve token from store
       */
      const paymentInfo = await tbcSdk.getCheckoutPaymentDetails(PaymentId, "");

      switch (paymentInfo.status) {
        case "Created":
        case "Succeeded":
        case "Failed":
        case "Returned":
        case "Expired":
          // Activate payment status in your system
          res.status(200).send("OK");
          return;

        default:
          // Handle other cases or log an error
          console.error("Unhandled payment status:", paymentInfo.status);
          break;
      }
    } catch (error: unknown) {
      // Handle SDK errors or log the error
      console.error("SDK error:", error);
    }
  }

  // PaymentId is missing or unrecognized status
  res.status(404).send("Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook server is listening at http://localhost:${port}`);
});
