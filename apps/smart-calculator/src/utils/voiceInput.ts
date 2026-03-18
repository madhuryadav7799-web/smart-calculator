/**
 * Voice Input Utility for Calculator
 */

export interface VoiceInputResult {
  isValid: boolean;
  value: string;
  operation: string | null;
}

export const parseVoiceInput = (transcript: string): VoiceInputResult => {
  const text = transcript.toLowerCase().trim();

  const numberWords: { [key: string]: string } = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    oh: '0',
  };

  const operationWords: { [key: string]: string } = {
    plus: '+',
    add: '+',
    minus: '-',
    subtract: '-',
    multiply: '×',
    times: '×',
    divide: '÷',
    divided: '÷',
    equals: '=',
    percent: '%',
  };

  for (const [word, op] of Object.entries(operationWords)) {
    if (text.includes(word)) {
      return {
        isValid: true,
        value: '',
        operation: op,
      };
    }
  }

  let result = '';
  const words = text.split(' ');

  for (const word of words) {
    if (numberWords[word] !== undefined) {
      result += numberWords[word];
    }
  }

  if (result && !isNaN(parseFloat(result))) {
    return {
      isValid: true,
      value: result,
      operation: null,
    };
  }

  return {
    isValid: false,
    value: '',
    operation: null,
  };
};
