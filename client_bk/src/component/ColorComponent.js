import React, { Component } from "react";

class ColorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorStore: "",
    };
  }

  render() {
    const { colorFor, headingName,handleData,colorArray,defaultColor } = this.props;

    

    const handleColorChange = (e, color) => {
      e.preventDefault();
      console.log(this.props);
      if (e.target.getAttribute("data-customcolor") === "update") {
        this.setState({ colorStore: e.target.value });
        // this.setState({ theme_color: e.target.value });
        var newColor = e.target.value;
      } else {
        this.setState({ colorStore: color });
        // this.inputElement.click();
        // let  obj = {key: colorFor, color}
         newColor = color;
      }

      if(colorFor === "theme_color") {
          handleData({theme_color: newColor});
      }
      
      if(colorFor === "font_color") {
          handleData({font_color: newColor});
      }
    };

    var disabled=false;
    if(colorFor === "font_color") {
      disabled=true;
    }

    if(this.state.colorStore){
      // alert(this.state.colorStore)
    }else{
     
      
      if(colorFor === "theme_color") {
        this.setState({ colorStore: defaultColor[1] });
      }

      if(colorFor === "font_color") {
        this.setState({ colorStore: defaultColor[0] });
      }
    }


    return (
      <div className="form-group__element">
        <h4>{headingName}</h4>
        <div className="custome_color_picker">
          <input
            type="color"
            disabled={disabled}
            data-customcolor="update"
            value={this.state.colorStore}
            onChange={(e) => handleColorChange(e, this.state.colorStore)}
          />
        </div>

        <div className="Main">
        {colorArray.map(colorCode => (  
          <button
            onClick={(e) => {
              handleColorChange(e, colorCode);
            }}
          >
            <div className="color-box" style={{"backgroundColor": colorCode}}> </div>
          </button>
        ))}
          
          {/* <button
            onClick={(e) => {
              handleColorChange(e, "#31d2ff");
            }}
          >
            <div className="red blue"></div>
          </button>
          <button
            onClick={(e) => {
              handleColorChange(e, "#8cff6f");
            }}
          >
            <div className="red green"></div>
          </button>
          <button
            onClick={(e) => {
              handleColorChange(e, "#fda437");
            }}
          >
            <div className="red orange"></div>
          </button> */}
        </div>
      </div>
    );
  }
}

export default ColorComponent;
