import {Node} from '../parser/types';
import {CONSTANTS} from '../parser/consts';
import {convertToPlot} from '../functionPlot/convertToFunctionPlot';

const isConst = (node: Node | null) => (node ? CONSTANTS.includes(node.operation) : false);

export const getDerivativeFunc = (node: Node, variableDiff: string): string => {
  const getOperation = (node: Node | null): string => {
    if (node === null) {
      throw new Error('Ошибка в производной');
    }
    switch (node.operation) {
      case variableDiff:
        return '1';
      case 'pi' ||
        'e' ||
        '' ||
        'a' ||
        'b' ||
        'c' ||
        'd' ||
        'f' ||
        'g' ||
        'h' ||
        'i' ||
        'g' ||
        'k' ||
        'l' ||
        'm' ||
        'n' ||
        'o' ||
        'p' ||
        'q' ||
        'r' ||
        's' ||
        't' ||
        'u' ||
        'v' ||
        'w' ||
        '':
        return ' 0';
      case '+' || '-':
        return `${getOperation(node?.left)}${node.operation}${getOperation(node?.right)}`;
      case '*': {
        const leftConst = isConst(node?.left);
        const rightConst = isConst(node?.right);

        // x * a
        if (node.left?.operation === variableDiff && rightConst) {
          return `${convertToPlot(node.right)}`;
        }
        // a * x
        else if (node.right?.operation === variableDiff && leftConst) {
          return `${convertToPlot(node.left)}`;
        }
        // a * f(x)
        else if (leftConst) {
          return `${convertToPlot(node.left)}*${getOperation(node.right)}`;
        }
        // f(x) * a
        else if (rightConst) {
          return `${getOperation(node.left)}*${convertToPlot(node.right)}`;
        }
        // f(x) * f(x)
        return `${getOperation(node.left)} * ${convertToPlot(node.right)} + ${getOperation(
          node.right
        )} * ${convertToPlot(node.left)}`;
      }
      case '/': {
        const leftConst = isConst(node?.left);
        const rightConst = isConst(node?.right);

        // a / x
        if (leftConst && node.right?.operation === variableDiff) {
          return `-${convertToPlot(node.left)}/(${node.right.operation}^2)`;
        }
        // x / a
        else if (rightConst && node.left?.operation === variableDiff) {
          return `1/(${node.left.operation})`;
        }
        // a / f(x)
        else if (leftConst) {
          return `-(${node.left}*${getOperation(node.right)})/(${convertToPlot(node.right)}^2)`;
        }
        // f(x) / a
        else if (rightConst) {
          return `${getOperation(node.left)} / ${convertToPlot(node.right)}`;
        }
        // f(x) / f(x)
        return `(${getOperation(node.left)}*${convertToPlot(node.right)}-${convertToPlot(
          node.left
        )}*${getOperation(node.right)}) / (${convertToPlot(node.right)})^2`;
      }
      case '^': {
        const leftConst = isConst(node?.left);
        const rightConst = isConst(node?.right);

        // x ^ a
        if (node.left?.operation === variableDiff && rightConst) {
          return `${convertToPlot(node.right)}*${convertToPlot(node.left)}^${
            (node?.right?.value as number) - 1
          }`;
        }
        // a ^ x
        else if (leftConst && node.right?.operation === variableDiff) {
          return `${convertToPlot(node.left)}^${node.right?.operation}*log(${convertToPlot(
            node.left
          )})`;
        }
        // f(x) ^ a
        else if (rightConst) {
          return `${getOperation(node.left)}*${convertToPlot(node.right)}*${convertToPlot(
            node.left
          )}^(${(node?.right?.value as number) - 1})`;
        }
        // a ^ f(x)
        else if (leftConst) {
          return `(${convertToPlot(node.left)}^${node.right?.operation})*log(${convertToPlot(
            node.left
          )})*${getOperation(node.left)}`;
        }
        // f(x) ^ g(x)
        return `(${getOperation(node.right)} * log(${convertToPlot(node.left)}) + ${getOperation(
          node.left
        )} * ${convertToPlot(node.right)} / ${convertToPlot(node.left)}) * (e^(${convertToPlot(
          node.right
        )}*log(${convertToPlot(node.left)})))`;
      }
      case '|': {
        if (node.right?.operation === variableDiff) {
          return `sgn(${convertToPlot(node.right)})`;
        }
        return `${getOperation(node.right)}*sgn(${convertToPlot(node.right)})`;
      }
      case 'ln': {
        // ln(x)
        if (node.right?.operation === variableDiff) {
          return `1 / ${convertToPlot(node.right)}`;
        }
        // ln(f(x))
        return `(${getOperation(node.right)}) / ${convertToPlot(node.right)}`;
      }
      case 'lg':
        return `${getOperation(node.right)} / (${convertToPlot(node.right)} * log(10))`;
      case 'sin': {
        if (node.right?.operation === variableDiff) {
          return `cos(${convertToPlot(node.right)})`;
        }
        return `cos(${convertToPlot(node.right)}) * ${getOperation(node.right)}`;
      }
      case 'cos': {
        if (node.right?.operation === variableDiff) {
          return `-sin(${convertToPlot(node.right)})`;
        }
        return `-sin(${convertToPlot(node.right)}) * ${getOperation(node.right)}`;
      }
      case 'sqrt': {
        if (node.right?.operation === variableDiff) {
          return `1 / (2 * ${convertToPlot(node)})`;
        }
        return `${getOperation(node.right)} / (2 * ${convertToPlot(node)})`;
      }
      case 'log2':
        return `${getOperation(node.right)} / (${convertToPlot(node.right)} * log(2))`;
      case 'tg': {
        if (node.right?.operation === variableDiff) {
          return `1 / cos(${convertToPlot(node.right)})^2`;
        }
        return `${getOperation(node.right)} / cos(${convertToPlot(node.right)})^2`;
      }
      case 'ctg': {
        if (node.right?.operation === variableDiff) {
          return `-1 / sin(${convertToPlot(node.right)})^2`;
        }
        return `-(${getOperation(node.right)}) / sin(${convertToPlot(node.right)})^2`;
      }
      case 'e': {
        if (node.right?.operation === variableDiff) {
          return `${convertToPlot(node)}`;
        }
        return `${convertToPlot(node)} * ${getOperation(node.right)}`;
      }
      case 'arcsin': {
        if (node.right?.operation === variableDiff) {
          return `1 / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
        }
        return `${getOperation(node.right)} / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
      }
      case 'arccos': {
        if (node.right?.operation === variableDiff) {
          return `-1 / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
        }
        return `-(${getOperation(node.right)}) / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
      }
      case 'arctg': {
        if (node.right?.operation === variableDiff) {
          return `1 / (1 + (${convertToPlot(node.right)})^2)`;
        }
        return `${getOperation(node.right)} / (1 + (${convertToPlot(node.right)})^2)`;
      }
      case 'sgn':
        return '0';
      default: {
        return '0';
      }
    }
  };
  return getOperation(node);
};
