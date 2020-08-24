import React, { useEffect, useState } from 'react';
import MaterialTable,{MTableEditRow} from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import {makeStyles} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllClubsByTournament, addClubInTournament, deleteClubsFromTournament } from '../../../../actions/clubsAction';
import SearchComp from '@customComponent/SearchComp';
import Notify from '@customComponent/Notify';


const useStyles = makeStyles(theme=>({

    logo:{
        height:'100%',
        margin:'0 10px'
    },
    team:{
        height:'25px',
        display:'flex',
        alignItems:'center',
    },
  }));
  


export default function Clubs({setTitle}) {

    const {id:tournament_id} = useSelector(state=> state.info.tournament)
    const {clubs,loading} = useSelector(state=> state.clubs)

    const dispatch = useDispatch();

    const toast = Notify();

    const [editMode, setEditMode] = useState(false)


    const [columns, setColumns] = useState([
        {
            title:'ID',
            field:'id',
            width:'50px',
            headerStyle: {
                padding:'16px 10px',
                textAlign:'center'
            },
            editable: 'never'
        },
        {
            title:'Club',
            field:'name',
            render : rowData => <Club logo={rowData.logo} name={rowData.name} />,
            editComponent: props => <SearchComp searchurl='/api/clubs/search' props={props} />

        },
        {
            title:'Owner',
            field:'owner.name',
            editable: 'never'

        }
    ]);


    const [data, setData] = useState([
        {
        "id": 1,
        "name": "FC RED RANGERS",
        "slug": "fcredrangers",
        "logo": "fcb.png",
        "owner": {
        "id": 1,
        "name": "Mizan",
        "email": "mizan@mail.com"
        }
        },
        {
        "id": 2,
        "name": "FC BARCELONA",
        "slug": "fcbarcelona",
        "logo": "fcb.png",
        "owner": {
        "id": 2,
        "name": "Prof. Prudence Quitzon",
        "email": "doconnell@example.org"
        }
        },
        {
        "id": 3,
        "name": "REAL MADRID",
        "slug": "realmadrid",
        "logo": "rm.png",
        "owner": {
        "id": 3,
        "name": "Miss Christiana Crona",
        "email": "vdicki@example.net"
        }
        },
        {
        "id": 4,
        "name": "Valencia",
        "slug": "valencia",
        "logo": "fcb.png",
        "owner": {
        "id": 4,
        "name": "Dr. Randi Torphy III",
        "email": "rosemary.hills@example.com"
        }
        },
        {
        "id": 5,
        "name": "Atletico Madrid",
        "slug": "atleticomadrid",
        "logo": "mu.png",
        "owner": {
        "id": 5,
        "name": "Wendell Davis III",
        "email": "jacobson.kaylah@example.com"
        }
        },
        {
        "id": 6,
        "name": "Athletic Bilbao",
        "slug": "athleticbilbao",
        "logo": "rm.png",
        "owner": {
        "id": 6,
        "name": "Casandra Bayer V",
        "email": "vilma.kohler@example.net"
        }
        },
        {
        "id": 8,
        "name": "LEVANTE",
        "slug": "levante",
        "logo": "mu.png",
        "owner": {
        "id": 8,
        "name": "Miss Minnie Blanda",
        "email": "bert.schumm@example.org"
        }
        },
        {
        "id": 7,
        "name": "SEVILLA",
        "slug": "sevilla",
        "logo": "fcb.png",
        "owner": {
        "id": 7,
        "name": "Florence Walker",
        "email": "hegmann.marielle@example.com"
        }
        },
        {
        "id": 9,
        "name": "VILLAREAL",
        "slug": "villareal",
        "logo": "rm.png",
        "owner": {
        "id": 9,
        "name": "Dr. Michaela Kozey Sr.",
        "email": "rebecca50@example.org"
        }
        },
        {
        "id": 10,
        "name": "REAL BETIS",
        "slug": "realbetis",
        "logo": "fcb.png",
        "owner": {
        "id": 10,
        "name": "Jeffry Schoen MD",
        "email": "ywuckert@example.org"
        }
        }
        ])

 
    const handleEdit = ()=>{
        
        setEditMode(!editMode)
    }

    useEffect(()=>{
        setTitle('Clubs')
        // if(clubs.length === 0){
        //     dispatch(fetchAllClubsByTournament(tournament.id))
        // }
    },[])

    return (
        <>
            <div className='text-right'>
                
                <Tooltip title='Edit'>
                    <IconButton aria-label="edit" onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

            </div>


            <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                title=''
                columns={columns}
                data={clubs}
                isLoading={loading}        
                options={{
                    search:true,
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold' },
                    pageSize:10,
                    addRowPosition:'first'
                }}
                editable={ editMode ? {
                    onRowAdd: newData =>
                        new Promise((resolve,reject)=>{
                            console.log({newData})
                            dispatch(addClubInTournament(newData.name,tournament_id))
                            .then(response=>{
                                toast(response,'success')
                                resolve();
                            }).catch(error=>{

                                Object.keys(error).map(err=>{
                                    toast(error[err],'error')
                                })
                                reject();
                            })
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                                    
                            dispatch(deleteClubsFromTournament([oldData.id],tournament_id))
                            .then(response=>{
                                toast(response,'success')
                                resolve()
                            }).catch(error=>{
                                Object.keys(error).map(err=>{
                                    toast(error[err],'error')
                                })
                                resolve();
                            })

                        }),
                  }
                  :
                  false
                
                }
                components = {{
                    EditRow: (tableProps) => {
                        return (
                          <MTableEditRow
                            {...{
                              ...tableProps,
                              onBulkEditRowChanged: () => {},
                            }}
                          />
                        );
                      }
                }}
                
            
            />
        </>
    )
}


function Club({logo,name}){
    const classes = useStyles();
    return(
        
        <div className={classes.team}>
          <img src={`http://127.0.0.1:8000/images/logo/${logo}`} className={classes.logo}/>
          <div>{name}</div>   
        </div>
    )
}