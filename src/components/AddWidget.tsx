import React, { useState } from "react";
import plus from '../static/svgs/plus-sign.svg'
import { Button, Modal, Input, ConfigProvider, Divider, Segmented } from "antd";
import WidgetPlayground from "./WidgetPlayground";
import AddWidgetModalIcon from "../static/svgs/add-widget-modal-icon.svg"
import InputClearIcon from "../static/svgs/input-clear-icon.svg"
import ModalCloseIcon from "../static/svgs/modal-close-icon.svg"
import ColumnChartMini from "../static/svgs/column-chart-mini.svg"
import LineChartMini from "../static/svgs/line-chart-mini.svg"
import PieChartMini from "../static/svgs/pie-chart-mini.svg"
import CounterClockwiseClock from "../static/svgs/counter-clockwise-clock.svg"
import DummyData from "../data/dummyData.json"
import { AddWidgetProps } from "../types/Types";

const AddWidget : React.FC<AddWidgetProps> = ({activeTab, onItemAdded, newWidgetId}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [board, setBoard] = useState(activeTab)
    const [color, setColor] = useState(0)
    const [selectedType, setSelectedType] = useState(0)
    const [selectedGraph, setSelectedGraph] = useState<number>(0);
    const [height, setHeight] = useState(1)
    const [width, setWidth] = useState(1)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const titleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(e.target.value)
    };
    const handleReset = () => {
        setTitle('')
        setSelectedType(0)
        setSelectedGraph(0)
        setHeight(1)
        setWidth(1)
        setColor(0)
    };
    const handleSave = () => {
        const newWidget = {
            id: newWidgetId,
            title: title,
            board: activeTab,
            color: color,
            type: selectedType,
            subtype: selectedGraph,
            height: height,
            width: width,
            data: DummyData[selectedType] as { id: string; value: number; label: string; }[][][]
        }
        console.log(newWidget)
        const myWidgetsItem = localStorage.getItem('myWidgets');
        const myWidgets = myWidgetsItem ? JSON.parse(myWidgetsItem) : [];
        localStorage.setItem('myWidgets', JSON.stringify([...myWidgets, newWidget]))
        // Widgets.push(newWidget)
        handleOk()
        onItemAdded()
    }

    const ModalTitle = () => {
        return (
            <>
            <div className="my-4 flex justify-between">
                <div className="flex gap-4">
                    <img src={AddWidgetModalIcon} alt="Add Widget" />
                    <div className="flex flex-col">
                        <div className="text-[#5E5ADB] text-[22px] font-semibold leading-7">Create Widget</div>
                        <div className="text-[#888891] text-sm font-normal leading-5">Manage the glossary of terms of your Database.</div>
                    </div>
                </div>
                <div className="flex items-end">
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    activeBorderColor: '#5E5ADB',
                                    activeShadow: "0px",
                                }
                            }
                        }}
                        >
                        <Input
                            className="w-[25vw] h-9 text-[#898989] font-medium leading-5"
                            placeholder="Give a title to your widget"
                            allowClear={{ clearIcon: <img src={InputClearIcon} alt="clear" /> }}
                            onChange={titleChange} />
                    </ConfigProvider>
                </div>
            </div>
            <Divider className="scale-105"/>
            </>
        );
    }

    return (
        <>
            <Button type="dashed" className="flex items-center border-solid border-[#5E5ADB26] !bg-[#5E5ADB]/[0.05] text-[#5E5ADB]" onClick={showModal} size="large" icon={<img src={plus} alt="plus" />}>
                Add Widget
            </Button>
            <Modal title={ModalTitle()}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={"fit-content"}
                footer={null}
                centered
                closeIcon={<img src={ModalCloseIcon} alt="close" />}
                className="add-widget-modal"
            >
                <div className="h-[60vh] w-[75vw] flex">
                    <div className="basis-2/3 bg-[#F8F8FF] rounded-md border border-[#E0DFF8]">
                        <WidgetPlayground
                            widget= {
                                {
                                    id: newWidgetId,
                                    title: title,
                                    board: board,
                                    color: color,
                                    type: selectedType,
                                    subtype: selectedGraph,
                                    height: height,
                                    width: width,
                                    data: DummyData[selectedType]
                                }
                            }
                            onHeightChange={(e)=>{setHeight(e)}}
                            onWidthChange={(e)=>{setWidth(e)}}
                            onColorChange={(e)=>{setColor(e)}}
                        />
                    </div>
                    <div className="basis-1/3 flex flex-col justify-between pl-8">
                        <div className="flex flex-col gap-4">
                            <div className="text-[#2B2B2B59]">COMPONENTS</div>
                            <div role="button" className={`border ${selectedType===1?"border-[#5E5ADB]":""} h-20 rounded-lg p-4 flex flex-col gap-1`} key={1} onClick={() => setSelectedType(1)}>
                                <div className="text-base font-medium text-[#585858]">Data</div>
                                <div className="text-xs font-normal text-[#888891]">Random Description</div>
                            </div>
                            <div role="button" className={`border ${selectedType===2?"border-[#5E5ADB]":""} h-28 rounded-lg p-4 flex flex-col gap-1`} key={2} onClick={() => setSelectedType(2)}>
                                <div className="text-base font-medium text-[#585858]">Graph</div>
                                <div className="text-xs font-normal text-[#888891]">Random Description</div>
                                <Segmented
                                    options={[
                                    { value: 1, icon: <img src={ColumnChartMini} alt="Column" />},
                                    { value: 2, icon: <img src={LineChartMini} alt="Line" />},
                                    { value: 0, icon: <img src={PieChartMini} alt="Pie" />},
                                    ]}
                                    className="w-36 h-6 my-1 add-widget-modal"
                                    value={selectedGraph} onChange={setSelectedGraph}
                                />
                            </div>
                            <div role="button" className={`border ${selectedType===0?"border-[#5E5ADB]":""} h-20 rounded-lg p-4 flex flex-col gap-1`} key={3} onClick={() => setSelectedType(0)}>
                                <div className="text-base font-medium text-[#585858]">Summary</div>
                                <div className="text-xs font-normal text-[#888891]">Random Description</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button className="!bg-[#F8F8FF] w-[4vw] h-12 flex justify-center items-center border-[#E0DFF8]" onClick={handleReset}>
                                <img src={CounterClockwiseClock} alt="clock" />
                            </Button>
                            <Button className="w-[9vw] h-12 text-[#9F9F9F] text-base rounded-md" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button className="!bg-[#5E5ADB] w-[9vw] h-12 text-[#FFFFFF] text-base rounded-md" onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddWidget;
