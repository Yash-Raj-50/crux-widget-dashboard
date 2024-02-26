import React, { useState } from "react";
import Widget from "./Widget";
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { WidgetPlaygroundProps } from "../types/Types";

const WidgetPlayground: React.FC<WidgetPlaygroundProps> = ({ widget, onHeightChange, onWidthChange, onColorChange }) => {

    const [selectedHeight, setSelectedHeight] = useState(1);
    const [selectedWidth, setSelectedWidth] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);

    return (
        <div className="h-full relative">
            <div className="grid grid-cols-3 grid-flow-dense gap-4 h-full overflow-y-scroll">
                <div className="col-span-1 h-[100px] bg-[#5E5ADB12] rounded-[15px]"></div>
                <div className="col-span-2 h-[100px] bg-[#5E5ADB12] rounded-[15px]"></div>
                { selectedWidth<=2 && <div className="col-span-1 h-[200px] bg-[#5E5ADB12] rounded-[15px]"></div>}
                <Widget {...widget} />
                <div className="col-span-2 h-[200px] bg-[#5E5ADB12] rounded-[15px]"></div>
                <div className="col-span-1 h-[200px] bg-[#5E5ADB12] rounded-[15px]"></div>
                { selectedHeight<=2 && <div className="col-span-1 h-[200px] bg-[#5E5ADB12] rounded-[15px]"></div>}
            </div>
            <div className="absolute top-[2.5%] left-[2.5%] flex items-center gap-1">
                    <Dropdown
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: ['1'],
                            onClick: ({ key }) => {
                                setSelectedHeight(parseInt(key))
                                onHeightChange(parseInt(key))
                            },
                        }}
                    >
                        <Typography.Link>
                            <Space className="text-[#5E5ADBB2] border border-[#E0DFF8] flex justify-center text-xl w-6 rounded">
                                {selectedHeight}
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                    <span className="text-md text-[#5E5ADBB2]">X</span>
                    <Dropdown
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: ['1'],
                            onClick: ({ key }) => {
                                setSelectedWidth(parseInt(key))
                                onWidthChange(parseInt(key))
                            },
                        }}
                    >
                        <Typography.Link>
                            <Space className="text-[#5E5ADBB2] border border-[#E0DFF8] flex justify-center text-xl w-6 rounded">
                                {selectedWidth}
                            </Space>
                        </Typography.Link>
                    </Dropdown>
            </div>
            <div className="absolute bottom-[2.5%] right-[42.5%] flex gap-4">
                <div className={`h-6 w-6 bg-[#282828] rounded-full ${selectedColor===1?"outline-2 outline-offset-4 outline outline-[#D3D2F5]":""} `} onClick={()=>{
                    setSelectedColor(1);
                    onColorChange(1);
                }} role="button"></div>
                <div className={`h-6 w-6 bg-[#FFFFFF] rounded-full ${selectedColor===0?"outline-2 outline-offset-4 outline outline-[#D3D2F5]":""} `} onClick={()=>{
                    setSelectedColor(0);
                    onColorChange(0);
                    }} role="button"></div>
                <div className={`h-6 w-6 bg-[#5E5ADB] rounded-full ${selectedColor===2?"outline-2 outline-offset-4 outline outline-[#D3D2F5]":""} `} onClick={()=>{
                    setSelectedColor(2);
                    onColorChange(2);
                    }} role="button"></div>
            </div>
        </div>
    );
};

export default WidgetPlayground;

const items: MenuProps['items'] = [
    {
        key: 1,
        label: 1,
    },
    {
        key: 2,
        label: 2,
    },
    {
        key: 3,
        label: 3,
    },
];