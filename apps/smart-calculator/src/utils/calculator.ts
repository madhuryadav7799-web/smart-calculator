/**
 * Smart Calculator Core Logic
 */

export interface CalculatorState {
  display: string;
  previousValue: number;
  operation: string | null;
  waitingForOperand: boolean;
  history: HistoryEntry[];
  memory: number;
  isDarkMode: boolean;
}

export interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: Date;
}

class Calculator {
  private static instance: Calculator;
  private state: CalculatorState = {
    display: '0',
    previousValue: 0,
    operation: null,
    waitingForOperand: false,
    history: [],
    memory: 0,
    isDarkMode: false,
  };

  private constructor() {}

  static getInstance(): Calculator {
    if (!Calculator.instance) {
      Calculator.instance = new Calculator();
    }
    return Calculator.instance;
  }

  getState(): CalculatorState {
    return { ...this.state };
  }

  inputNumber(num: string): string {
    if (this.state.waitingForOperand) {
      this.state.display = String(num);
      this.state.waitingForOperand = false;
    } else {
      this.state.display =
        this.state.display === '0' ? String(num) : this.state.display + num;
    }
    return this.state.display;
  }

  inputDecimal(): string {
    if (this.state.waitingForOperand) {
      this.state.display = '0.';
      this.state.waitingForOperand = false;
    } else if (this.state.display.indexOf('.') === -1) {
      this.state.display += '.';
    }
    return this.state.display;
  }

  handleOperation(nextOperation: string): string {
    const inputValue = parseFloat(this.state.display);

    if (this.state.previousValue === undefined) {
      this.state.previousValue = inputValue;
    } else if (this.state.operation) {
      const result = this.calculate(
        this.state.previousValue,
        inputValue,
        this.state.operation
      );
      this.state.display = String(result);
      this.state.previousValue = result;
    }

    this.state.waitingForOperand = true;
    this.state.operation = nextOperation;
    return this.state.display;
  }

  handleEquals(): string {
    const inputValue = parseFloat(this.state.display);

    if (this.state.operation && this.state.previousValue !== undefined) {
      const result = this.calculate(
        this.state.previousValue,
        inputValue,
        this.state.operation
      );
      const resultStr = this.formatResult(result);
      
      const expression = `${this.state.previousValue} ${this.state.operation} ${inputValue}`;
      this.state.history.unshift({
        expression,
        result: resultStr,
        timestamp: new Date(),
      });

      this.state.display = resultStr;
      this.state.previousValue = 0;
      this.state.operation = null;
      this.state.waitingForOperand = true;
    }

    return this.state.display;
  }

  private calculate(prev: number, current: number, op: string): number {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      case '%':
        return (prev / 100) * current;
      default:
        return current;
    }
  }

  sin(): string {
    const value = parseFloat(this.state.display);
    const result = Math.sin((value * Math.PI) / 180);
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  cos(): string {
    const value = parseFloat(this.state.display);
    const result = Math.cos((value * Math.PI) / 180);
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  tan(): string {
    const value = parseFloat(this.state.display);
    const result = Math.tan((value * Math.PI) / 180);
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  log(): string {
    const value = parseFloat(this.state.display);
    if (value <= 0) {
      this.state.display = 'Error';
      return this.state.display;
    }
    const result = Math.log10(value);
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  ln(): string {
    const value = parseFloat(this.state.display);
    if (value <= 0) {
      this.state.display = 'Error';
      return this.state.display;
    }
    const result = Math.log(value);
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  sqrt(): string {
    const value = parseFloat(this.state.display);
    if (value < 0) {
      this.state.display = 'Error';
      return this.state.display;
    }
    const result = Math.sqrt(value);
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  square(): string {
    const value = parseFloat(this.state.display);
    const result = value * value;
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  cube(): string {
    const value = parseFloat(this.state.display);
    const result = value * value * value;
    this.state.display = this.formatResult(result);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  toggleSign(): string {
    const value = parseFloat(this.state.display);
    this.state.display = String(-value);
    return this.state.display;
  }

  memoryAdd(): void {
    const value = parseFloat(this.state.display);
    this.state.memory += value;
  }

  memorySubtract(): void {
    const value = parseFloat(this.state.display);
    this.state.memory -= value;
  }

  memoryRecall(): string {
    this.state.display = this.formatResult(this.state.memory);
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  memoryClear(): void {
    this.state.memory = 0;
  }

  getMemory(): number {
    return this.state.memory;
  }

  clear(): string {
    this.state.display = '0';
    this.state.previousValue = 0;
    this.state.operation = null;
    this.state.waitingForOperand = true;
    return this.state.display;
  }

  delete(): string {
    if (this.state.display.length > 1) {
      this.state.display = this.state.display.slice(0, -1);
    } else {
      this.state.display = '0';
    }
    return this.state.display;
  }

  private formatResult(value: number): string {
    if (!isFinite(value)) {
      return 'Error';
    }
    
    const rounded = Math.round(value * 10000000000) / 10000000000;
    
    if (Math.abs(rounded) > 1e10 || (Math.abs(rounded) < 1e-10 && rounded !== 0)) {
      return rounded.toExponential(8);
    }
    
    return String(rounded);
  }

  getHistory(): HistoryEntry[] {
    return [...this.state.history];
  }

  clearHistory(): void {
    this.state.history = [];
  }

  toggleTheme(): boolean {
    this.state.isDarkMode = !this.state.isDarkMode;
    return this.state.isDarkMode;
  }

  getTheme(): boolean {
    return this.state.isDarkMode;
  }
}

export default Calculator;
