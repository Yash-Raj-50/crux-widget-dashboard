import React from "react";
import Widget from "./Widget";
import { WidgetBoardProps } from "../types/Types";

const WidgetBoard: React.FC<WidgetBoardProps> = ({ boardTitle, widgets }) => {
    return (
        <div className="bg-[#F4F4FF]/[0.5] h-[92.5vh] overflow-y-scroll p-8">
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 grid-flow-dense gap-6">
                {widgets.map((widget) => (
                    <Widget {...widget}/>
                ))}
            </div>
        </div>
    );
};

export default WidgetBoard;
