import React, {Component} from 'react';
import Calculator from './Calculator.js';
import './App.css';

class App extends Component {
  state = {
    currentInput: '0',
    topDisplay: [],
    previousKey: null,
    answer: null, 
    decimal: false
  }

  componentDidUpdate() {
    document.getElementById('display').innerText = this.state.currentInput;
    document.getElementById('top-display').innerText = this.state.topDisplay.toString().split(',').join(''); 
  };

  handleNumbers = (e) => {
    console.log(e);
    let key = e.target.value;
    let display = this.state.currentInput !== '0' ? this.state.currentInput  : key === '.' && this.state.currentInput === '0' ?  this.state.currentInput : '';
    let previousKey = this.state.previousKey;
    let topDisplay = this.state.topDisplay === [] && key === '.' ? [0] : [...this.state.topDisplay];

    if (key === '.' && !e.target.disabled) {
      document.getElementById('decimal').setAttribute('disabled', 'disabled');
      document.getElementById('zero').removeAttribute('disabled', 'disabled'); 
        if (this.state.topDisplay.length < 1) {
          topDisplay.unshift('0');
        }
      this.setState( {
        currentInput: display + key,
        decimal: true
        }); 
    } else if (previousKey === '-' || previousKey === '+' || previousKey === '/'|| previousKey === 'x') {
      this.setState( {
        currentInput: key,
      });
    } else {
      display += key;
      this.setState( {
        currentInput: display,
      }); 
    }
    this.setState( {
      previousKey: key,
      topDisplay: [...topDisplay, key]
    } );

  };

  handleZeros = (e) => {
    let key = e.target.value || e.target.key;
    let previousKey = this.state.previousKey;
    let display = this.state.decimal === true ? this.state.currentInput : this.state.currentInput[0] !== '0' ? this.state.currentInput : '';
    let topDisplay = [...this.state.topDisplay];


    if (this.state.currentInput[0] === '0'  && this.state.decimal === false) {
      document.getElementById('zero').setAttribute('disabled', 'disabled');
      this.setState( {currentInput: display + key }) 
    } else if (previousKey === '-' || previousKey === '+' || previousKey === '/'|| previousKey === 'x') {
        this.setState( {
          currentInput: key
        });
    }  else {
      display += key;
      this.setState( {currentInput: display}); 
    }
    this.setState({ 
      previousKey: e.target.value,
      topDisplay: [...topDisplay, key]
    });
  };

  handleOperators = (e) => {
    let key = e.target.value;
    let answer = this.state.answer;
    let topDisplay;
    let multipleIndex = key !== "-" &&
          this.state.previousKey === "x" || 
          this.state.previousKey === "/" || 
          this.state.previousKey === "+" || 
          this.state.previousKey === "-" ? 
          this.state.topDisplay.indexOf(this.state.previousKey) : -1;

    if (multipleIndex >= 0)  {
      if (this.state.topDisplay[multipleIndex -1] === "x" ||
          this.state.topDisplay[multipleIndex -1] === "/" ||
          this.state.topDisplay[multipleIndex -1] === "+" ||
          this.state.topDisplay[multipleIndex -1] === "-"
          ) {
          let start = this.state.topDisplay.slice(0, multipleIndex -1);
          let end = this.state.topDisplay.slice(multipleIndex + 1, this.state.topDisplay.length);
          topDisplay = [...start, ...end, key];
      } else {
        let start = this.state.topDisplay.slice(0, multipleIndex);
        let end = this.state.topDisplay.slice(multipleIndex + 1, this.state.topDisplay.length);
        topDisplay = [...start, ...end, key];
      }
    } else {
      topDisplay = this.state.previousKey === '=' ? [answer.toString(), key] : [...this.state.topDisplay, key];
    }
    
      this.setState( {
        currentInput: key,
        topDisplay: topDisplay, 
        previousKey: e.target.value,
        decimal: false,
        answer: null
      });
      document.getElementById('decimal').removeAttribute('disabled', 'disabled');
  };

  handleEquals = (e) => {
    let result = this.state.topDisplay.toString().replace('x', '*').split(',').join('');
    let answer = eval(result);
    answer = answer.toString();
    this.setState({ 
      previousKey: e.target.value,
      answer: answer,
      currentInput: answer,
      topDisplay: [answer]  
    });
  };

  handleClearInput = () => {
    console.log("clearing state");
    document.getElementById('decimal').removeAttribute('disabled', 'disabled'); 
    document.getElementById('zero').removeAttribute('disabled', 'disabled'); 
    this.setState( {
      currentInput: '0',
      topDisplay: [],
      previousKey: null,
      answer: 0,
      decimal: false
    });
  };

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <Calculator 
          clearInput={this.handleClearInput}
          currentInput={this.state.currentInput}
          topDisplay={this.state.topDisplay}
          handleNumbers={this.handleNumbers}
          handleZeros={this.handleZeros}
          handleEquals={this.handleEquals}
          handleOperator={this.handleOperators}
        />
      </header>
      <footer>
        <p>Designed and coded by <a className="footer__name-link" href="http://www.katecherie.com">Kate Fisher</a></p>
      </footer>
    </div>
  );
}
}
export default App;
