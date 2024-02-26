import threeDots from "../static/svgs/three-dots.svg"
import { Button , Segmented} from 'antd';
import { SegmentSelectionProps } from "../types/Types";

const textColors = ["text-black/[0.65]", "text-white/[0.8]", "text-white/[0.8]"]
const tableStyles = ["widgetAntdTableWhite", "widgetAntdTableBlack", "widgetAntdTablePurple"]
const options = ['7d', '14d', '30d'];

const SegmentSelection = ({color , onTableSegmentSelect}: SegmentSelectionProps) => {
    return (
        <div className={`border-b-[0.5px] flex justify-between ${textColors[color]} mt-8`}>
            <div className="">
                <Segmented<string>
                    options={options}
                    size="small"
                    onChange={(value) => {
                        onTableSegmentSelect(options.indexOf(value));
                    }}
                    className={`text-xs bg-inherit text-white/[0.65] border-none flex h-full items-end my-0 ${tableStyles[color]}`}
                />
            </div>
            <Button className="pb-2 flex items-end justify-center" type="text" icon={<img src={threeDots} alt="three dots" className="" />}></Button>
        </div>
    );
};

export default SegmentSelection;
