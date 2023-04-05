import React, {FC, useEffect, useRef} from 'react';
import functionPlot from 'function-plot';

interface FunctionGraphInterface {
  funcString?: string;
}

export const FunctionPlot: FC<FunctionGraphInterface> = ({funcString}) => {
  const graphRef = useRef(null);

  useEffect(() => {
    functionPlot({
      target: graphRef.current!,
      yAxis: {domain: [-9, 9]},
      // tip: {
      //   renderer: function () {}
      // },
      grid: true,
      data: [
        {
          fn: funcString,
          derivative: {
            fn: '2 * x',
            updateOnMouseMove: true
          },
          graphType: 'polyline'
        }
      ]
    });
  }, [funcString]);

  return <div ref={graphRef} />;
};
