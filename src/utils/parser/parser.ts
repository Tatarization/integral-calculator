import {ClearedExpression, Node, Operation, SymbolInfo} from './types';
import {ALLOWED_ARGS, CONSTANTS, FUNCTIONS, OPERATIONS, SYMBOLS} from './consts';

const getCorrectExpression = (exp: string, index: number): string => (index > 0 ? exp : '');

const getClosest = (rightBracket: number, leftModule: number) => {
  switch (true) {
    case rightBracket !== -1 && (leftModule === -1 || rightBracket > leftModule):
      return [rightBracket, ')'];
    case leftModule !== -1 && (rightBracket === -1 || leftModule > rightBracket):
      return [leftModule, '|'];
    default:
      return [-1, '-'];
  }
};

const findBracketsIndexes = (exp: string, total: number, cur: number, op: number): number => {
  switch (true) {
    case total === 0:
      return cur - op;
    case cur === -1:
      throw new Error('Ошибка'); // ебануть ошибку
    case exp[cur] === '(':
      return findBracketsIndexes(exp, total - 1, cur + op, op);
    case exp[cur] === ')':
      return findBracketsIndexes(exp, total + 1, cur + op, op);
    default:
      return findBracketsIndexes(exp, total, cur + op, op);
  }
};

const findModulesIndexes = (
  exp: string,
  total: number,
  cur: number,
  lastClose: boolean,
  op: number
): number => {
  switch (true) {
    case total === 0:
      return cur - op;
    case cur === exp.length - 1 || cur === 0:
      return cur;
    case cur >= exp.length:
      return -1000;
    case exp[cur] === '|' && !lastClose && exp[cur - 1] !== ')' && SYMBOLS.includes(exp[cur - 1]):
      return findModulesIndexes(exp, total + 1, cur + op, false, op);
    case exp[cur] === '|':
      return findModulesIndexes(exp, total - 1, cur + op, true, op);

    default:
      return findModulesIndexes(exp, total, cur + op, false, op);
  }
};

const getBracketsIndexesLeftToRight = (exp: string): Array<number> => {
  const [right, operation] = getClosest(exp.lastIndexOf(')'), exp.lastIndexOf('|'));
  switch (operation) {
    case ')':
      return [findBracketsIndexes(exp, 1, +right - 1, Operation.Dec), +right];
    case '|':
      return [findModulesIndexes(exp, -1, +right - 1, true, Operation.Dec), +right];
    default:
      return [-1, -1];
  }
};

const getBracketsIndexesRightToLeft = (exp: string): Array<number> => {
  const [left, operation] = getClosest(exp.indexOf('('), exp.indexOf('|'));
  switch (operation) {
    case ')':
      return [+left, findBracketsIndexes(exp, -1, +left + 1, Operation.Inc)];
    case '|':
      return [+left, findModulesIndexes(exp, 1, +left + 1, false, Operation.Inc)];
    default:
      return [-1, -1];
  }
};

const lookOutside = (
  exp: string,
  symbol: string,
  leftBracket: number,
  rightBracket: number,
  cur: number,
  op: number
): number => {
  switch (true) {
    case leftBracket === -1 && op === Operation.Dec:
      return exp.lastIndexOf(symbol);
    case leftBracket === -1 && op === Operation.Inc:
      return exp.indexOf(symbol);
    case cur === -1 || cur === exp.length:
      return -1;
    case exp[cur] === symbol:
      return cur;
    case op === Operation.Dec && cur === rightBracket:
      return lookOutside(
        exp,
        symbol,
        leftBracket,
        rightBracket,
        cur - rightBracket + leftBracket + op,
        op
      );
    case op === Operation.Inc && cur === leftBracket:
      return lookOutside(
        exp,
        symbol,
        leftBracket,
        rightBracket,
        cur + rightBracket - leftBracket + op,
        op
      );
    default:
      return lookOutside(exp, symbol, leftBracket, rightBracket, cur + op, op);
  }
};

