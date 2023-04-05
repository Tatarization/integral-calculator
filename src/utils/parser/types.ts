export type Node = {
  value: number;
  operation: string;
  left: Node | null;
  right: Node | null;
};

export enum Operation {
  Dec = -1,
  Inc = 1
}

export type ClearedExpression = {
  clearExpression: string;
  leftIndex: number;
  rightIndex: number;
};

export type SymbolInfo = {
  leftStr: string;
  rightStr: string;
  item: number;
};
