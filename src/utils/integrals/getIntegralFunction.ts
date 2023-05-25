import {Node} from '../parser/types';
import {convertToPlot} from '../functionPlot/convertToFunctionPlot';
import {all, create} from 'mathjs';
import {ALLOWED_ARGS, CONSTANTS} from '../parser/consts';
import {isInteger} from 'lodash';

const isConst = (node: Node | null) => (node ? CONSTANTS.includes(node.operation) : false);

const isArg = (node: Node | null) => (node ? ALLOWED_ARGS.includes(node.operation) : false);

export const getIntegralFunction = (
  node: Node,
  variableDiff: string,
  isDefinite: boolean,
  lowerLimit?: string,
  upperLimit?: string
): string => {
  const getOperation = (node: Node | null): string => {
    if (node === null) {
      throw new Error('Ошибка в производной');
    }
    if (node.operation === '' && node.value === 0) {
      return '0';
    }
    if (node.operation === '' && node.value !== 0) {
      return `${node.value} * ${variableDiff}`;
    }
    if (node.operation === variableDiff) {
      return `${node.operation}^2 / 2`;
    }
    if (node.operation === '*') {
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
    }
    if (node.operation === '/') {
      if (
        node.left?.value === 1 &&
        node.right?.operation === '^' &&
        node.right.left?.operation === 'sin' &&
        node.right.left?.right?.operation === variableDiff
      ) {
        return `-ctg(${variableDiff})`;
      } else if (
        node.left?.value === 1 &&
        node.right?.operation === '^' &&
        node.right.left?.operation === 'cos' &&
        node.right.left?.right?.operation === variableDiff
      ) {
        return `tg(${variableDiff})`;
      } else if (
        node.left?.value === 1 &&
        node.right?.operation === 'sqrt' &&
        node.right?.right?.operation === '-' &&
        node.right?.right?.left &&
        isInteger(Math.sqrt(node.right?.right?.left?.value)) &&
        node.right?.right?.right?.operation === '^' &&
        node.right?.right?.right?.left?.operation === variableDiff &&
        node.right?.right?.right?.right?.operation === ''
      ) {
        return `arcsin(${variableDiff} / ${Math.sqrt(node.right?.right?.left.value)})`;
      }
    }
    if (node.operation === '^') {
      // e^x
      if (node.left?.operation === 'e') {
        return `${convertToPlot(node)}`;
      }
      // x ^ 2
      else if (node.left?.operation === variableDiff) {
        return `((${node.left?.operation}) ^ (${node.right?.value} + 1)) / (${node.right?.value} + 1)`;
      }
      // 2^x
      else if (node.right?.operation === variableDiff) {
        return `(${convertToPlot(node)}) / (ln(${node.left?.value}))`;
      }
    }
    if (
      node.operation === '/' &&
      node.left?.value === 1 &&
      node.right?.operation === variableDiff
    ) {
      return `ln(${variableDiff})`; // todo добавить модуль
    }
    if (node.operation === 'sin') {
      if (node.right?.operation === variableDiff) {
        return `-cos(${convertToPlot(node.right)})`;
      }
      return '';
    }
    if (node.operation === 'cos') {
      if (node.right?.operation === variableDiff) {
        return `sin(${convertToPlot(node.right)})`;
      }
      return '';
    }

    return '';
  };
  const config = {};
  const math = create(all, config);
  if (isDefinite) {
    const func = getOperation(node);
    const upperValue = math.simplify(func, {[variableDiff]: upperLimit});
    const lowerValue = math.simplify(func, {[variableDiff]: lowerLimit});
    return `${math.simplify(getOperation(node)).toString()} = ${math
      .simplify(`${upperValue} - ${lowerValue}`)
      .toString()}`;
  }
  return math.simplify(getOperation(node)).toString();
};
