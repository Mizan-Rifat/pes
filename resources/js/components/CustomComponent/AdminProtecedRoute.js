import React,{useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import Progress from '@customComponent/Progress';
import { fetchSessionAdmin } from "../Redux/Ducks/SessionAdminDuck";


export const AdminProtectedRoute = (props) => {

    const {admin,fetching} = useSelector(state=> state.sessionAdmin)
    const dispatch = useDispatch();

    useEffect(() => {
      if(Object.entries(admin).length == 0){
        dispatch(fetchSessionAdmin())
      }
    }, [])
    
  return (
      <>
          {
            fetching ? <Progress size={30} /> :
              Object.entries(admin).length > 0 ?
                
              props.children
              :
              <Redirect to='/error' />
          }
      </>
  );
};
