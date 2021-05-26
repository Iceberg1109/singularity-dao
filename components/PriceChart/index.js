import { useMemo } from "react";
import { chartOptions, parseOptions } from "../../variables/charts.js";
import { Line } from "react-chartjs-2";
import { getFormattedDate } from "../../utils/formatters.js";

const lineChartOptions = {
  hover: {
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          callback: function (label, index, labels) {
            if (index % 24 == 5) {
              return getFormattedDate(label);
            }
          },
          maxTicksLimit: 100,
          maxRotation: 0,
          minRotation: 0,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  tooltips: {
    // custom: function (tooltip) {
    //   if (!tooltip) return;
    //   // disable displaying the color box;
    //   tooltip.displayColors = false;
    // },
    callbacks: {
      label: function (item) {
        let content = "";

        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        content += formatter.format(item.yLabel);
        return content;
      },
      title: function (item) {
        return getFormattedDate(item[0].label, true);
      },
    },
  },
};

const PriceChart = ({ snapshots }) => {

  console.log(snapshots);
  
  if (typeof window !== "undefined" && window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const lineChartData = useMemo(
    (canvas) => {
      // const ctx = canvas.getContext("2d"),
      //   gradient = ctx.createLinearGradient(0, 0, 0, 400);

      // gradient.addColorStop(0, 'rgba(0, 0,255, 0.5)');
      // gradient.addColorStop(0.5, 'rgba(0, 0, 255, 0.25)');
      // gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

      const labels = [],
        data = [];

      const length = snapshots.length;

      for (let i = 0; i < length; i++) {
        const date = new Date(snapshots[i].date * 1000);

        labels.push(date);
        data.push(snapshots[i].value);
      }

      return {
        labels,
        datasets: [
          {
            data,
            // backgroundColor: gradient
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(23,43,77,0.5)",
            pointHoverBorderWidth: 2,
            lineTension: 0,
          },
        ],
      };
    },
    [snapshots]
  );

  return (
    <Line
      data={lineChartData}
      options={lineChartOptions}
      className="chart-canvas"
    />
  );
};

export default PriceChart;
