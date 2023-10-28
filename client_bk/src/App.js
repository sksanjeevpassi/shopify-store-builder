import React, { Component } from "react";
import Form from './component/Form';
import "./App.css";
import './component/Stepper/stepper.css'

class App extends Component {

  render() {

    return (
      <main className='main-container'>
       <div className="header_title_div">
       <h1 className='main-container__header'>
          Create a Store
        </h1>
        <p className='main-container__subheader'>Fill all details and read to access your store.</p>
       </div>
          <Form />
      </main>
    );
  }
}

export default App;