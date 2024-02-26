import React from "react";
import SummaryInWidget from "./SummaryInWidget";
import DataInWidget from "./DataInWidget";
import GraphinWidget from "./GraphinWidget";
import { WidgetProps } from "../types/Types";

const bgColors = ["bg-white", "bg-[#282828]", "bg-[#5E5ADB]"]
const heights = ["h-[200px]", "h-[400px]", "h-[600px]"]
// const widths = ["w-[210px]", "w-[420px]", "w-[620px]"]
const colSpans = ["col-span-3 md:col-span-1", "col-span-3 md:col-span-2", "col-span-3 md:col-span-3", "col-span-3 md:col-span-4", "col-span-3 md:col-span-5", "col-span-3 md:col-span-6"]
const rowSpans = ["row-span-1 md:row-span-1", "row-span-1 md:row-span-2", "row-span-1 md:row-span-3", "row-span-1 md:row-span-4", "row-span-1 md:row-span-5", "row-span-1 md:row-span-6"]
const cssAccordingToType = ["p-4", "py-2", "py-2"]

const Widget: React.FC<WidgetProps> = (widget) => {
    return (
        <div className={`
        ${heights[widget.height - 1]}
        ${bgColors[widget.color]}
        ${colSpans[widget.width - 1]}
        ${rowSpans[widget.height - 1]}
        ${cssAccordingToType[widget.type]}
        rounded-[15px] shadow-md`
        }>
            {widget.type === 0 && <SummaryInWidget data={widget.data} subtype={widget.subtype} color={widget.color}/>}
            {widget.type === 1 && <DataInWidget data={widget.data} subtype={widget.subtype} color={widget.color}/>}
            {widget.type === 2 && <GraphinWidget data={widget.data} subtype={widget.subtype} color={widget.color} height={widget.height} width={widget.width}/>}
        </div>
    );
};

export default Widget;
