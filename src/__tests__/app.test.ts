import {getDerivativeFunc} from '../utils/derivative/getDerivativeFuc';
import {convertToFunc} from '../utils/parser/parser';

const derivative = (exp: string): string => {
  return getDerivativeFunc(convertToFunc(exp.toLowerCase()), 'x');
};

test('derivative const ', () => {
  expect(derivative('10')).toEqual('0');
  expect(derivative('-10')).toEqual('0');
  expect(derivative('2.3e+5')).toEqual('0');
  expect(derivative('a')).toEqual('0');
});

test('derivative line', () => {
  expect(derivative('x')).toEqual('1');
  expect(derivative('x + 300')).toEqual('1');
  expect(derivative('x - 40')).toEqual('1');
  expect(derivative('-x - 5')).toEqual('-1');
});

test('derivative multiply line', () => {
  expect(derivative('2 * x')).toEqual('2');
  expect(derivative('x * (-2)')).toEqual('-2');
  expect(derivative('x - 40')).toEqual('1');
  expect(derivative('-x - 5')).toEqual('-1');
});
