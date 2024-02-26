import React, { useRef, useState, useMemo, useEffect } from 'react';
import home from '../../static/svgs/home.svg'
import settings from '../../static/svgs/settings.svg'
import { Button, Tabs, message } from "antd";
import AddWidget from "../../components/AddWidget";
import WidgetBoard from '../../components/WidgetBoard';
import plus from '../../static/svgs/plus-sign.svg'
import cross from '../../static/svgs/cross.svg'
import constantWidgets from '../../data/widgets.json'
import { TargetKey, PositionType } from '../../types/Types';

const Home = () => {

    const [myLocalWidgets, setMyLocalWidgets] = useState(localStorage.getItem('myWidgets'));
    const [myWidgets, setMyWidgets] = useState(myLocalWidgets ? JSON.parse(myLocalWidgets) : []);
    const [widgets, setWidgets] = useState([...constantWidgets, ...myWidgets]);

    // Initial list of tabs to display
    const initialItems = [
        { label: 'Overview', children: <WidgetBoard boardTitle='Overview' widgets={widgets} />, key: 'Overview', closeIcon: <img src={cross} alt='close icon' />, closable: false },
        { label: 'Customer', children: <WidgetBoard boardTitle='Customer' widgets={widgets.filter(widget => widget.board === 'Customer')} />, key: 'Customer', closeIcon: <img src={cross} alt='close icon' /> },
        {
            label: 'Products',
            children: <WidgetBoard boardTitle='Products' widgets={widgets.filter(widget => widget.board === 'Products')} />,
            key: 'Products',
            closable: false,
            closeIcon: <img src={cross} alt='close icon' />,
        },
        {
            label: 'Settings',
            children: <WidgetBoard boardTitle='Setting' widgets={widgets.filter(widget => widget.board === 'Settings')} />,
            key: 'Settings',
            closable: false,
            closeIcon: <img src={cross} alt='close icon' />,
        },
    ];

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const updatedLocalTabs = (JSON.parse(localStorage.getItem('localTabs') || '[]')).map((tab: { key: string, label: string }) => {
        const updatedWidgets = widgets.filter(widget => widget.board === tab.key);
        return { ...tab, children: <WidgetBoard boardTitle={tab.label} widgets={updatedWidgets} /> };
    });
    const [items, setItems] = useState([...initialItems, ...updatedLocalTabs]);
    const newTabIndex = useRef(parseInt(localStorage.getItem('newTabIndex') || '1'));

    // Function to Update the items when the widgets are updated
    const updateItems = () => {
        const updatedMyLocalWidgets = localStorage.getItem('myWidgets');
        setMyLocalWidgets(updatedMyLocalWidgets);
        const updatedMyWidgets = updatedMyLocalWidgets ? JSON.parse(updatedMyLocalWidgets) : [];
        setMyWidgets(updatedMyWidgets);
        setWidgets([...constantWidgets, ...updatedMyWidgets]);

        const updatedItems = items.map(item => {
            if(item.key === 'Overview') return { ...item, children: <WidgetBoard boardTitle='Overview' widgets={[...constantWidgets, ...updatedMyWidgets]} /> }
            const updatedWidgets = ([...constantWidgets, ...updatedMyWidgets]).filter(widget => widget.board === item.key);
            return { ...item, children: <WidgetBoard boardTitle={item.label} widgets={updatedWidgets} /> };
        });
        setItems(updatedItems);
    }

    // Function to handle the change of tabs
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = Math.random().toString(36).slice(1, 9);;
        const newPanes = [...items];
        newPanes.push({ label: `New Tab`, children: <WidgetBoard boardTitle={`Tab New ${newTabIndex.current}`} widgets={widgets.filter(widget => widget.board === `New Tab ${newTabIndex.current}`)} />, key: newActiveKey, closeIcon: <img src={cross} alt='close icon' /> });
        setItems(newPanes);
        setActiveKey(newActiveKey);
        newTabIndex.current ++;

        const localTabs = JSON.parse(localStorage.getItem('localTabs') || '[]');
        const newTabObject = { key: newActiveKey, label: `New Tab` };
        localTabs.push(newTabObject);
        localStorage.setItem('localTabs', JSON.stringify(localTabs));
        localStorage.setItem('newTabIndex', newTabIndex.current.toString());
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);

        // Remove tab from localTabs in localStorage if it exists
        const localTabs = JSON.parse(localStorage.getItem('localTabs') || '[]');
        const updatedLocalTabs = localTabs.filter((tab: { key: string }) => tab.key !== targetKey);
        localStorage.setItem('localTabs', JSON.stringify(updatedLocalTabs));
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    const [position, setPosition] = useState<PositionType[]>(['left', 'right']);

        // Function to display a message when the saved widgets are removed
        const [messageApi, contextHolder] = message.useMessage();
        const info = () => {
            messageApi.info('Saved Widgets Removed!');
        };
    const slot = useMemo(() => {
        // Content to show on the left and right side of the tabs
        const OperationsSlot: Record<PositionType, React.ReactNode> = {
            left: <Button type="text" size="large" icon={<img src={home} alt="home" />} />,
            right: <div className="flex items-center gap-4">
                <AddWidget activeTab={activeKey} newWidgetId={widgets.length + 1} onItemAdded={() => updateItems()} />
                {contextHolder}
                <Button type="text" size="large" icon={<img src={settings} alt="settings" onClick={() => {
                     localStorage.clear(); updateItems(); info(); newTabIndex.current = 1;}}
                />} />
            </div>,
        };
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [position, activeKey, widgets])

    // The main tab component that displays widgets
    return useMemo(() => (
        <>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
                tabBarExtraContent={slot}
                addIcon={<img src={plus} alt="plus" />}
            />
        </>
    ), [widgets, activeKey, onChange, onEdit, slot, items]);
};

export default Home;
