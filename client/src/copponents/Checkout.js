import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Checkout.css";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useEffect } from "react";
// import { addOrder } from "../Actions/orderAction";
// import { useDispatch, useSelector } from "react-redux";

function Checkout() {
  const [onlinePay, setOnlinePay] = useState(false);
  const handleOnlinePay = () => setOnlinePay(true);
  const handleCashPay = () => setOnlinePay(false);
//   const dispatch = useDispatch();
const [input, setInput] = useState({
    shippingAdress: "",
    phoneNumber: "",
    paymentMethode: "",
  });
  const [cartItems, setCartItems] = useState(
    [
    {
        id: "1",
    productName: "product1",
    quantity: "5",
    price: "50",
  },
  {
    id: "2",
    productName: "product2",
    quantity: "5",
    price: "50",
  },
  {
    id: "3",
    productName: "product3",
    quantity: "5",
    price: "50",
  }
]
  );
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

//   const handleOrder = () => {
//     dispatch(addOrder(input));
//   };

  return (
    <Form className="fourma">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <div className="order resume">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-items-list">
              <div className="cart-items-name">{item.productName}</div>
              <div className="cart-items-quantity">
                {item.quantity} * {item.price} $
              </div>
            </div>
          ))}
          <div className="cart-items-total-price-name">
            Total Price
            <div className="cart-items-total-price"> 150 $</div>
          </div>
        </div>
        <Form.Label column sm={2} className="label">
          Shipping adress
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="shipping-adress"
            placeholder="Shipping Adress"
            name="shippingAdress"
            className="input"
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label className="label" column sm={2}>
          Phone Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="phone-number"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            className="input"
          />
        </Col>
      </Form.Group>


        <Form.Group as={Row} className="mb-3" >
          <Form.Label as="legend" className="label" column sm={2}>
            Payment
          </Form.Label>
          <Col sm={10} name="paymentMethode" className="payment" onChange={handleChange}>
            <Form.Check
              type="radio"
              label="Cash On Delivery"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              onChange={handleCashPay}
            />
            <Form.Check
              type="radio"
              label="Pay Online"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              onChange={handleOnlinePay}
            />
          </Col>
        </Form.Group>
    
      {onlinePay ? (
        <PayPalScriptProvider options={{ "client-id": "test" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "555",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
              });
            }}
          />
        </PayPalScriptProvider>
      ) : (
        <></>
      )}
      {/* <button className="confirm-order-button" onClick={handleOrder}>
        Comfirm
      </button> */}
    </Form>
  );
}

export default Checkout;