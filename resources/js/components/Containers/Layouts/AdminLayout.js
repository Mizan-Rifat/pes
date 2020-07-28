import React, { Children } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
// import Sidebar from "components/Sidebar/Sidebar.js";

// import routes from "routes.js";

import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle";
// import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../../assets/img/sidebar-1.jpg";
import logo from "../../assets/img/reactlogo.png";

// let ps;

// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//       if (prop.layout === "/admin") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       }
//       return null;
//     })}
//     <Redirect from="/admin" to="/admin/dashboard" />
//   </Switch>
// );

const useStyles = makeStyles(styles);

export default function AdminLayout({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
//   const getRoute = () => {
//     return window.location.pathname !== "/admin/maps";
//   };
//   const resizeFunction = () => {
//     if (window.innerWidth >= 960) {
//       setMobileOpen(false);
//     }
//   };
//   // initialize and destroy the PerfectScrollbar plugin
//   React.useEffect(() => {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps = new PerfectScrollbar(mainPanel.current, {
//         suppressScrollX: true,
//         suppressScrollY: false
//       });
//       document.body.style.overflow = "hidden";
//     }
//     window.addEventListener("resize", resizeFunction);
//     // Specify how to clean up after this effect:
//     return function cleanup() {
//       if (navigator.platform.indexOf("Win") > -1) {
//         ps.destroy();
//       }
//       window.removeEventListener("resize", resizeFunction);
//     };
//   }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      {/* <Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      /> */}
      <div className={classes.mainPanel} ref={mainPanel}>
        
        {Children}
        
      </div>
    </div>
  );
}