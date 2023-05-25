import {Node} from '../parser/types';
import {ALLOWED_ARGS, CONSTANTS} from '../parser/consts';
import {convertToPlot} from '../functionPlot/convertToFunctionPlot';
import {all, create} from 'mathjs';

const isConst = (node: Node | null) => (node ? CONSTANTS.includes(node.operation) : false);

const isArg = (node: Node | null) => (node ? ALLOWED_ARGS.includes(node.operation) : false);

export const getDerivativeFunc = (node: Node, variableDiff: string): string => {
  const getOperation = (node: Node | null): string => {
    if (node === null) {
      throw new Error('Ошибка в производной');
    }
    if (node.operation === variableDiff) {
      return '1';
    } else if (isConst(node) || isArg(node)) {
      return '0';
    } else if (node.operation === '-' || node.operation === '+') {
      return `${getOperation(node?.left)}${node.operation}${getOperation(node?.right)}`;
    } else if (node.operation === '*') {
      {
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
    } else if (node.operation === '/') {
      {
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
          // eslint-disable-next-line no-debugger
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
    } else if (node.operation === '^') {
      {
        const leftConst = isConst(node?.left);
        const rightConst = isConst(node?.right);
        if (node.left?.operation === 'e') {
          if (node.right?.operation === variableDiff) {
            return `${convertToPlot(node)}`;
          }
          return `${convertToPlot(node)} * ${getOperation(node.right)}`;
        }
        // x ^ a
        else if (node.left?.operation === variableDiff && rightConst) {
          console.log(node);
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
    } else if (node.operation === '|') {
      {
        if (node.right?.operation === variableDiff) {
          return `sgn(${convertToPlot(node.right)})`;
        }
        return `${getOperation(node.right)}*sgn(${convertToPlot(node.right)})`;
      }
    } else if (node.operation === 'ln') {
      {
        // ln(x)
        if (node.right?.operation === variableDiff) {
          return `1 / ${convertToPlot(node.right)}`;
        }
        // ln(f(x))
        return `(${getOperation(node.right)}) / ${convertToPlot(node.right)}`;
      }
    } else if (node.operation === 'lg') {
      return `${getOperation(node.right)} / (${convertToPlot(node.right)} * log(10))`;
    } else if (node.operation === 'sin') {
      {
        if (node.right?.operation === variableDiff) {
          return `cos(${convertToPlot(node.right)})`;
        }
        return `cos(${convertToPlot(node.right)}) * ${getOperation(node.right)}`;
      }
    } else if (node.operation === 'cos') {
      {
        if (node.right?.operation === variableDiff) {
          return `-sin(${convertToPlot(node.right)})`;
        }
        return `-sin(${convertToPlot(node.right)}) * ${getOperation(node.right)}`;
      }
    } else if (node.operation === 'sqrt') {
      {
        if (node.right?.operation === variableDiff) {
          return `1 / (2 * ${convertToPlot(node)})`;
        }
        return `${getOperation(node.right)} / (2 * ${convertToPlot(node)})`;
      }
    } else if (node.operation === 'log2') {
      return `${getOperation(node.right)} / (${convertToPlot(node.right)} * log(2))`;
    } else if (node.operation === 'tg') {
      {
        if (node.right?.operation === variableDiff) {
          return `1 / cos(${convertToPlot(node.right)})^2`;
        }
        return `${getOperation(node.right)} / cos(${convertToPlot(node.right)})^2`;
      }
    } else if (node.operation === 'ctg') {
      {
        if (node.right?.operation === variableDiff) {
          return `-1 / sin(${convertToPlot(node.right)})^2`;
        }
        return `-(${getOperation(node.right)}) / sin(${convertToPlot(node.right)})^2`;
      }
    } else if (node.operation === 'arcsin') {
      {
        if (node.right?.operation === variableDiff) {
          return `1 / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
        }
        return `${getOperation(node.right)} / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
      }
    } else if (node.operation === 'arccos') {
      {
        if (node.right?.operation === variableDiff) {
          return `-1 / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
        }
        return `-(${getOperation(node.right)}) / (sqrt(1 - (${convertToPlot(node.right)})^2))`;
      }
    } else if (node.operation === 'arctg') {
      {
        if (node.right?.operation === variableDiff) {
          return `1 / (1 + (${convertToPlot(node.right)})^2)`;
        }
        return `${getOperation(node.right)} / (1 + (${convertToPlot(node.right)})^2)`;
      }
    } else if (node.operation === 'sgn') {
      return '0';
    } else {
      {
        return '0';
      }
    }
  };
  const config = {};
  const math = create(all, config);
  // return math.simplify(getOperation(node)).toString();
  return getOperation(node);
};
