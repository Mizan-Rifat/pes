import React,{useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import Progress from '@customComponent/Progress';
import { fetchSessionUser } from "../Redux/Ducks/SessionUserDuck";


export const GuestProtectedRoute = ({
  component: Component,
  panel,
  ...rest
}) => {

    const {user,fetching:userFetching} = useSelector(state=> state.sessionUser)
    const dispatch = useDispatch();

    useEffect(() => {
      if(Object.entries(user).length == 0){
        dispatch(fetchSessionUser())
      }
    }, [])
    
  return (
    <Route
      {...rest}
      render={props => {

        if(userFetching){
          <Progress size={30} />
        }else{

            if (Object.keys(user).length == 0 ) {

              return <Component {...props} panel={panel}/>;

            } else {
              return (
                <Redirect to={{ pathname: "/"}} />
              );
            }
        }

      }}
    />
  );
};
