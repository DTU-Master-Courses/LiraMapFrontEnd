import "../Drawer/DrawerComponents.css";
import { FC, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphComponentProps {
  graphTaskID: number;
  graphTripID: string;
}

const GraphComponent: FC<GraphComponentProps> = ({
  graphTaskID,
  graphTripID,
}) => {
  const [graphContent, setGraphContent] = useState<any>();

  const fetchGraphContent = async () => {
    const accelerationResponse = await fetch(
      `http://localhost:8000/trips/acceleration/${graphTripID}`
    );
    const acceleration = await accelerationResponse.json();

    return Promise.all(acceleration);
  };

  const query = useQuery(["accelGraph"], fetchGraphContent);

  useEffect(() => {
    if (query.data) setGraphContent(query.data);
  }, [query]);

  let xValues = [];
  let yValues = [];
  let timestamps = [];
  let date;
  try {
    if (graphContent !== undefined && graphContent !== null) {
      date = graphContent["acceleration"][0]["created_date"].split("T")[0];
      for (let i = 0; i < graphContent["acceleration"].length; i++) {
        xValues[i] = graphContent["acceleration"][i]["x"];
        yValues[i] = graphContent["acceleration"][i]["y"];
        timestamps[i] =
          graphContent["acceleration"][i]["created_date"].split("T")[1];
      }
    }
  } catch (err) {
    console.log(err);
  }

  const data = {
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
      data={data}
    />
  );
};

export default GraphComponent;
