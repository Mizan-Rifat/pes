import React, { useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import Sidebar from './Sidebar'
import SquadList from './SquadList';
import { useSelector,useDispatch } from 'react-redux';
import { fetchClub } from '@actions/clubsAction';
import Progress from '../../CustomComponent/Progress';

export default function Club(props) {

    const {club,fetching} = useSelector(state => state.clubs);
    const dispatch = useDispatch()

    const slug=props.match.params.slug

    useEffect(() => {
            dispatch(fetchClub(slug))
    }, [slug])


    return (
        <Container>
            {
                fetching ? 

                    <Progress size={30} />
                
                    :
            
                    <Grid container spacing={3} className='mt-5'>
                        <Grid item xs={12} sm={4}>
                            <Sidebar club={club} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <SquadList />
                        </Grid>
                    </Grid>
            }
        </Container>
    )
}
