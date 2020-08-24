import React,{useState, useEffect} from 'react'
import DialogBox from '@customComponent/DialogBox';
import Notify from '@customComponent/Notify';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { sendInvitation } from '@actions/clubsAction';



export default function SelectTournaments({open,setOpen,club_ids}) {

    const {tournaments} = useSelector(state=>state.tournaments);
    const dispatch =useDispatch();

    const [state, setState] = useState([]);
    const [loading,setLoading] = useState(false);

    const toast = Notify();
    
      const handleChange = (e,id) => {
        if(e.target.checked){
            setState([...state,id])
        }else{
            setState(state.filter(item=>item != id))
        }
      };
    
    const content = (
        <FormControl>

            {
                tournaments.map((tournament,index)=>(
                    <FormControlLabel
                        disabled={loading}
                        control={
                            <Checkbox 
                                checked={state.includes(tournament.id)} 
                                onChange={(e)=>handleChange(e,tournament.id)} 
                                 
                            />}
                        label={tournament.name}
                        color='primary'
                    />
                ))
            }

            

        </FormControl>
    ) 

    const handleSubmit = () => {
        setLoading(true)
        dispatch(sendInvitation(club_ids,state))
        .then(response=>{
            setLoading(false)
            setOpen(false)
            toast(response,'success')
        })
        .catch(error=>{
            setLoading(false)
            toast(error,'error')
        })
    }

    
    
    return (
        <div>
            <DialogBox
                open={open}
                setOpen={setOpen}
                title='Select Tournaments'
                content={content}
                btnText={'Send'}
                handleSubmit={handleSubmit}
                loading={loading} 

            />
        </div>
    )
}