const getSymbolIndexRightToLeft = (
  leftBracket: number,
  rightBracket: number,
  symbol: string,
  exp: string
) => {
  return lookOutside(exp, symbol, leftBracket, rightBracket, 0, Operation.Inc);
};

const getSymbolIndexLeftToRight = (
  leftBracket: number,
  rightBracket: number,
  symbol: string,
  exp: string
) => {
  const checkLeftSide = (exp: string, leftBracketLast: number, index: number): number => {
    const subExp = getCorrectExpression(exp, leftBracketLast).slice(0, leftBracketLast - 1);
    const [left, right] = getBracketsIndexesLeftToRight(subExp);
    if (left === -1 || right === -1 || (right < index && index < leftBracketLast)) {
      return index;
    }
    const ind = lookOutside(subExp, symbol, left, right, subExp.length - 1, Operation.Dec);
    return checkLeftSide(subExp, left, ind);
  };
  const index = lookOutside(exp, symbol, leftBracket, rightBracket, exp.length - 1, Operation.Dec);
  if (index !== -1 && leftBracket !== -1 && index < leftBracket + 1)
    return checkLeftSide(exp, leftBracket, index);

  return index;
};

const removeExtraBrackets = (expression: string): ClearedExpression => {
  const [leftIndex, rightIndex] = getBracketsIndexesLeftToRight(expression);
  if (expression === '') {
    throw new Error('Пустой аргумент');
  }
  if (expression[0] === '(' && leftIndex === 0 && rightIndex === expression.length - 1) {
    return removeExtraBrackets(expression.slice(1, expression.length - 1));
  }
  return {clearExpression: expression, leftIndex, rightIndex};
};

const isNumber = (line: string): boolean => {
  return !!Number(line) || line === '0';
};

const breakLine = (leftBracket: number, rightBracket: number, symbol: string, exp: string) => {
  const getIndex = () => {
    if (symbol === '^') {
      const [left, right] = getBracketsIndexesRightToLeft(exp);
      return getSymbolIndexRightToLeft(left, right, symbol, exp);
    }
    return getSymbolIndexLeftToRight(leftBracket, rightBracket, symbol, exp);
  };
  const index = getIndex();

  switch (true) {
    case index === -1:
      return ['-', '-'];
    case symbol === '-' && index === 0:
      return ['0', exp.slice(1, exp.length)];
    case rightBracket !== -1 &&
      rightBracket < exp.length - 1 &&
      symbol !== '+' &&
      symbol !== '-' &&
      exp[rightBracket + 1] === symbol:
      return [exp.slice(0, rightBracket + 1), exp.slice(rightBracket + 2, exp.length)];
    default:
      return [exp.slice(0, index), exp.slice(index + 1, exp.length)];
  }
};

const searchSymbol = (
  operandsLeft: string,
  operandsRight: string,
  expression: string,
  leftBracket: number,
  rightBracket: number,
  item: number
): SymbolInfo => {
  if (operandsLeft === '-' && operandsRight === '-') {
    if (OPERATIONS.length === item + 1) throw new Error('Ошибка');
    const [left, right] = breakLine(leftBracket, rightBracket, OPERATIONS[item + 1], expression);
    return searchSymbol(left, right, expression, leftBracket, rightBracket, item + 1);
  }
  return {leftStr: operandsLeft, rightStr: operandsRight, item};
};

