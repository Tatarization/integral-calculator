import {Node} from '../parser/types';
import {ALLOWED_ARGS} from '../parser/consts';

export const convertToPlot = (node: Node | null): string => {
  const convert = (node: Node | null): string => {
    if (node === null) {
      return '';
    }
    switch (node.operation) {
      case '':
        return node.value.toString();
      case 'pi':
        return 'PI';
      case 'e':
        return 'E';
      case '+':
        return `${convert(node.left!)} + ${convert(node.right!)}`;
      case '-':
        return `${convert(node.left!)}-(${convert(node.right!)})`;
      case '|':
        return `abs(${convert(node.right!)})`;
      case '*':
        return `(${convert(node.left!)}) * (${convert(node.right!)})`;
      case '/': {
        return `(${convert(node.left!)}) / (${convert(node.right!)})`;
      }
      case '^':
        return `(${convert(node.left!)})^(${convert(node.right!)})`;
      case 'ln':
        return `log(${convert(node.right!)})`;
      case 'lg':
        return `log10(${convert(node.right!)})`;
      case 'log2':
        return `log2(${convert(node.right!)})`;
      case 'sin':
        return `sin(${convert(node.right!)})`;
      case 'cos':
        return `cos(${convert(node.right!)})`;
      case 'tg':
        return `tan(${convert(node.right!)})`;
      case 'ctg':
        return `ctg(${convert(node.right!)})`;
      case 'arcsin':
        return `asin(${convert(node.right!)})`;
      case 'arccos':
        return `acos(${convert(node.right!)})`;
      case 'arctg':
        return `atan(${convert(node.right!)})`;
      case 'arcctg':
        return `arcctg(${convert(node.right!)})`;
      case 'sqrt':
        return `sqrt(${convert(node.right!)})`;
      default:
        return ALLOWED_ARGS.find(el => el === node.operation)!;
    }
  };
  return convert(node);
};
