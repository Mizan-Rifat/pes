import React,{useEffect,useState} from 'react'
import MCarousel from '@customComponent/Carousel/MCarousel'
import Title from '@customComponent/Title'
import HeaderTabs from './Components/HeaderTabs'
import { Container } from '@material-ui/core';
import { useSelector,useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchInfo, reset } from '@actions/infoAction'
import Progress from '../../CustomComponent/Progress';
import { fetchSessionUser } from '../../Redux/actions/SessionAction';



export default function MTournament(props) {

    const detailSlug = props.match.params.details;
    const slug = props.match.params.title;

    const {fetchLoading,tournament} = useSelector(state=> state.info)
    const {user} = useSelector(state=> state.session)
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

        dispatch(reset())

        dispatch(fetchInfo(slug))
        // dispatch(fetchSessionUser())
        
    },[slug])

    return (
<>
        {
            fetchLoading ? 

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
                        <Title title={tournament.name} />
                    </div>
                    <HeaderTabs detailSlug={detailSlug} tournament={tournament}/>
                </Container>
            </div>

        }
</>
    )
}
