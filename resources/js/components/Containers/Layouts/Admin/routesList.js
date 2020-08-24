import React, { useState,useEffect } from 'react';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';

export default function routesList(tournaments) {

    const [routes,setRoutes] = useState([]);


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
          children:routes
        },
        {
          path: "/admin/settings",
          name: "Settings",
          icon: <SettingsIcon />,
          children:[]
        },
      
      ];

      useEffect(() => {
          setRoutes(tournaments.map(tournament=>({
            path: `/admin/tournament/${tournament.slug}`,
            name: tournament.name,
            icon: Dashboard,
            children:[]
        })))
      }, [tournament])

    

    return dashboardRoutes;
}
