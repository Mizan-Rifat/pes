const playerLookup = (players) =>{
    const obj = {};
    players.map(player=>{
        obj[player.id] = player.name
    })
    return obj;
}
const ratingLookup = () =>{
    const obj = {};
    for (let index = 0; index < 11; index++) {
        obj[index] = index
        
    }
    return obj;
}

export const editableRatingsTableColumns = (players) => {

    return [

        
       
        {
            title:'Player',
            field:'player_id',
            lookup:playerLookup(players),
            cellStyle:{
                padding:'8px',
                fontSize:'12px',
                textAlign:'center'
                
            },
            headerStyle:{
                textAlign:'center'
            },
            editable:'never'
        },
        {
            title:'Rating',
            field:'rating',
            lookup:ratingLookup(),
            cellStyle:{
                padding:'8px',
                fontSize:'12px',
                textAlign:'center'
                
            },
            headerStyle:{
                textAlign:'center'
            },
        },
    ]
}
export const editableEventsTableColumns = (players) => {


    return [
        
        {
            title:'Event',
            field:'event_id',
            lookup:{
                1:'Goal',
                2:'YC',
                3:'RC',
                4:'OG' 
            },
            

            cellStyle:{
                padding:'5px',
                fontSize:'12px',
            },
            width:'50px',
        },
        {
            title:'Player',
            field:'player_id',
            // field:'player.name',
            lookup:playerLookup(players),
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            }
        },
        {
            title:'Min',
            field:'minute',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            },
            
        },
        {
            title:'Assisted',
            field:'assist_player_id',
            lookup:{
                0:'None',
                ...playerLookup(players)
            },
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
                
            }
        },
    ]
}

export const eventsTableColumns = () => {


    return [
        
        {
            title:'Event',
            field:'event_id',
            lookup:{
                1:'Goal',
                2:'YC',
                3:'RC',
                4:'OG' 
            },
            
            width:'50px',
        },
        {
            title:'Player',
            field:'player.name',
           
        },
        {
            title:'Min',
            field:'minute',
          
            
        },
        {
            title:'Assisted',
            field:'assist_player.name',
           
        },
    ]
}

export const ratingsTableColumns = () => {
    return [
        // {
        //     title:'any',
        //     render:()=>'ds'
        // },
        {
            title:'Player',
            field:'player.name',
            // cellStyle:{
            //     padding:'5px',
            //     fontSize:'12px',
                
            // },
            editable:'never'
        },
        {
            title:'Rating',
            field:'rating',
            // cellStyle:{
            //     padding:'5px',
            //     fontSize:'12px',
            // }
        },
    ]
}

