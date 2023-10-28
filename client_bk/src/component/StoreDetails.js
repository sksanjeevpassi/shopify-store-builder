import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";
import axios from "axios";
import paypal_img from "../images/paypal.png";
import card_img from "../images/atm-card.png";

class StoreDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.storeData);
    this.state = {
      submitError: "",
    };
  }

  continue = (e) => {
    e.preventDefault();
    // this.props.nextStep();
  };

  dataSubmit = (e) => {
    e.preventDefault();

    // console.log(this.props);
    // return;

    try {
      const formData = new FormData();
      formData.append("access_token", this.props.storeData.access_token);
      formData.append("file", this.props.storeData.file);
      formData.append("businessname", this.props.storeData.businessname);
      formData.append("storename", this.props.storeData.storename);
      formData.append("email", this.props.storeData.email);
      formData.append("theme_color", this.props.storeData.theme_color);
      formData.append("product_display", this.props.storeData.product_display);
      formData.append("payment_method", this.props.storeData.payment_method);
      formData.append("fontchoices", this.props.storeData.fontchoices);
      formData.append("font_color", this.props.storeData.font_color);
      // formData.append('themeFile', this.props.storeData.themeFile);
      formData.append("theme_id", this.props.storeData.theme_id);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_FRONTEND_URL}api/create/store`,
          formData,
          config
        )
        .then((response) => {
          // alert(response.data.message);
          if (response.data.status === "error") {
            this.setState({
              submitError: response.data.message,
            });
          } else {
            this.setState({
              submitError: "",
            });
            this.props.nextStep();
          }
        });
    } catch (error) {
      console.log(error);
    }

    // this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { product_display, payment_method, email, handleChange } = this.props;

    return (
      <div className="form">
        <form>
          <StepperCompo count={7} />

          <div className="container_card Store_Details">
            <div className="">
              <p className="error">{this.state.submitError}</p>

              <div className="div_business">
                <label className="form-group__label">Email</label>
                <input
                  type="text"
                  value={email}
                  name="email"
                  onChange={handleChange("email")}
                  className="form-group__input"
                />
              </div>

              <div className="div_business Product_Display">
                <label className="form-group__label">Product Display In:</label>

                <div className="">
                  <input
                    type="radio"
                    data-productdisplay="list"
                    value={product_display}
                    name="product_display"
                    onChange={handleChange("product_display")}
                  />{" "}
                  List View <br></br>
                  <input
                    type="radio"
                    data-productdisplay="grid"
                    value={product_display}
                    name="product_display"
                    onChange={handleChange("product_display")}
                  />{" "}
                  Grid View
                </div>
              </div>

              <div className="div_business ">
                <label className="form-group__label">Payment Method</label>

                <div className="Payment_Method">
                  <div className="payment_input_div">
                    <img src={card_img} alt="enter credit card"/>
                   <div>
                   <input
                      type="radio"
                      data-paymentmethod="creditCard"
                      value={payment_method}
                      onChange={handleChange("payment_method")}
                      name="payment_method"
                    />{" "}
                    <label className="form-group__label">Credit Card</label>
                   </div>

                  </div>

                  <div className="payment_input_div">
                    <img src={paypal_img} alt="enter credit card"/>
                   <div>
                   <input
                      type="radio"
                      data-paymentmethod="paypal"
                      value={payment_method}
                      onChange={handleChange("payment_method")}
                      name="payment_method"
                    />{" "}
                    <label className="form-group__label">Paypal</label>

                   </div>

                  </div>
                </div>
              </div>

              <div className="div_business">
                <label className="form-group__label">Shipping Options</label>
                <input
                  type="text"
                  value={" Standard Shipping (7-9 business days) "}
                  name="shipping"
                  className="form-group__input border_none"
                  disabled
                />
              </div>
            </div>  
          </div>
          <div className="buttons footer_btn">
            <button
              className="buttons__button buttons__button--back"
              onClick={this.back}
            >
              Back
            </button>
            <button
              className="buttons__button buttons__button--next"
              onClick={this.dataSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default StoreDetails;
