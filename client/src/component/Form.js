import React, { Component } from "react";
import BusinessDetails from "./BusinessDetails";
import AccessStore from "./AccessStore";
import SuccessForm from "./SuccessForm";
import axios from "axios";

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
    pickThemeError: "",
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

  dataSubmit = async (e) => {
    e.preventDefault();

    try {
      // await this.themFileSubmit(e);
      // if (this.state.theme_id) {
      //   setTimeout(() => {
          this.submitStoreData(e);
        // }, 2000);
      // } else {
      //   console.log("theme id not found");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  themFileSubmit = (e) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("businessname", this.state.businessname);
      formData.append("storename", this.state.storename);
      formData.append("theme_color", this.state.theme_color);
      formData.append("access_token", this.state.access_token);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_FRONTEND_URL}api/upload/store/theme`,
          formData,
          config
        )
        .then((response) => {
          if (response.data.status === "error") {
            this.setState({
              pickThemeError: response.data.message,
            });
            reject(response.data.message); // Reject the promise if there's an error
          } else {
            this.setState({
              pickThemeError: "",
              theme_file_name: response.data.theme_name,
              theme_id: response.data.theme_id,
            });
            resolve(response.data.theme_id); // Resolve the promise with the theme_id
          }
        })
        .catch((error) => {
          reject(error); // Reject the promise on axios request error
        });
    });
  };

  submitStoreData = (e) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("access_token", this.state.access_token);
      formData.append("file", this.state.file);
      formData.append("businessname", this.state.businessname);
      formData.append("storename", this.state.storename);
      formData.append("email", this.state.email);
      formData.append("theme_color", this.state.theme_color);
      formData.append("product_display", this.state.product_display);
      formData.append("payment_method", "none");
      formData.append("fontchoices", this.state.fontchoices);
      formData.append("font_color", this.state.font_color);
      formData.append("theme_id", this.state.theme_id);

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
            reject("something wrong, please try again");
          } else {
            this.setState({
              submitError: "",
            });
            this.nextStep();
            resolve("store created"); 
          }
        })
        .catch((error) => {
          this.setState({
            submitError: error,
          });
          reject(error); // Reject the promise on axios request error
        });
    });
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
      errorMessageBusinessName,
      pickThemeError,
    } = this.state;

    switch (step) {
      case 1:
        return (
          <BusinessDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            businessname={businessname}
            email={email}
            validateBusinessName={this.validateBusinessName}
            isErrorBusinessName={isErrorBusinessName}
            errorMessageBusinessName={errorMessageBusinessName}
            handleData={this.handleData}
            storeData={this.state}
            addColor={addColor}
            onSelectImageHandler={this.onSelectImageHandler}
          />
        );
      // case 2:
      //   return (
      //     <PickColor
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       addColor={addColor}
      //       handleData={this.handleData}
      //       storeData={this.state}
      //     />
      //   );
      // case 3:
      //   return (
      //     <PickLogo
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       onSelectImageHandler={this.onSelectImageHandler}
      //     />
      //   );
      // case 4:
      //   return (
      //     <SetupStore
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //     />
      //   );
      // case 5:
      //   return (
      //     <StoreName
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       storename={storename}
      //     />
      //   );
      case 2:
        return (
          <AccessStore
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            access_token={access_token}
            storename={storename}
            dataSubmit={this.dataSubmit}
            onSelectThemeHandler={this.onSelectThemeHandler}
            storeData={this.state}
            sendDataToParent={this.handleChildData}
            handleData={this.handleData}
            pickThemeError={pickThemeError}
            themFileSubmit={this.themFileSubmit}
          />
        );
      // case 7:
      //   return (
      //     <PickTheme
      //       nextStep={this.nextStep}
      //       prevStep={this.prevStep}
      //       onSelectThemeHandler={this.onSelectThemeHandler}
      //       storename={storename}
      //       storeData={this.state}
      //       handleChange={this.handleChange}
      //       sendDataToParent={this.handleChildData}
      //     />
      //   );
      // case 8:
      //   return (
      //     <StoreDetails
      //       nextStep={this.nextStep}
      //       email={email}
      //       prevStep={this.prevStep}
      //       handleChange={this.handleChange}
      //       theme_color={theme_color}
      //       product_display={product_display}
      //       payment_method={payment_method}
      //       storeData={this.state}
      //       sendDataToParent={this.handleChildData}
      //     />
      //   );
      case 3:
        return <SuccessForm />;
      default:
        return null;
    }
  }
}

export default Form;
