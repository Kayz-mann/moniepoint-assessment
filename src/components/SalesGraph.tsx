import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust the threshold as needed
  });

  console.log(ref);

  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [0, 0, 0, 0, 0],
        borderColor: "#48C784",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    if (inView) {
      setData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Sales",
            data: [50, 40, 70, 60, 100],
            borderColor: "#48C784",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      });
    }
  }, [inView]);

  const animationProps = useSpring({
    to: { opacity: inView ? 1 : 0 },
    from: { opacity: 0 },
  });

  return (
    <animated.div style={animationProps}>
      <Line
        data={data}
        options={{
          scales: {
            y: {
              display: false,
            },
            x: {
              grid: {
                display: true,
                color: "rgba(200, 200, 200, 0.2)",
              },
            },
          },
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          maintainAspectRatio: false,
        }}
        height={150}
      />
    </animated.div>
  );
};

export default SalesGraph;
