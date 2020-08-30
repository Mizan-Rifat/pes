import React, { useState } from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow} from 'material-table'
import {Button,Grid} from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { useTheme } from '@material-ui/core/styles';
import { purple,pink,red } from '@material-ui/core/colors';


const useStyles = makeStyles(theme=>{
console.log({theme})
  
return {
  root:{
      height:'100px',
      width:'100px',
      margin:'100px',
      background:'red'
  },
}
  
});

const theme = createMuiTheme({
  palette: {
    // type:'dark',
    primary: {
      light: pink[900],
      main: purple[900],
      dark: red[900],
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    // type:'dark'
  },
});


export default function DetailPanelWithRowClick() {

        return (
          <ThemeProvider theme={theme}>
            <Comp />
          </ThemeProvider>
        )
}
      
function Comp(){
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Button color='primary' variant='contained'>asd</Button>
      </div>
  )
}