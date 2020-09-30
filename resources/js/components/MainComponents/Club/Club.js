import React, { useEffect, useState } from 'react'
import { Grid, Container } from '@material-ui/core'
import Sidebar from './Sidebar'
import SquadList from './SquadList';
import { useSelector,useDispatch } from 'react-redux';

import Progress from '../../CustomComponent/Progress';
import { fetchClub } from '../../Redux/Ducks/ClubDuck';

export default function Club(props) {

    const {club,fetching} = useSelector(state => state.club);
    const dispatch = useDispatch()
    const [stateLoading, setStateLoading] = useState(fetching)

    const slug=props.match.params.slug

    useEffect(() => {
        dispatch(fetchClub(slug))
        .then(res=>{
            setStateLoading(false)
        })
    }, [slug])



    return (
        <Container>
            {
                stateLoading ? 

                    <Progress size={30} />
                
                    :
            
                    <Grid container spacing={3} className='mt-5'>
                        <Grid item xs={12} sm={4}>
                            <Sidebar club={club}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <SquadList club={club} />
                        </Grid>
                    </Grid>
            }
        </Container>
    )
}
