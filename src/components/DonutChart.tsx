import React from "react";
import { MayHaveLabel, ResponsivePie } from '@nivo/pie'
import { ComputedDatum, PieCustomLayerProps } from '@nivo/pie';
import { DonutChartProps } from "../types/Types";

const ChartColours = [["#FB8282", "#5E5ADB", "#F2E144", "#54D787", "#96D3FF"],
                      ["#FB8282", "#5E5ADB", "#F2E144", "#54D787", "#96D3FF"],
                      ["#FB8282", "#FFFFFF", "#F2E144", "#54D787", "#96D3FF"]];
const textColours = ["text-[#4F4F4F]","text-[#FFFFFF]","text-[#FFFFFF]"];

const DonutChart: React.FC<DonutChartProps> = ({ data , color }) => {

  const MyResponsivePie = ({ data }: { data: any }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      startAngle={-30}
      innerRadius={0.8}
      padAngle={2}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ datum: 'data.color' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
    />
  )
  
  const CenteredMetric = ({ dataWithArc, centerX, centerY }: PieCustomLayerProps<MayHaveLabel>) => {
      let total = 0;
      dataWithArc.forEach((datum: ComputedDatum<MayHaveLabel>) => {
          total += datum.value
      });
  
      return (
        <>
          <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              dominantBaseline="central"
              fill='inherit'
              className={`fill-current ${textColours[color]} text-xl font-light`}
              >
              {total}
          </text>
          <text
              x={centerX}
              y={centerY + 15}
              textAnchor="middle"
              dominantBaseline="central"
              fill='inherit'
              className={`fill-current ${textColours[color]} text-xs font-thin`}
              >
              Orders
          </text>
        </>
      )
  }

  const dataWithColor = data[0].map((item: any, index: number) => { return { ...item, "color": ChartColours[color][index] }; });
  return (
    <div className="h-full w-full">
      <MyResponsivePie data={dataWithColor} />
    </div>
  );
};

export default DonutChart;
