import React, { Component } from 'react';
import './App.css';

const formatter = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      totalBalance: 0,
      income: 0,
      expense: 0,
      itemName: [],
      itemValue: [],
      text: "",
      amount: 0,
      changeText: "",
      changeValue: 0
    }
  }

  itemBorderRight = (value) => { return value > 0 ? "green" : "red"; }
  prefix = (value) => { return value > 0 ? "+" : ""; }
  addIncome = (value) => { return value > 0 ? 
    this.setState( { income: [parseFloat(this.state.income) + parseFloat(value)] } ) : 
    0; 
  }
  subIncome = (value) => { return value < 0 ? 
    this.setState( { expense: [parseFloat(this.state.expense) + parseFloat(value)] } ) : 
    0; 
  }

  textChange = (event) => {
    this.setState({changeText: event.target.value})
  }

  valueChange = (event) => {
    this.setState({changeValue: event.target.value})
  }

  valueCheck = (value) => {
    return isNaN(value) ? {background: "red", color: "white"} : {};
  }

  onClick = (event) => {
    this.setState( { totalBalance: [parseFloat(this.state.totalBalance) + parseFloat(this.state.changeValue)] } );
    this.setState( { itemName: [...this.state.itemName, this.state.changeText] } );
    this.setState( { itemValue: [...this.state.itemValue, this.state.changeValue] } );
    this.addIncome(this.state.changeValue);
    this.subIncome(this.state.changeValue);
  }

  render () {

    const allItems = this.state.itemName.map((n, i) => {
        return (
          <div key={i} className={'item ' + this.itemBorderRight(this.state.itemValue[i])}>
            <p>{this.state.itemName[i]}</p>
            <p>{this.prefix(this.state.itemValue[i]) + this.state.itemValue[i]}</p>
          </div>
        )
      });

    return (
      <div className="App">
        <h1 className="cr cap title">expense tracker</h1>
        <div>
          <h2 className="upp balance-title">your balance</h2>
          <div className="balance">{formatter.format(this.state.totalBalance)}</div>
        </div>
        <div className="upp money-wrapper">
          <div className="cr income">
            <p>income</p>
            <p>{formatter.format(this.state.income)}</p>
          </div>
          <div className=" cr expense">
            <p>expense</p>
            <p>{formatter.format(this.state.expense)}</p>
          </div>
        </div>
        <h3 className="uline cap history">history</h3>
        {allItems}
        <h3 className="uline cap transaction">add new transaction</h3>
        <div className="cap text-input">
          <p>text</p>
          <input type="text" placeholder="Enter text..." onChange={this.textChange} />
          <p>amount (negative - expense, positive - income)</p>
          <input type="text" style={this.valueCheck(this.state.changeValue)} placeholder="Enter amount..." onChange={this.valueChange} />
        </div>
        <div className="cr button">
          <button className="cap" onClick={this.onClick}>add transaction</button>
        </div>
      </div>
    );
  }
}

export default App;
