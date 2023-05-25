import React, {FC, useEffect, useRef} from 'react';
import functionPlot from 'function-plot';
import {FunctionPlotDatum} from 'function-plot/dist/types';

interface FunctionGraphProps {
  integralFunction?: string;
  initialFunction?: string;
  derivativeFunction?: string;
  isDefinite?: boolean;
  range?: Array<number>;
  constant?: string;
}

export const FunctionPlot: FC<FunctionGraphProps> = ({
  integralFunction,
  initialFunction,
  derivativeFunction,
  isDefinite,
  range,
  constant
}) => {
  const graphRef = useRef(null);
  const data = [
    {
      fn: initialFunction,
      graphType: 'polyline',
      color: 'red',
      id: 1
    },
    {
      fn: `${integralFunction}${
        constant && constant !== '0'
          ? `${Number(constant) > 0 ? `+${constant}` : `-${Math.abs(Number(constant))}`}`
          : ''
      }`,
      graphType: 'polyline',
      color: 'blue',
      id: 2
    },
    {
      fn: derivativeFunction,
      graphType: 'polyline',
      color: 'green',
      id: 3
    },
    {
      fn: range ? initialFunction : undefined,
      range: range,
      closed: true,
      color: '#d3d3d3',
      id: 4
    },
    {
      // фейковый график, потому что если убрать все графики, будут ошибки
      fn: 'sin(x)',
      graphType: 'polyline',
      range: [1.001, 1.003],
      id: 4
    }
  ].filter(value => value.fn);

  const annotations =
    isDefinite && range
      ? [
          {x: range[1], text: `x = ${range[1]}`},
          {x: range[0], text: `x = ${range[0]}`}
        ]
      : undefined;

  useEffect(() => {
    functionPlot({
      height: 800,
      width: 1200,
      target: graphRef.current!,
      tip: {
        xLine: true,
        yLine: true
      },
      yAxis: {domain: [-9, 9]},
      xAxis: {domain: [-20, 20]},
      annotations: annotations,
      grid: true,
      data: data as FunctionPlotDatum[]
    });
  }, [integralFunction, initialFunction, derivativeFunction, graphRef, data, constant]);

  return <div ref={graphRef} />;
};
