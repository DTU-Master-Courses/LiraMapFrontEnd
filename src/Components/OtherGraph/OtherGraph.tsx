import { Line } from "react-chartjs-2";

interface OtherGraphProps {
  graphContent: any;
  graphTaskID: number;
}

const OtherGraph = ({ graphContent, graphTaskID }: OtherGraphProps) => {
  let xValues = [];
  let timestamps = [];
  let date;
  if (graphContent !== null || graphContent !== undefined) {
    date = graphContent[0]["date"];
    for (let i = 0; i < graphContent.length; i++) {
      xValues[i] = graphContent[i]["value"];
      timestamps[i] = graphContent[i]["time"];
    }
  }

  const graphDisplayData = {
    labels: timestamps,
    datasets: [
      {
        label: `${graphContent[0]["tag"]} Values`,
        data: xValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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

export default OtherGraph;
