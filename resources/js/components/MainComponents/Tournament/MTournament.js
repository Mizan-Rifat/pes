import React,{useEffect,useState} from 'react'
import MCarousel from '@customComponent/Carousel/MCarousel'
import Title from '@customComponent/Title'
import HeaderTabs from './Components/HeaderTabs'
import { Container } from '@material-ui/core';
import { useSelector,useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Progress from '../../CustomComponent/Progress';
import {setTournament } from '../../Redux/Ducks/TournamentDuck'


export default function MTournament(props) {

    const detailSlug = props.match.params.details;
    const slug = props.match.params.title;

    const {tournaments} = useSelector(state=> state.tournaments)
    const {tournamentInfo,fetching} = useSelector(state=> state.tournament)
    const dispatch = useDispatch();

    const [caroselItems, setcaroselItems] = useState([
        {
            image:'/images/slides/slide1.jpg',
        },
        {
            image:'/images/slides/slide2.jpg',
        },
        {
            image:'/images/slides/slide3.jpg',
        },
    ])


    useEffect(()=>{
        const tournament = tournaments.find(item=>item.slug == slug)

        if(tournament == undefined){
            history.push('/error');
            return;
        }

        dispatch(setTournament(tournament))

    },[slug])

    return (
<>
        {
            fetching ? 

            <Progress style={{top:'25%'}} />

            :
        
            <div>
                <MCarousel
                    indicators={false}
                    items={caroselItems}
                    tournament={true}
                />

                <Container style={{minHeight:'500px'}}>
                    <div style={{margin:'50px 0'}}>
                        <Title title={tournamentInfo.name} />
                    </div>
                    <HeaderTabs detailSlug={detailSlug} tournament={tournamentInfo}/>
                </Container>
            </div>

        }
</>
    )
}
