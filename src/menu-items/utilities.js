// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import { TeamOutlined, CalendarOutlined } from '@ant-design/icons'; // Import the CalendarOutlined icon for attendance

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  TeamOutlined,
  IconWindmill,
  IconAttendance: CalendarOutlined, // Assign the CalendarOutlined icon to the IconAttendance key
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: '',
  type: 'group',
  children: [
    {
      id: 'Myteam',
      title: 'My Team',
      type: 'item',
      url: '/Myteam',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'Attendance',
      title: 'Attendance',
      type: 'item',
      url: '/Attendance',
      icon: icons.IconAttendance, 
      breadcrumbs: false,
    },
    {
      id: 'Holiday',
      title: 'Holiday',
      type: 'item',
      url: '/Holiday',
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false,
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default utilities;
