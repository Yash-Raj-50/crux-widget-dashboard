import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ColumnChartProps } from "../types/Types";

const ChartColours = [["#FB8282", "#5E5ADB", "#F2E144", "#54D787", "#96D3FF"],
["#FB8282", "#5E5ADB", "#F2E144", "#54D787", "#96D3FF"],
["#FB8282", "#FFFFFF", "#F2E144", "#54D787", "#96D3FF"]];
const axistextColours = ["rgba(71, 71, 71, 0.4)", "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)"];
const axisGridColours = ["#F4F4F4", "rgba(246, 246, 246, 0.07)", "rgba(246, 246, 246, 0.1)"];

const ColumnChart: React.FC<ColumnChartProps> = ({ data, color }) => {

  const MyResponsiveBar = ({ data }: { data: any }) => (
    <ResponsiveBar
      data={data}
      margin={{ top: 5, right: 0, bottom: 5, left: 20 }}
      padding={0.85}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat=" >-"
      colors={ChartColours[color]}
      colorBy="indexValue"
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
      ]}
      borderRadius={6}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            1.2
          ]
        ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 0,
        tickPadding: 0,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 40,
        truncateTickAt: 0,
        format: (value: any) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}k`;
          }
          return value;
        }
      }}
      enableLabel={false}
      labelSkipWidth={9}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            1.6
          ]
        ]
      }}
      role="application"
      ariaLabel="Nivo bar chart demo"
      theme={theme}
    />
  )

  const theme = {
    // background: "",
    axis: {
      fontSize: "14px",
      tickColor: "#eee",
      ticks: {
        line: {
          stroke: "#555555"
        },
        text: {
          fill: axistextColours[color]
        }
      },
      legend: {
        text: {
          fill: "#aaaaaa"
        }
      }
    },
    grid: {
      line: {
        stroke: axisGridColours[color],
      }
    }
  };

  return (
    <div className="h-full w-full">
      <MyResponsiveBar data={data[0]} />
    </div>
  );
};

export default ColumnChart;
