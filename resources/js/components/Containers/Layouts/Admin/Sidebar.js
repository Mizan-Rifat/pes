import React, { useState,useEffect } from 'react';
import styles from "@assets/jss/material-dashboard-react/components/sidebarStyle";
import { makeStyles } from "@material-ui/core/styles";
import SideBarImage from '@assets/img/sidebar-2.jpg';
import logo from "@assets/img/reactlogo.png";
import clsx from 'clsx';
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import routes from './routes';
import Icon from "@material-ui/core/Icon";
import MyList from './MyList'
import { useSelector,useDispatch } from 'react-redux';
import { fetchTournaments } from '@actions/tournamentsAction';
import routesList from './routesList';


const useStyles = makeStyles(styles);


export default function Sidebar() {

    const classes = useStyles();

 

    const brand = (
        <div className={classes.logo}>
          <a
            href="/admin"
            className={classes.logoLink}
            target="_blank"
          >
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img} />
            </div>
            Mizan Rifat
          </a>
        </div>
      );


      

     


    return (
        <div> 
            {brand} 
            <MyList/>
            <div style={{ backgroundImage: "url(" + SideBarImage + ")"}} />
        </div>
    )
}
