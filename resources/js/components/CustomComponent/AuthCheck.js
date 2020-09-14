import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';


export default function AuthCheck() {

    const [authenticated,setAuthenticated] = useState(false);

    const {user} = useSelector(state => state.session)


    useEffect(()=>{
        
        if(Object.entries(user).length > 0){
            setAuthenticated(true);
        }else{
            setAuthenticated(false);
        }
    },[user])

    return [authenticated];
}
