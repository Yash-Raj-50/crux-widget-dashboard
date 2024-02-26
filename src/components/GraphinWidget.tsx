import React, { useState} from "react";
import SegmentSelection from "./SegmentSelection";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";
import ColumnChart from "./ColumnChart";
import { GraphInWidgetProps } from "../types/Types";

const GraphInWidget: React.FC<GraphInWidgetProps> = ({ data, subtype, color, height, width }) => {
    const [selectedSegment, setSelectedSegment] = useState(0);
    return (
        <div className="bg-inherit h-full flex flex-col justify-around gap-2 pb-8 rounded-[15px]">
            <SegmentSelection color={color} onTableSegmentSelect={(e)=>setSelectedSegment(e)} />
            <div className="min-h-[95%] overflow-y-hidden px-4 mb-4">
                {subtype === 0 && <DonutChart data={data[selectedSegment]} color={color}/>}
                {subtype === 1 && <ColumnChart data={data[selectedSegment]} color={color}/>}
                {subtype === 2 && <LineChart data={data} color={color} height={height} width={width} selectedItem={selectedSegment}/>}
            </div>
        </div>
    );
};

export default GraphInWidget;
