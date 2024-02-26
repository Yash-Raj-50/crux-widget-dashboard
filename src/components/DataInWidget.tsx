import React, { FC , useState } from "react";
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import SegmentSelection from "./SegmentSelection";
import { DataInWidgetProps, DataType } from "../types/Types";

const columns: TableColumnsType<DataType> = [
    {
        title: 'PRODUCT',
        dataIndex: 'Product',
        key: 'Product',
        fixed: 'left',
        width: 100,
        ellipsis: true,
    },
    {
        title: 'Q1-23',
        dataIndex: 'Q1-23',
        key: 'Q1-23',
        // width: 50,
        align: 'center',
    },
    {
        title: 'Q2-23',
        dataIndex: 'Q2-23',
        key: 'Q2-23',
        // width: 50,
        align: 'center',
    },
    {
        title: 'Q3-23',
        dataIndex: 'Q3-23',
        key: 'Q3-23',
        // width: 50,
        align: 'center',
    },
    {
        title: 'Q4-23',
        dataIndex: 'Q4-23',
        key: 'Q4-23',
        // width: 50,
        align: 'center',
    },
    {
        title: 'Q1-24',
        dataIndex: 'Q1-24',
        key: 'Q1-24',
        align: 'center',
    },

];

const tableStyles = ["widgetAntdTableWhite", "widgetAntdTableBlack", "widgetAntdTablePurple"]

const DataInWidget: React.FC<DataInWidgetProps> = ({ data, subtype, color }) => {
    const [selectedTable, setSelectedTable] = useState(0);
    return (
        <div className="bg-inherit h-full flex flex-col justify-around gap-2 pb-8 rounded-[15px]">
            <SegmentSelection color={color} onTableSegmentSelect={(e)=>setSelectedTable(e)} />
            <div className="min-h-[95%] overflow-y-scroll px-4 mb-4">
                <Table
                    columns={columns}
                    dataSource={data[selectedTable]}
                    scroll={{ x: "max-content", y: "max-content" }}
                    pagination={false}
                    className={`${tableStyles[color]} table-row-select`}
                />
            </div>
        </div>
    );
};

export default DataInWidget;
