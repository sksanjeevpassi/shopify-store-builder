import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class GuidLinePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
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
    
      render() {
        return (
          <div>
            <span className="guidline" onClick={(e) => this.openModal(e)}>How to get access token ?</span>
            <Popup
              open={this.state.open}
              onClose={this.closeModal}
              modal
              closeOnDocumentClick
              className="guidline-popup"
            >
              <div>
              <h4>After create a store following steps are folow for generate a access toke</h4>
              <ul>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Go to setting that display on bottom left corner.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Go to click on app and sales channels tab.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Then click on "develop apps" button on top appear.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Click on allow to "custom app development".
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Click on "create an app" button.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Then showing popup and here we need to enter "App name" then "create app" button.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Then there showing four tabs "Overview", "Configuration", "API credentials", and "App Settings".
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Click on "Config Admin Api scopes" button.
                </li>
                <li className="allow_li">
                 <div>
                 <span className="material-symbols-outlined">   
                    double_arrow
                  </span>
                  Then allow to add following scope:-
                 </div>

                        <ul className="Scope_ul">
                  <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  write_theme, read_theme
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  write_products, read_products
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  write_product_listing, read_product_listing
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  write_content, read_content
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  write_online_store_pages, read_online_store_pages
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  write_product_listing, read_product_listing
                </li>
                        </ul>
                </li>
               
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  click on "save" button with these scope.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Go to "Api credentials" to "install app"
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Click on "Install app" button
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  After install app there are showing "Admin api access token" with "****" format.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  click on "Reveal token once" to appear access token, copy and save your Admin api access token.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Go to our site and fill Admin api access token in access token input
                </li>
                </ul>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                </div>
            </Popup>
          </div>
        );
      }
    }

export default GuidLinePopup;
