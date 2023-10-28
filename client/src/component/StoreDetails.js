import React, { Component } from "react";
import list_img from "../images/list.png";
import grid_img from "../images/grid.png";

class StoreDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.storeData);
    this.state = {
      submitError: "",
      listProduct_display: "",
      gridProduct_display: "",
    };
  }

  continue = (e) => {
    e.preventDefault();
    // this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { product_display, handleChange, handleData } = this.props;

    const onProductDisplay = (e) => {
      if (e.target.value === "list") {
        this.setState({ listProduct_display: "pro_select" });
        this.setState({ gridProduct_display: "" });
      } else if (e.target.value === "grid") {
        this.setState({ gridProduct_display: "pro_select" });
        this.setState({ listProduct_display: "" });
      } else {
        this.setState({ listProduct_display: "" });
        this.setState({ gridProduct_display: "" });
      }
      handleData({ product_display: e.target.value });
    };

    return (
      <div>
        <p className="error">{this.state.submitError}</p>

        <div className="div_business Product_Display">
          {/* <label className="form-group__label">Product Display:</label> */}
          <h4>Product Display</h4>

          <div className="main_view_card_div">
            <div className={`View_div ${this.state.listProduct_display}`}>
              <img src={list_img} alt="enter credit card" />
              <input
                type="radio"
                data-productdisplay="list"
                value="list"
                name="product_display"
                onChange={(e) => onProductDisplay(e)}
              />
              <label>List View</label>
            </div>

            <div className={`View_div ${this.state.gridProduct_display}`}>
              <img src={grid_img} alt="enter credit card" />
              <input
                type="radio"
                data-productdisplay="grid"
                value="grid"
                name="product_display"
                onChange={(e) => onProductDisplay(e)}
              />
              <label> Grid View</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreDetails;
