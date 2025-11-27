import React, { useState, useEffect, useRef } from 'react';
import { IconCalculator, IconHistory, IconClearAll, IconCopy } from '@tabler/icons-react';
import styles from './styles.module.css';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState('deg'); // 'deg' or 'rad'
  const [memory, setMemory] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === 'Enter' || e.key === '=') {
        performOperation();
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const opMap = { '+': '+', '-': '-', '*': '×', '/': '÷' };
        setOperation(opMap[e.key]);
        setWaitingForOperand(true);
      } else if (e.key.toLowerCase() === 'c') {
        clear();
      } else if (e.key.toLowerCase() === 'l') {
        clearAll();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);

      // Add to history
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case 'mod':
        return firstValue % secondValue;
      case 'y^x':
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const scientificFunction = (func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = Math.sin(angleMode === 'deg' ? value * Math.PI / 180 : value);
        break;
      case 'cos':
        result = Math.cos(angleMode === 'deg' ? value * Math.PI / 180 : value);
        break;
      case 'tan':
        result = Math.tan(angleMode === 'deg' ? value * Math.PI / 180 : value);
        break;
      case 'asin':
        result = Math.asin(value) * (angleMode === 'deg' ? 180 / Math.PI : 1);
        break;
      case 'acos':
        result = Math.acos(value) * (angleMode === 'deg' ? 180 / Math.PI : 1);
        break;
      case 'atan':
        result = Math.atan(value) * (angleMode === 'deg' ? 180 / Math.PI : 1);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'cbrt':
        result = Math.cbrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = value * value * value;
        break;
      case 'reciprocal':
        result = 1 / value;
        break;
      case 'factorial':
        result = factorial(Math.floor(value));
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case '10^x':
        result = Math.pow(10, value);
        break;
      case '2^x':
        result = Math.pow(2, value);
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const memoryOperation = (op) => {
    const value = parseFloat(display);
    switch (op) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + value);
        setWaitingForOperand(true);
        break;
      case 'M-':
        setMemory(memory - value);
        setWaitingForOperand(true);
        break;
      case 'MS':
        setMemory(value);
        setWaitingForOperand(true);
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const constants = {
    pi: Math.PI,
    e: Math.E
  };

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1>Scientific Calculator</h1>
          <p>Advanced calculator with scientific functions and history tracking</p>
        </div>

        <div className={styles.calculatorContainer}>
          <div className={styles.calculator}>
            <div className={styles.display}>
              <input
                ref={inputRef}
                type="text"
                value={display}
                readOnly
                className={styles.displayInput}
              />
              <div className={styles.displayInfo}>
                <span className={styles.memoryIndicator}>
                  {memory !== 0 && `M: ${memory}`}
                </span>
                <span className={styles.angleMode}>
                  {angleMode.toUpperCase()}
                </span>
              </div>
            </div>

            <div className={styles.buttonGrid}>
              {/* Memory Row */}
              <div className={styles.buttonRow}>
                <button onClick={() => memoryOperation('MC')} className={styles.memoryButton}>MC</button>
                <button onClick={() => memoryOperation('MR')} className={styles.memoryButton}>MR</button>
                <button onClick={() => memoryOperation('M+')} className={styles.memoryButton}>M+</button>
                <button onClick={() => memoryOperation('M-')} className={styles.memoryButton}>M-</button>
                <button onClick={() => memoryOperation('MS')} className={styles.memoryButton}>MS</button>
              </div>

              {/* Scientific Functions Row */}
              <div className={styles.buttonRow}>
                <button onClick={() => scientificFunction('square')} className={styles.functionButton}>x²</button>
                <button onClick={() => scientificFunction('cube')} className={styles.functionButton}>x³</button>
                <button onClick={() => performOperation('y^x')} className={styles.functionButton}>xʸ</button>
                <button onClick={() => scientificFunction('exp')} className={styles.functionButton}>eˣ</button>
                <button onClick={() => scientificFunction('10^x')} className={styles.functionButton}>10ˣ</button>
              </div>

              {/* Trig Functions Row */}
              <div className={styles.buttonRow}>
                <button onClick={() => scientificFunction('sin')} className={styles.functionButton}>sin</button>
                <button onClick={() => scientificFunction('cos')} className={styles.functionButton}>cos</button>
                <button onClick={() => scientificFunction('tan')} className={styles.functionButton}>tan</button>
                <button onClick={() => scientificFunction('log')} className={styles.functionButton}>log</button>
                <button onClick={() => scientificFunction('ln')} className={styles.functionButton}>ln</button>
              </div>

              {/* Inverse Trig Functions Row */}
              <div className={styles.buttonRow}>
                <button onClick={() => scientificFunction('asin')} className={styles.functionButton}>sin⁻¹</button>
                <button onClick={() => scientificFunction('acos')} className={styles.functionButton}>cos⁻¹</button>
                <button onClick={() => scientificFunction('atan')} className={styles.functionButton}>tan⁻¹</button>
                <button onClick={() => scientificFunction('sqrt')} className={styles.functionButton}>√</button>
                <button onClick={() => scientificFunction('cbrt')} className={styles.functionButton}>∛</button>
              </div>

              {/* Constants and Other Functions Row */}
              <div className={styles.buttonRow}>
                <button onClick={() => setDisplay(String(constants.pi))} className={styles.functionButton}>π</button>
                <button onClick={() => setDisplay(String(constants.e))} className={styles.functionButton}>e</button>
                <button onClick={() => scientificFunction('factorial')} className={styles.functionButton}>n!</button>
                <button onClick={() => scientificFunction('reciprocal')} className={styles.functionButton}>1/x</button>
                <button onClick={() => performOperation('mod')} className={styles.functionButton}>mod</button>
              </div>

              {/* Clear and Backspace Row */}
              <div className={styles.buttonRow}>
                <button onClick={clearAll} className={styles.clearButton}>AC</button>
                <button onClick={clear} className={styles.clearButton}>C</button>
                <button onClick={backspace} className={styles.clearButton}>⌫</button>
                <button onClick={percentage} className={styles.operatorButton}>%</button>
                <button onClick={() => performOperation('÷')} className={styles.operatorButton}>÷</button>
              </div>

              {/* Number Rows */}
              <div className={styles.buttonRow}>
                <button onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')} className={styles.functionButton}>
                  {angleMode === 'deg' ? 'RAD' : 'DEG'}
                </button>
                <button onClick={() => inputNumber(7)} className={styles.numberButton}>7</button>
                <button onClick={() => inputNumber(8)} className={styles.numberButton}>8</button>
                <button onClick={() => inputNumber(9)} className={styles.numberButton}>9</button>
                <button onClick={() => performOperation('×')} className={styles.operatorButton}>×</button>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={toggleSign} className={styles.functionButton}>+/-</button>
                <button onClick={() => inputNumber(4)} className={styles.numberButton}>4</button>
                <button onClick={() => inputNumber(5)} className={styles.numberButton}>5</button>
                <button onClick={() => inputNumber(6)} className={styles.numberButton}>6</button>
                <button onClick={() => performOperation('-')} className={styles.operatorButton}>-</button>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={() => { const val = parseFloat(display); setDisplay(String(-val)); }} className={styles.functionButton}>(-)</button>
                <button onClick={() => inputNumber(1)} className={styles.numberButton}>1</button>
                <button onClick={() => inputNumber(2)} className={styles.numberButton}>2</button>
                <button onClick={() => inputNumber(3)} className={styles.numberButton}>3</button>
                <button onClick={() => performOperation('+')} className={styles.operatorButton}>+</button>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={() => inputNumber(0)} className={styles.numberButton}>0</button>
                <button onClick={inputDecimal} className={styles.numberButton}>.</button>
                <button onClick={() => setDisplay(String(Math.abs(parseFloat(display))))} className={styles.functionButton}>|x|</button>
                <button onClick={() => performOperation()} className={styles.equalsButton}>=</button>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.historySection}>
              <div className={styles.historyHeader}>
                <h3><IconHistory size={16} /> History</h3>
                <div className={styles.historyActions}>
                  <button onClick={copyToClipboard} className={styles.copyButton}>
                    <IconCopy size={14} />
                  </button>
                  <button onClick={clearHistory} className={styles.clearHistoryButton}>
                    <IconClearAll size={14} />
                  </button>
                </div>
              </div>
              <div className={styles.historyList}>
                {history.length === 0 ? (
                  <p className={styles.emptyHistory}>No calculations yet</p>
                ) : (
                  history.map((entry, index) => (
                    <div key={index} className={styles.historyItem}>
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={styles.instructions}>
              <h3><IconCalculator size={16} /> Keyboard Shortcuts</h3>
              <ul>
                <li><kbd>0-9</kbd> - Numbers</li>
                <li><kbd>+</kbd> <kbd>-</kbd> <kbd>*</kbd> <kbd>/</kbd> - Operations</li>
                <li><kbd>Enter</kbd> <kbd>=</kbd> - Calculate</li>
                <li><kbd>Escape</kbd> <kbd>C</kbd> - Clear</li>
                <li><kbd>L</kbd> - Clear All</li>
                <li><kbd>Backspace</kbd> - Delete</li>
              </ul>
            </div>

            <div className={styles.tips}>
              <h3>Features</h3>
              <ul>
                <li>Basic arithmetic operations</li>
                <li>Trigonometric functions</li>
                <li>Logarithmic functions</li>
                <li>Memory operations (M+, M-, MR, MC)</li>
                <li>Angle mode switching (DEG/RAD)</li>
                <li>Calculation history</li>
                <li>Keyboard input support</li>
                <li>Scientific constants (π, e)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}