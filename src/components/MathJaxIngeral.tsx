import React, {FunctionComponent} from 'react';
import {MathComponent} from 'mathjax-react';

interface MathJaxIntegralProps {
  expr: string;
  variableDiff: string;
  isDefinite: boolean;
  lowerLimit?: string;
  upperLimit?: string;
}

export const MathJaxIntegral: FunctionComponent<MathJaxIntegralProps> = ({
  expr,
  variableDiff,
  isDefinite,
  lowerLimit,
  upperLimit
}) => {
  console.log(variableDiff, isDefinite, lowerLimit, upperLimit);
  if (isDefinite) {
    const definiteIntegral = String.raw`\int_{${lowerLimit}}^{${upperLimit}} ${expr}\ d${variableDiff}`;
    return <MathComponent tex={definiteIntegral} display={true} />;
  }

  const indefiniteIntegral = String.raw`\int ${expr}\ d${variableDiff}`;
  return <MathComponent tex={indefiniteIntegral} display={true} />;
};
