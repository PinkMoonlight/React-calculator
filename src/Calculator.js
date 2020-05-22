import React from 'react';

let Calculator = (props) => {

    let topDisplayUI = [...props.topDisplay];


    return (
          <div className="calc-container">
            <div id="top-display" className="display"></div>
            <div id="display" value={props.currentInput} className="display">0</div>
            <button id="clear" className="button" onClick={props.clearInput}>AC</button>
            <button id="divide" value="/" className="button" onClick={props.handleOperator}>/</button>
            <button id="multiply" value="x" className="button" onClick={props.handleOperator}>x</button>
            <button id="subtract" value="-" className="button" onClick={props.handleOperator}>-</button>
            <button id="add" value="+" className="button" onClick={props.handleOperator}>+</button>
            <button id="nine" value="9" className="button" onClick={props.handleNumbers}>9</button>
            <button id="eight" value="8" className="button" onClick={props.handleNumbers}>8</button>
            <button id="seven" value="7" className="button" onClick={props.handleNumbers}>7</button>
            <button id="six" value="6" className="button" onClick={props.handleNumbers}>6</button>
            <button id="five" value="5" className="button" onClick={props.handleNumbers}>5</button>
            <button id="four" value="4" className="button" onClick={props.handleNumbers}>4</button>
            <button id="three" value="3" className="button" onClick={props.handleNumbers}>3</button>
            <button id="two" value="2" className="button" onClick={props.handleNumbers}>2</button>
            <button id="one" value="1" className="button" onClick={props.handleNumbers}>1</button>
            <button id="zero" value="0" className="button" onClick={props.handleZeros}>0</button>
            <button id="decimal" value="." className="button" onClick={props.handleNumbers}>.</button>
            <button id="equals" value={props.answer} className="button" onClick={props.handleEquals}>=</button>
          </div>
        );  
};

export default Calculator;