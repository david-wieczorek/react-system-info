import React, { Component } from 'react';
import './styles/App.css';
import Chart from './components/Chart';
import PlainInfo from './components/PlainInfo';

import * as mettricsFile from './data/mettrics';

class App extends Component {

  constructor(){
    super();
    this.handleParamsChange = this.handleParamsChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.state = {
      displayDateSelect: false,
      paramValue: '',
      startDateValue: '',
      endDateValue: '',
      results: [],
      average: 0
    };
    this.mettrics = mettricsFile[0];
  }

  renderParamsOptions(){
    var paramsOptionsArr = [<option key='none' value='none'>Choose...</option>];
    var paramOptions = Object.keys(this.mettrics[0]);
    paramOptions.forEach((option, index) => {
      if (option !== 'time') {
        paramsOptionsArr.push(<option key={index} value={option}>{option}</option>);
      }
    })
    return paramsOptionsArr;
  }

  renderDateOptions(){
    var dateOptionsArr = [<option key='none' value='none'>Choose...</option>];
    this.mettrics.forEach((mettric, index) => {
      dateOptionsArr.push(<option key={index} value={mettric.time}>{mettric.time}</option>);
    })
    return dateOptionsArr;
  }

  handleParamsChange(e) {
    if (e.target.value !== 'none') {
      if (this.state.startDateValue !== ''){
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

  handleStartDateChange(e) {
    if (e.target.value !== 'none'){
      this.setState({startDateValue: e.target.value});
    } else {
      this.setState({
        startDateValue: '',
        endDateValue: '',
        result: ''
      });
    }
  }

  handleEndDateChange(e) {
    if (e.target.value !== 'none'){
      this.setState({endDateValue: e.target.value}, () => {
        this.renderResults();
      });
    } else {
      this.setState({
        endDateValue: '',
        result: ''
      });
    }
  }

  setUnit(param){
    if (['files', 'inodes'].includes(param)){
      return 'number';
    } else if (['recv', 'send', 'used', 'buff', 'cach', 'free', 'read', 'write'].includes(param)){
      return 'bytes';
    } else if (['usr', 'sys', 'idl', 'wai', 'hiq', 'siq', '1m', '5m', '15m'].includes(param)) {
      return '%';
    }
  }

  renderResults(){
    const results = this.mettrics.filter(mettric => mettric.time >= this.state.startDateValue && mettric.time <= this.state.endDateValue)
    .map(result=>({'date': result.time, 'value': result[this.state.paramValue], 'unit': this.setUnit(this.state.paramValue)}));
    const values = this.mettrics.filter(mettric => mettric.time >= this.state.startDateValue && mettric.time <= this.state.endDateValue)
    .map(result=>result[this.state.paramValue]);
    const average = values.reduce(function(p,c,i,a){return p + (c/a.length)},0);
    this.setState({
      results,
      average
    });
  }

  renderPlainInfoComponent(){
    if (this.state.results.length > 0){
      return <PlainInfo values={ this.state.results } param={ this.state.paramValue } average={ this.state.average }></PlainInfo>
    } else {
      return null;
    }
  }

  renderChartComponent(){
    if (this.state.results.length > 0){
      return <Chart data={ this.state.results } param={ this.state.paramValue } average={ this.state.average }></Chart>
    } else {
      return null;
    }
  }

  render() {
    var mettrics = mettricsFile[0];
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>System Information</h1>
        </header>
        <div className='container'>
          <div className='selectors'>
            <div>
              <label>Select a parameter</label>
              <select onChange={ this.handleParamsChange }>
                { this.renderParamsOptions() }
              </select>
            </div>
            <div className={ `${this.state.displayDateSelect ? 'visible' : 'hidden'}` }>
              <label>Select a start date</label>
              <select onChange={ this.handleStartDateChange }>
                { this.renderDateOptions(mettrics) }
              </select>
              <label>Select an end date</label>
              <select onChange={ this.handleEndDateChange }>
                { this.renderDateOptions(mettrics) }
              </select>
            </div>
          </div>
          <div className='info'>
          { /**this.renderPlainInfoComponent()**/ }
          { this.renderChartComponent() }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
