import React from 'react';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';


const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <Dashboard />,
    children:[]
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <PeopleIcon />,
    children:[]
  },
  {
    path: null,
    name: "Tournaments",
    icon: <SportsSoccerIcon />,
    children:[
      {
        path: "/admin/tournament/premierleague",
        name: "Premier League",
        icon: Dashboard,
        children:[]
      },
      {
        path: "/admin/d",
        name: "Component B",
        icon: Person,
        children:[]
      },
      {
        path: "/admin/c",
        name: "Component A",
        icon: Dashboard,
        children:[]
      },
      {
        path: "/admin/d",
        name: "Component B",
        icon: Person,
        children:[]
      },
      {
        path: "/admin/c",
        name: "Component A",
        icon: Dashboard,
        children:[]
      },
      {
        path: "/admin/d",
        name: "Component B",
        icon: Person,
        children:[]
      },
      {
        path: "/admin/c",
        name: "Component A",
        icon: Dashboard,
        children:[]
      },
      {
        path: "/admin/d",
        name: "Component B",
        icon: Person,
        children:[]
      },
      {
        path: "/admin/d",
        name: "Component B",
        icon: Person,
        children:[]
      },
    ]
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <SettingsIcon />,
    children:[]
  },


];

export default dashboardRoutes;