export const convertToFunc = (expression: string): Node => {
  const convert = (exp: string): Node => {
    const {clearExpression, leftIndex, rightIndex} = removeExtraBrackets(exp);
    // console.log(clearExpression, leftIndex, rightIndex)
    // debugger;
    switch (true) {
      case clearExpression.length === 1 && ALLOWED_ARGS.includes(clearExpression):
        return {
          value: 0,
          operation: clearExpression,
          left: null,
          right: null
        };

      case CONSTANTS.includes(clearExpression):
        return {
          value: 0,
          operation: clearExpression,
          left: null,
          right: null
        };
      case isNumber(clearExpression):
        return {
          value: Number(clearExpression),
          operation: '',
          left: null,
          right: null
        };
      case rightIndex === clearExpression.length - 1 &&
        clearExpression[rightIndex] === '|' &&
        clearExpression[0] === '|':
        return {
          value: 0,
          operation: '|',
          left: null,
          right: convert(clearExpression.slice(1, clearExpression.length - 1)) // mb -2
        };
      case rightIndex === clearExpression.length - 1 && leftIndex > 0: {
        const sub = clearExpression.slice(0, leftIndex);
        if (FUNCTIONS.includes(sub)) {
          return {
            value: 0,
            operation: FUNCTIONS.find(el => el === sub)!,
            left: null,
            right: convert(clearExpression.slice(leftIndex + 1, rightIndex))
          };
        }
        const [left, right] = breakLine(leftIndex, rightIndex, OPERATIONS[0], clearExpression);
        const {leftStr, rightStr, item} = searchSymbol(
          left,
          right,
          clearExpression,
          leftIndex,
          rightIndex,
          0
        );
        return {
          value: 0,
          operation: OPERATIONS[item],
          left: convert(leftStr),
          right: convert(rightStr)
        };
      }
      default: {
        const [left, right] = breakLine(leftIndex, rightIndex, OPERATIONS[0], clearExpression);
        const {leftStr, rightStr, item} = searchSymbol(
          left,
          right,
          clearExpression,
          leftIndex,
          rightIndex,
          0
        );
        return {
          value: 0,
          operation: OPERATIONS[item],
          left: convert(leftStr),
          right: convert(rightStr)
        };
      }
    }
  };
  return convert(expression.replaceAll(' ', ''));
};

export const calculate = (node: Node, args: Map<string, number>): number => {
  switch (node.operation) {
    case '':
      return node.value;
    case 'pi':
      return Math.PI;
    case 'e':
      return Math.E;
    case '+':
      return calculate(node.left!, args) + calculate(node.right!, args);
    case '-':
      return calculate(node.left!, args) - calculate(node.right!, args);
    case '*':
      return calculate(node.left!, args) * calculate(node.right!, args);
    case '/':
      return calculate(node.left!, args) / calculate(node.right!, args);
    case '^':
      return Math.pow(calculate(node.left!, args), calculate(node.right!, args));
    case '|':
      return Math.abs(calculate(node.right!, args));
    case 'ln':
      return Math.log(calculate(node.right!, args));
    case 'lg':
      return Math.log10(calculate(node.right!, args));
    case 'log2':
      return Math.log2(calculate(node.right!, args));
    case 'sin':
      return Math.sin(calculate(node.right!, args));
    case 'cos':
      return Math.cos(calculate(node.right!, args));
    case 'tg':
      return Math.tan(calculate(node.right!, args));
    case 'ctg':
      return 1 / Math.tan(calculate(node.right!, args));
    case 'arcsin':
      return Math.asin(calculate(node.right!, args));
    case 'arccos':
      return Math.acos(calculate(node.right!, args));
    case 'arctg':
      return Math.atan(calculate(node.right!, args));
    case 'arcctg':
      return Math.atan(1 / calculate(node.right!, args));
    case 'sqrt':
      return Math.sqrt(calculate(node.right!, args));
    // case 'sh':
    //     return Math.sinh(calculate(node.right!, args));
    // case 'ch':
    //     return Math.cosh(calculate(node.right!, args));
    // case 'th':
    //     return Math.tanh(calculate(node.right!, args));
    // case 'cth':
    //     return 1 / Math.tanh(calculate(node.right!, args));
    default:
      return args.get(node.operation)!;
  }
};

export const check = (exp: string): void => {
  // console.log(exp)
  const node = convertToFunc(exp);
  for (let i = -1; i <= 1; i += 0.2) {
    const arg = new Map<string, number>([['x', i]]);
    console.log(`y(${i}) = ${calculate(node, arg)}`);
  }
};
