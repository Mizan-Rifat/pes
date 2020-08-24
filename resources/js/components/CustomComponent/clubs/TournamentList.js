import React from 'react'

export default function TournamentList({tournaments}) {
    return (
        <ul>
            {
                tournaments.map((tournament,index)=>(
                <li key={index}>{tournament.name} {tournament.invitation == 2 && '(invited)' }</li>
                ))
            }
            
        </ul>
    )
}
