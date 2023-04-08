import React, {FC, useEffect, useRef} from 'react';
import functionPlot from 'function-plot';

interface FunctionGraphInterface {
  funcString?: string;
  derivativeString?: string;
}

export const FunctionPlot: FC<FunctionGraphInterface> = ({funcString, derivativeString}) => {
  const graphRef = useRef(null);

  useEffect(() => {
    functionPlot({
      height: 900,
      width: 1500,
      title: 'График функции',
      target: graphRef.current!,
      yAxis: {domain: [-9, 9]},
      grid: true,
      data: [
        {
          fn: funcString,
          derivative: {
            fn: derivativeString,
            updateOnMouseMove: true
          },
          graphType: 'polyline'
        }
      ]
    });
  }, [funcString]);

  return <div ref={graphRef} />;
};
