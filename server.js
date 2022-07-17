// const express = require("express");

// const app = express();

const jsonServer = require("json-server");

const app = jsonServer.create()

const router =  jsonServer.router('db.json');

const middlewares = jsonServer.defaults();

const port = process.env.PORT || 5000; 

const path = require("path");

const cors = require("cors");

const shortid = require("shortid");

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_b7gpoyjWVrzTz1", //"RAZORPAY KEY"
  key_secret: "qcak2DATfn5ZHl94oMWhmWCY", //"RAZORPAY SECRET"
});

app.use(cors()); // To avoid CORS errors





app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

// ---------------

app.post("/razorpay", async (req, res) => {



  const payment_capture = 1;
  const amount =1000;
  const currency = "INR";

  const options = {

    amount: amount * 100,

    currency,

    receipt: shortid.generate(),

    payment_capture,

  };

  try {
  
    const response = await razorpay.orders.create(options);

    console.log(response);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(middlewares);
app.use(router);

app.listen(port, () => {
  console.log(`Backend running at ${port} , Db is connected`);
});
