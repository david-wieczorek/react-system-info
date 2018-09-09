import React, { Component } from 'react';
import './App.css';

import * as mettricsFile from './data/mettrics';

class App extends Component {

  constructor(){
    super();
    this.handleParamsChange = this.handleParamsChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      displayDateSelect: false,
      paramValue: '',
      dateValue: '',
      result: ''
    };
    this.mettrics = mettricsFile[0];
  }

  renderParamsOptions(){
    var paramsOptionsArr = [<option key="none" value="none">Choose...</option>];
    var paramOptions = Object.keys(this.mettrics[0]);
    paramOptions.forEach((option, index) => {
      if (option !== 'time') {
        paramsOptionsArr.push(<option key={index} value={option}>{option}</option>);
      }
    })
    return paramsOptionsArr;
  }

  renderDateOptions(){
    var dateOptionsArr = [<option key="none" value="none">Choose...</option>];
    this.mettrics.forEach((mettric, index) => {
      dateOptionsArr.push(<option key={index} value={mettric.time}>{mettric.time}</option>);
    })
    return dateOptionsArr;
  }

  handleParamsChange(e) {
    if (e.target.value !== 'none') {
      if (this.state.dateValue !== ''){
        this.setState({paramValue: e.target.value}, () => {
          this.renderResults();
        });
      } else {
        this.setState({
          displayDateSelect: true,
          paramValue: e.target.value
        });
      }
    } else {
      this.setState({
        displayDateSelect: false,
        paramValue: '',
        dateValue: '',
        result: ''
      });
    }
  }

  handleDateChange(e) {
    if (e.target.value !== 'none'){
      this.setState({dateValue: e.target.value}, () => {
        this.renderResults();
      });
    } else {
      this.setState({
        dateValue: '',
        result: ''
      });
    }
  }

  renderResults(){
    const result = this.mettrics.filter(mettric => mettric.time === this.state.dateValue);
    this.setState({result: result[0][this.state.paramValue]});
  }

  render() {
    var mettrics = mettricsFile[0];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">System Information</h1>
        </header>
        <div className="container">
          <div className="selectors">
            <div>
              <label>Select a parameter</label>
              <select onChange={ this.handleParamsChange }>
                { this.renderParamsOptions() }
              </select>
            </div>
            <div className={ `${this.state.displayDateSelect ? 'visible' : 'hidden'}` }>
              <label>Select a date</label>
              <select onChange={ this.handleDateChange }>
                { this.renderDateOptions(mettrics) }
              </select>
            </div>
          </div>
          <div className={ `info ${this.state.result !== '' ? 'visible' : 'hidden'}` }>
            <p>Information about <span className="bold">{ this.state.paramValue }</span> at <span className="bold">{ this.state.dateValue }:</span></p>
            <p>{ this.state.result }</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
