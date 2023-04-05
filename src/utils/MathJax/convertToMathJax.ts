import {Node} from '../parser/types';
import {ALLOWED_ARGS, CONSTANTS, FUNCTIONS} from '../parser/consts';

export const convertToMathJax = (node: Node): string => {
  const summary = [...CONSTANTS, ...ALLOWED_ARGS, ...FUNCTIONS];
  const additional = ['*', '/'];
  const summaryComp = [...additional, ...summary];
  const needBracketsSum = (operation: any) =>
    operation !== '|' && operation !== '^' && !summary.includes(operation);
  const needBracketsComp = (operation: any) =>
    operation !== '|' && operation !== '^' && !summaryComp.includes(operation);
  const convertToMath = (node: Node): string => {
    if (node === undefined) {
      throw new Error('Ошибка');
    }
    switch (node.operation) {
      case '':
        return node.value.toString();
      case 'pi':
        return '\\pi';
      case 'e':
        return 'e';
      case '+':
        return `${convertToMath(node.left!)} + ${convertToMath(node.right!)}`;
      case '-': {
        if (node.left?.operation === '' && node.left.value === 0) {
          if (needBracketsComp(node?.right?.operation)) {
            return `-\\left(${convertToMath(node.right!)})\\right`;
          } else {
            return `-${convertToMath(node.right!)}`;
          }
        } else if (needBracketsComp(node?.left?.operation)) {
          return `${convertToMath(node.left!)}-\\left(${convertToMath(node.right!)})\\right`;
        } else {
          return `${convertToMath(node.left!)}-${convertToMath(node.right!)}`;
        }
      }
      case '|':
        return `\\left|${convertToMath(node.right!)}\\right|`;
      case '*': {
        const left = needBracketsComp(node?.left?.operation);
        const right = needBracketsComp(node?.left?.operation);
        if (left && right) {
          return `\\left(${convertToMath(node.left!)}\\right)\\cdot\\left(${convertToMath(
            node.right!
          )}\\right)`;
        } else if (left) {
          return `\\left(${convertToMath(node.left!)}\\right)\\cdot${convertToMath(node.right!)}`;
        } else if (right) {
          return `${convertToMath(node.left!)}\\cdot\\left(${convertToMath(node.right!)}\\right)`;
        }
        return `${convertToMath(node.left!)}${convertToMath(node.right!)}`;
      }
      case '/': {
        const left = needBracketsComp(node?.left?.operation);
        const right = needBracketsComp(node?.left?.operation);
        if (left && right) {
          return `\\frac{\\left(${convertToMath(node.left!)}\\right)}{\\left(${convertToMath(
            node.right!
          )}\\right)}`;
        } else if (left) {
          return `\\frac{\\left(${convertToMath(node.left!)}\\right)}{${convertToMath(
            node.right!
          )}}`;
        } else if (right) {
          return `\\frac{${convertToMath(node.left!)}}{\\left(${convertToMath(
            node.right!
          )}\\right)}`;
        }
        return `\\frac{${convertToMath(node.left!)}}{${convertToMath(node.right!)}}`;
      }
      case '^': {
        const left = needBracketsComp(node?.left?.operation);
        const right = needBracketsComp(node?.left?.operation);
        if (left && right) {
          return `\\left(${convertToMath(node.left!)}\\right)^{\\left(${convertToMath(
            node.right!
          )}\\right)}`;
        } else if (left) {
          return `\\left(${convertToMath(node.left!)}\\right)^{${convertToMath(node.right!)}}`;
        } else if (right) {
          return `${convertToMath(node.left!)}^{\\left(${convertToMath(node.right!)}\\right)}`;
        }
        return `${convertToMath(node.left!)}^{${convertToMath(node.right!)}}`;
      }
      case 'ln':
        return `\\ln\\left(${convertToMath(node.right!)}\\right)`;
      case 'lg':
        return `\\log_{10}\\left(${convertToMath(node.right!)}\\right)`;
      case 'log2':
        return `\\log_{2}\\left(${convertToMath(node.right!)}\\right)`;
      case 'sin':
        return `\\sin\\left(${convertToMath(node.right!)}\\right)`;
      case 'cos':
        return `\\cos\\left(${convertToMath(node.right!)}\\right)`;
      case 'tg':
        return `\\tan\\left(${convertToMath(node.right!)}\\right)`;
      case 'ctg':
        return `\\cot\\left(${convertToMath(node.right!)}\\right)`;
      case 'arcsin':
        return `\\arcsin\\left(${convertToMath(node.right!)}\\right)`;
      case 'arccos':
        return `\\arccos\\left(${convertToMath(node.right!)}\\right)`;
      case 'arctg':
        return `\\arctan\\left(${convertToMath(node.right!)}\\right)`;
      case 'arcctg':
        return `arcctg\\left(${convertToMath(node.right!)}\\right)`;
      case 'sqrt':
        return `\\sqrt{\\left(${convertToMath(node.right!)}\\right)}`;
      default:
        return ALLOWED_ARGS.find(el => el === node.operation)!;
    }
  };
  return convertToMath(node);
};
