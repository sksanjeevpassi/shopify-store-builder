import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import shopifyLogo from "../../images/shopify.png";
import SweetAlert2 from "react-sweetalert2";

class AccessStorePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      swal: {},
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  handleAccessToken = (e) => {
    e.preventDefault();
    this.setState({
      swal: {
        show: true,
        title: "Access token",
        text: "Do you want to continue with disktop ?",
        html: '<label className="form-group__label">Email</label>' +
        '<input type="text" value="" name="email" className="form-group__input" />',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      },
    });
  };

  render() {
    return (
      <div>
        {/* <a
          rel="noopener noreferrer"
          className="btn btn-general"
          href="https://shopify.pxf.io/c/3761361/1101159/13624"
          target="_blank"
          onClick={(e) => this.openModal(e)}
        >
          <img src={shopifyLogo} alt="shopify" /> Access Shopify
        </a> */}
        <a className="btn btn-general" onClick={(e) => this.openModal(e)}>
          <img src={shopifyLogo} alt="shopify" /> Access Shopify
        </a>
        <Popup
          open={this.state.open}
          onClose={this.closeModal}
          modal
          closeOnDocumentClick
        >
          <div className="show-box">
            <h4>Do you want to continue with disktop ?</h4>
            <a
              rel="noopener noreferrer"
              className="btn btn-general"
              href="https://shopify.pxf.io/c/3761361/1101159/13624"
              target="_blank"
            >
              Yes
            </a>
            <a className="btn btn-general" onClick={(e) => this.handleAccessToken(e)}>No</a>
            <SweetAlert2
              {...this.state.swal}
              didOpen={() => {
                // run when swal is opened...
              }}
              didClose={() => {
                // run when swal is closed...
                this.setState({
                  swal: {
                    show: false,
                  },
                });
              }}
              onConfirm={ async (result) => {
                // run when clieked in confirm and promise is resolved...
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                  },
                };

                const response = await axios.get(
                  `${process.env.REACT_APP_FRONTEND_URL}api/get/store?access_token_email=sanjeev@webgarh.co.in`,
                  config
                );

                if (response.data.status === "error") {
                } else {
                  // this.props.nextStep(); success
                  if (response.data.status === "success") {

                  }
                }
                
              }}
              onError={(error) => {
                // run when promise rejected...
              }}
              onResolve={(result) => {
                // run when promise is resolved...
              }}
            />
          </div>
        </Popup>
      </div>
    );
  }
}

export default AccessStorePopup;
