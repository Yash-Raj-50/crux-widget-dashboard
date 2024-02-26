type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
type PositionType = 'left' | 'right';
interface AddWidgetProps {
    activeTab: string;
    onItemAdded: () => void;
    newWidgetId: number;
}
interface ColumnChartProps {
    data: any;
    color: number;
}
interface DataInWidgetProps {
    data: any;
    subtype: number;
    color: number;
}
interface DataType {
    key: React.Key;
    "title": string;
    "Q1-23": string;
    "Q2-23": string;
    "Q3-23": string;
    "Q4-23": string;
    "Q1-24": string;
}
interface DonutChartProps {
    data: any;
    color: number;
}
interface GraphInWidgetProps {
    data: any;
    subtype: number;
    color: number;
    height: number;
    width: number;
}
interface LineChartProps {
    data: any;
    color: number;
    height: number;
    width: number;
    selectedItem: number;
}
interface SegmentSelectionProps {
    color: number;
    onTableSegmentSelect: (value: number) => void;
}
interface SidebarLink {
    icon: string;
    name: string;
    path: string;
    disabled?: boolean;
    active?: boolean;
}
interface SummaryInWidgetProps {
    data: any;
    subtype: number;
    color: number;
}
interface MenuItem {
    key: string;
    label: string;
}
interface WidgetProps {
    id: number;
    title: string;
    board: string;
    color: number;
    type: number;
    subtype: number;
    height: number;
    width: number;
    data: any;
}
interface WidgetBoardProps {
    boardTitle: string;
    widgets: WidgetProps[];
}
interface WidgetPlaygroundProps {
    widget: WidgetProps;
    onHeightChange: (height: number) => void;
    onWidthChange: (width: number) => void;
    onColorChange: (color: number) => void;
}
export type { TargetKey, PositionType, AddWidgetProps, ColumnChartProps, DataInWidgetProps, DataType, DonutChartProps, GraphInWidgetProps, LineChartProps, SegmentSelectionProps, SidebarLink, SummaryInWidgetProps, MenuItem, WidgetProps, WidgetBoardProps, WidgetPlaygroundProps };