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
    console.log(this.state);
  };

  handleNumbers = (e) => {
    let key = e.target.value;
    let display = this.state.currentInput[0] !== '0' ? this.state.currentInput  : key === '.' ? this.state.currentInput : '';
    let previousKey = this.state.previousKey;
    let topDisplay = key === '.' && this.state.topDisplay === [] ? ['0'] : [...this.state.topDisplay];

    if (!e.target.disabled && key === '.') {
      console.log("in decimal statement")
      document.getElementById('decimal').setAttribute('disabled', 'disabled');
      document.getElementById('zero').removeAttribute('disabled', 'disabled'); 

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
    console.log(key, this.state.decimal)

  };

  handleOperators = (e) => {
    let key = e.target.value;
    let topDisplay = [...this.state.topDisplay, key];

      this.setState( {
        currentInput: key,
        topDisplay: topDisplay, 
        previousKey: key,
        decimal: false
      });
      document.getElementById('decimal').removeAttribute('disabled', 'disabled');
  };
/* when i press a zero after a decimal apended to a zero */
  handleZeros = (e) => {
    let key = e.target.value;
    let previousKey = this.state.previousKey;
    let display = this.state.decimal === true ? this.state.currentInput : this.state.currentInput[0] !== '0' ? this.state.currentInput : '';
    let topDisplay = [...this.state.topDisplay];

    console.log(this.state.currentInput[0], this.state.decimal);


    if (this.state.currentInput[0] === '0'  && this.state.decimal === false) {
      document.getElementById('zero').setAttribute('disabled', 'disabled');
      this.setState( {currentInput: display + key }) 
    } else if (previousKey === '-' || previousKey === '+' || previousKey === '/'|| previousKey === 'x') {
        this.setState( {
          currentInput: key
        });
    }  else {
      display += e.target.value;
      this.setState( {currentInput: display}); 
    }
    this.setState({ 
      previousKey: e.target.value,
      topDisplay: [...topDisplay, key]
    });
  };

  handleEquals = (e) => {
    /* will need a loop, loop over the topDisplay Array */
    this.setState({ previousKey: e.target.value});
  };

  handleClearInput = () => {
    console.log("clearing state");
    document.getElementById('decimal').removeAttribute('disabled', 'disabled'); 
    document.getElementById('zero').removeAttribute('disabled', 'disabled'); 
    this.setState( {
      currentInput: '0',
      topDisplay: [],
      previousKey: null,
      answer: null,
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


/*
access DOM elements
add event listeners
write event handlers
update UI

*/