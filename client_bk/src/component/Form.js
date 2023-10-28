import React, { Component } from "react";
import BusinessName from "./BusinessName";
import StoreDetails from "./StoreDetails";
import PickColor from "./PickColor";
import PickLogo from "./PickLogo";
import SetupStore from "./SetupStore";
import StoreName from "./StoreName";
import AccessStore from "./AccessStore";
import SuccessForm from "./SuccessForm";
import PickTheme from "./PickTheme";

class Form extends Component {
  state = {
    step: 1,
    businessname: "",
    storename: "",
    businesslogo: "",
    email: "",
    theme_color: "",
    font_color: "",
    product_display: "",
    payment_method: "",
    access_token: "",
    isErrorBusinessName: true,
    isErrorBusinessLogo: true,
    errorMessageBusinessName: "",
    errorMessageBusinessLogo: "",
    posts: [],
    storeLogo: "",
    theme_id: "",
  };

  nextStep = (e) => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (e) => {
    // e.preventDefault();
    // alert(input);
    // alert(e.target.value);
    const productdisplay = e.target.getAttribute("data-productdisplay");
    const paymentmethod = e.target.getAttribute("data-paymentmethod");
    if (input === "product_display") {
      this.setState({
        [input]: productdisplay,
      });
    } else if (input === "payment_method") {
      this.setState({
        [input]: paymentmethod,
      });
    } else {
      this.setState({
        [input]: e.target.value,
      });
    }

    if (input === "businessname") {
      if (this.state.businessname.length >= 1) {
        this.setState({
          isErrorBusinessName: false,
        });
      }
    }
  };

  addColor = (e) => {
    const colorschema = e.target.value;
    this.setState({
      customcolor: colorschema,
    });
  };

  validateBusinessName = () => {
    if (this.state.businessname.length < 2) {
      this.setState({
        isErrorBusinessName: true,
        errorMessageBusinessName:
          "Type your Business name (at least 2 characters)",
      });
      return false;
    }
    return true;
  };

  onSelectImageHandler = (files) => {
    this.setState({
      file: files[0],
    });
  };

  onSelectThemeHandler = (files) => {
    this.setState({
      themeFile: files[0],
    });
  };

  handleChildData = (data) => {
    this.setState({
      theme_id: "",
    });

    this.setState({
      theme_id: data,
    });
  };

  handleData = (data) => {
    this.setState(data);
  };

  render() {
    const {
      step,
      businessname,
      storename,
      product_display,
      payment_method,
      theme_color,
      email,
      addColor,
      access_token,
      isErrorBusinessName,
      errorMessageBusinessName
    } = this.state;

    switch (step) {
      case 1:
        return (
          <BusinessName
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            businessname={businessname}
            email={email}
            validateBusinessName={this.validateBusinessName}
            isErrorBusinessName={isErrorBusinessName}
            errorMessageBusinessName={errorMessageBusinessName}
          />
        );
      case 2:
        return (
          <PickColor
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            addColor={addColor}
            handleData={this.handleData}
            storeData={this.state}
          />
        );
      case 3:
        return (
          <PickLogo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            onSelectImageHandler={this.onSelectImageHandler}
          />
        );
      case 4:
        return (
          <SetupStore
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
          />
        );
      case 5:
        return (
          <StoreName
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            storename={storename}
          />
        );
      case 6:
        return (
          <AccessStore
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            access_token={access_token}
            storename={storename}
          />
        );
      case 7:
        return (
          <PickTheme
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            onSelectThemeHandler={this.onSelectThemeHandler}
            storename={storename}
            storeData={this.state}
            handleChange={this.handleChange}
            sendDataToParent={this.handleChildData}
          />
        );
      case 8:
        return (
          <StoreDetails
            nextStep={this.nextStep}
            email={email}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            theme_color={theme_color}
            product_display={product_display}
            payment_method={payment_method}
            storeData={this.state}
            sendDataToParent={this.handleChildData}
          />
        );
      case 9:
        return <SuccessForm />;
      default:
        return null;
    }
  }
}

export default Form;
