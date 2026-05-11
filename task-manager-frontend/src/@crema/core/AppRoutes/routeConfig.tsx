/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MdOutlineDns,
  MdNotifications,
  MdPeople,
  MdAutoMode,
} from "react-icons/md";

const routesConfig = [
  // {
  //   id: "dashboards",
  //   title: "Application",
  //   messageId: "sidebar.application",
  //   type: "group",
  //   children: [
  //     {
  //       id: "analytics",
  //       title: "Analytics",
  //       messageId: "sidebar.app.dashboard.analytics",
  //       url: "/dashboards/analytics",
  //     },
  //     {
  //       id: "reports",
  //       title: "Reports",
  //       messageId: "sidebar.apps.reports",
  //       url: "/dashboards/reports",
  //     },
  //   ],
  // },
  {
    id: "collaboration",
    title: "Collaboration",
    messageId: "sidebar.collaboration",
    type: "group",
    children: [
      {
        id: "scrum-board",
        title: "Kanban Board",
        messageId: "sidebar.apps.scrumboard",
        icon: <MdOutlineDns />,
        url: "/collaboration/kanban-board",
      },
      {
        id: "team",
        title: "Team",
        messageId: "sidebar.apps.team",
        icon: <MdPeople />,
        url: "/collaboration/team",
      },
      {
        id: "notifications",
        title: "Notifications",
        messageId: "sidebar.apps.notifications",
        icon: <MdNotifications />,
        url: "/collaboration/notifications",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    messageId: "sidebar.settings",
    type: "group",
    children: [
      {
        id: "automation",
        title: "Automation",
        messageId: "sidebar.apps.automation",
        icon: <MdAutoMode />,
        url: "/apps/automation",
      },
    ],
  },
];
export default routesConfig;
