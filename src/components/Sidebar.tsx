import logo from '../static/svgs/logo.svg'
import Activity from '../static/svgs/activity.svg'
import Messages from '../static/svgs/message-chat-square.svg'
import Layers from '../static/svgs/layers-three-01.svg'
import chart from '../static/svgs/bar-chart-square-02.svg'
import ProfileAvatar from '../static/svgs/Avatar.svg'
import { Button, Avatar } from "antd";
import { SidebarLink } from "../types/Types";

const SidebarLinks: SidebarLink[] = [
  {
    icon: logo,
    name: 'Home',
    path: '/',
    disabled: false,
    active: false
  },
  {
    icon: Activity,
    name: 'Activity',
    path: '/',
    disabled: false,
    active: false
  },
  {
    icon: Messages,
    name: 'Messages',
    path: '/',
    disabled: false,
    active: false
  },
  {
    icon: Layers,
    name: 'Layers',
    path: '/',
    disabled: false,
    active: false
  },
  {
    icon: chart,
    name: 'Dashboard',
    path: '/',
    disabled: false,
    active: true
  }
];

const Sidebar = () => {
  return (
    <div className="h-screen w-[5%] flex flex-col justify-between items-center py-8 border">
      <div className='w-full flex flex-col items-center'>
        {SidebarLinks.map((link, index) => (
          <div key={index} className="mb-6">
            <Button type="text" className={`!w-12 h-12 flex items-center justify-center ${link.active ? "bg-[#E9EDF5]" : ""} `} icon={<img src={link.icon} alt={link.name} className='scale-[1.2]' />} href={link.path} disabled={link.disabled} />
          </div>
        ))}
      </div>
      <div>
          <Avatar size={56} src={<img src={ProfileAvatar} alt="avatar" />} />
      </div>
    </div>
  )
};

export default Sidebar;
