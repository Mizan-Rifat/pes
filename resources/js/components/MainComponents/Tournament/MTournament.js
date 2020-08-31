import React,{useEffect} from 'react'
import MCarousel from '@customComponent/Carousel/MCarousel'
import Title from '@customComponent/Title'
import HeaderTabs from './Components/HeaderTabs'
import { Container } from '@material-ui/core';
import { useSelector,useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchInfo, reset } from '@actions/infoAction'
import Progress from '../../CustomComponent/Progress';



export default function MTournament(props) {

    const detailSlug = props.match.params.details;
    const slug = props.match.params.title;

    const {fetchLoading,tournament} = useSelector(state=> state.info)
    const dispatch = useDispatch();


    useEffect(()=>{

        dispatch(reset())

        dispatch(fetchInfo(slug))
        
    },[slug])

    return (
<>
        {
            fetchLoading ? 

            <Progress style={{top:'25%'}} />

            :
        
            <div>
                <MCarousel />

                <Container style={{minHeight:'500px'}}>
                    <div style={{margin:'50px 0'}}>
                        <Title title={tournament.name} />
                    </div>
                    <HeaderTabs detailSlug={detailSlug} tournament={tournament}/>
                </Container>
            </div>

        }
</>
    )
}
