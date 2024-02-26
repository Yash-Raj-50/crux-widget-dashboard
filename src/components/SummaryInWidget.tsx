import React, { useState } from "react";
import threeDots from "../static/svgs/three-dots.svg"
import { Button, Dropdown, Space, Typography } from 'antd';
import downArrow from "../static/svgs/down-arrow.svg"
import { MenuItem, SummaryInWidgetProps } from "../types/Types";

const items: MenuItem[] = [{ key: '1', label: 'Today' }, { key: '2', label: 'Yesterday' }, { key: '3', label: 'Last Week' }];
const textColors = ["text-black/[0.65]", "text-white/[0.8]", "text-white/[0.8]"]

const SummaryInWidget: React.FC<SummaryInWidgetProps> = ({ data, subtype, color }) => {

    const [selected, setSelected] = useState('1');
    return (
        <div className="h-full flex flex-col gap-2 px-2">
            <div className="flex justify-between items-center">
                <div>

                    <Dropdown
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: ['1'],
                            onClick: ({ key }) => setSelected(key),
                        }}
                    >
                        <Typography.Link>
                            <Space className={`${color===2?"text-white":"text-[#B5B5B5]"} text-xs`}>
                                {items.find(item => item.key === selected)?.label}
                                <img src={downArrow} alt="down arrow" />
                            </Space>
                        </Typography.Link>
                    </Dropdown>

                </div>
                <Button className="p-0 flex items-center justify-center" type="text" icon={<img src={threeDots} alt="three dots" className="" />}></Button>
            </div>
            <div className={`text-xs font-light overflow-y-scroll ${textColors[color]}`}>
                {selected === '1' && data.today}
                {selected === '2' && data.yesterday}
                {selected === '3' && data.lastWeek}
            </div>
        </div>
    );
};

export default SummaryInWidget;
