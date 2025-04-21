import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
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

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.substring(1) : '-' + display);
  };

  const inputPercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="bg-gray-900 p-4 mb-4 rounded-md text-right">
        <div className="text-3xl font-bold text-white overflow-hidden">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button 
          onClick={clearAll} 
          variant="destructive" 
          className="text-xl font-bold"
        >
          AC
        </Button>
        <Button 
          onClick={toggleSign} 
          variant="secondary" 
          className="text-xl font-bold"
        >
          +/-
        </Button>
        <Button 
          onClick={inputPercent} 
          variant="secondary" 
          className="text-xl font-bold"
        >
          %
        </Button>
        <Button 
          onClick={() => performOperation('÷')} 
          variant="secondary" 
          className={cn(
            "text-xl font-bold",
            operation === '÷' && "bg-orange-500 hover:bg-orange-600"
          )}
        >
          ÷
        </Button>
        
        <Button onClick={() => inputDigit('7')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">7</Button>
        <Button onClick={() => inputDigit('8')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">8</Button>
        <Button onClick={() => inputDigit('9')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">9</Button>
        <Button 
          onClick={() => performOperation('×')} 
          variant="secondary" 
          className={cn(
            "text-xl font-bold",
            operation === '×' && "bg-orange-500 hover:bg-orange-600"
          )}
        >
          ×
        </Button>
        
        <Button onClick={() => inputDigit('4')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">4</Button>
        <Button onClick={() => inputDigit('5')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">5</Button>
        <Button onClick={() => inputDigit('6')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">6</Button>
        <Button 
          onClick={() => performOperation('-')} 
          variant="secondary" 
          className={cn(
            "text-xl font-bold",
            operation === '-' && "bg-orange-500 hover:bg-orange-600"
          )}
        >
          -
        </Button>
        
        <Button onClick={() => inputDigit('1')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">1</Button>
        <Button onClick={() => inputDigit('2')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">2</Button>
        <Button onClick={() => inputDigit('3')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">3</Button>
        <Button 
          onClick={() => performOperation('+')} 
          variant="secondary" 
          className={cn(
            "text-xl font-bold",
            operation === '+' && "bg-orange-500 hover:bg-orange-600"
          )}
        >
          +
        </Button>
        
        <Button onClick={() => inputDigit('0')} className="text-xl font-bold bg-gray-700 hover:bg-gray-600 col-span-2">0</Button>
        <Button onClick={inputDecimal} className="text-xl font-bold bg-gray-700 hover:bg-gray-600">.</Button>
        <Button 
          onClick={() => performOperation('=')} 
          className="text-xl font-bold bg-orange-500 hover:bg-orange-600"
        >
          =
        </Button>
      </div>
    </div>
  );
}