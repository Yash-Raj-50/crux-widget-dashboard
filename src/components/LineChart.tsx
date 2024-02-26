import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { LineChartProps } from "../types/Types";

const chartColours = [["#FF8E8E", "#5E5ADB", "#5FDC8F"], ["#FF8E8E", "#5E5ADB", "#5FDC8F"], ["#FF8E8E", "#FFFFFF", "#5FDC8F"]];
const axistextColours = ["rgba(71, 71, 71, 0.4)", "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)"];
const axisGridColours = ["#F4F4F4", "rgba(246, 246, 246, 0.07)", "rgba(246, 246, 246, 0.1)"];
const primaryTextColours = ["text-[#AFAFAF]", "text-[#7E7E7E]", "text-[#FFFFFFA6]"];
const secondaryTextColours = ["text-black", "text-white", "text-white"];
const labelColours =[["border-[#FB8282]", "border-[#5E4ADB]", "border-[#F2E144]", "border-[#54D787]", "border-[#96D3FF]"],
                     ["border-[#FB8282]", "border-[#5E4ADB]", "border-[#F2E144]", "border-[#54D787]", "border-[#96D3FF]"],
                     ["border-[#FB8282]", "border-[#FFFFFF]", "border-[#F2E144]", "border-[#54D787]", "border-[#96D3FF]"]];

const LineChart: React.FC<LineChartProps> = ({ data, color, height, width, selectedItem }) => {

  const MyResponsiveLine = ({ data }: { data: any }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 10, bottom: 60, left: 25 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 11,
        tickRotation: -90,
        legend: '',
        legendOffset: 7,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0,
        tickValues: 5,
        format: (value: any) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}k`;
          }
          return value;
        }
      }}
      enableGridY={false}
      lineWidth={4}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={chartColours[color]}
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

  const newData = [
    {
      id: "7d",
      data: data[0][0].map((item: any) => ({
        x: item.id,
        y: item.value,
      })),
    },
    {
      id: "14d",
      data: data[1][0].map((item: any) => ({
        x: item.id,
        y: item.value,
      })),
    },
    {
      id: "30d",
      data: data[2][0].map((item: any) => ({
        x: item.id,
        y: item.value,
      })),
    },
  ];

  return (
    <>
      {height === width ? (
        <div className="h-full w-full">
          <MyResponsiveLine data={newData} />
        </div>
      ) : (
        <div className={`flex ${height>width?"flex-col":"flex-row"} h-full w-full`}>
          <div className="basis-7/12">
            <MyResponsiveLine data={newData} />
          </div>
          <div className={`basis-5/12 flex flex-col overflow-y-scroll gap-2 ${height>width?"border-t-[0.5px] p-2 py-4":"p-2 px-4"} mt-2`}>
            {data[selectedItem][1].map((item: any, index: number) => (
              <div key={index} className={`flex flex-col border-l-4 ${labelColours[color][index]} px-2`}>
                <div className={`${primaryTextColours[color]} text-xs font-light`}>{item.id}</div>
                <div className={`${secondaryTextColours[color]} font-light`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )} 
    </>
  );
};

export default LineChart;
