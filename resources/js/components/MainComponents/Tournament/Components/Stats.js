import React,{useState, useEffect} from 'react';
import Mtable from '@customComponent/Mtable';

import { ListGroupItem1 } from '@customComponent/ListGroupItem';
import { fetchStats, sortStats } from '../../../Redux/actions/playerStatsAction';
import { useSelector, useDispatch } from 'react-redux';

export default function Stats() {

    const {stats,loading} = useSelector(state => state.playerStats);
    const {id:tournament_id} = useSelector(state=>state.info.tournament)

    const dispatch = useDispatch();

    const [columns, setcolumns] = useState([
        {
            title:'#',
            field: 'tableData.id',
            render:rowData=> {
                
                return rowData.tableData.id + 1
            },
            width:'50px',
            sorting:false,
            cellStyle:{
                padding:'0 10px'
            }
        },
        {
            title:'Player',
            field: 'name',
            render:rowData => <ListGroupItem1 image={rowData.image} label={rowData.name} panel='admin' />,
        },
        {
            title:'Club',
            field: 'club.name',
        },
        {
            title:'MP',
            field: 'stats.match_played',
           
        },
        {
            title:'Goals',
            field: 'stats.goals',
           
        },
        {
            title:'YC',
            field: 'stats.yellow_cards',
            
        },
        {
            title:'RC',
            field: 'stats.red_cards',
            
        },
        {
            title:'OG',
            field: 'stats.own_goals',
      
        },
        {
            title:'Ratings',
            field: 'stats.ratings',
      
        },

    ]);

    const sortStats = (orderedColumnId, orderDirection) =>{
        
        const array = ['a','b','c','match_played','goals','yellow_cards','red_cards','own_goals','ratings'];

        const newData = stats.sort((a,b)=>{
          
            if(orderDirection == 'asc'){

                return a.stats[array[orderedColumnId]] - b.stats[array[orderedColumnId]]
               
            }
            if(orderDirection == 'desc'){
                return b.stats[array[orderedColumnId]] - a.stats[array[orderedColumnId]]
                
            }
             
        })

        dispatch(sortStats(newData))
    }

    useEffect(()=>{
        if(stats.length === 0){
            dispatch(fetchStats(tournament_id))
        }
    },[])

    return (
        <div className=''>

        <Mtable
            columns={columns}
            data={stats}
            editable={false}
            loading={loading}
            paging={true}
            header={{padding:'16px !important'}}
            hoverable={true}
            // sorting={false}
            // onOrderChange={(orderedColumnId, orderDirection)=>sortStats(orderedColumnId,orderDirection)}
            
        />
        </div>
)
}