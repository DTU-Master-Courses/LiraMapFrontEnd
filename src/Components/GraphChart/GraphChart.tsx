// Main Dev: PossibleNPC
// Supporting Devs: Gustav, CookieNess, johalexander
import { FC } from "react";

import { Line } from "react-chartjs-2";

interface GraphChartProps {
  graphContent: any;
  graphTaskID: number;
}

const GraphChart: FC<GraphChartProps> = ({ graphContent, graphTaskID }) => {
  let xValues = [];
  let yValues = [];
  let zValues = [];
  let timestamps = [];
  let date;
  try {
    if (graphContent !== null) {
      date = graphContent["acceleration"][0]["ts_date"];
      for (let i = 0; i < graphContent["acceleration"].length; i++) {
        xValues[i] = graphContent["acceleration"][i]["ax"];
        yValues[i] = graphContent["acceleration"][i]["ay"];
        zValues[i] = graphContent["acceleration"][i]["az"];
        timestamps[i] = graphContent["acceleration"][i]["ts_time"];
      }
    }
  } catch (err) {
    console.log(err);
  }

  const graphDisplayData = {
    labels: timestamps,
    datasets: [
      {
        label: "Acceleration-x",
        data: xValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Acceleration-y",
        data: yValues,
        borderColor: "rgb(100, 99, 158)",
        backgroundColor: "rgba(100, 99, 158, 0.5)",
      },
      {
        label: "Acceleration-z",
        data: zValues,
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: [`Trip: ${graphTaskID}`, date],
          },
        },
      }}
      data={graphDisplayData}
    />
  );
};

export default GraphChart;
