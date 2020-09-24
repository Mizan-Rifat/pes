import UsersReducer from './UsersReducer';
import {combineReducers} from 'redux';
import FixturesReducer from './FixturesReducer';
import InfoReducer from './InfoReducer';
import ClubsReducer from './ClubsReducer';
import ResultsReducer from './ResultsReducer';
import TournamentsReducer from './TournamentsReducer';
import TournamentReducer from './TournamentReducer';
import OfficialsReducer from './OfficialsReducer';
import ResultAddReducer from './ResultAddReducer';
import StandingsReducer from './StandingsReducer';
import PlayerStatsReducer from './PlayerStatsReducer';
import SessionReducer from './SessionReducer';
import NotificationReducer from './NotificationReducer';
import GinfoReducer from './GinfoReducer';

export const reducers = combineReducers({
    users:UsersReducer,
    fixtures:FixturesReducer,
    results:ResultsReducer,
    info:InfoReducer,
    clubs:ClubsReducer,
    tournaments:TournamentsReducer,
    tournament:TournamentReducer,
    officials:OfficialsReducer,
    addResult:ResultAddReducer,
    standings:StandingsReducer,
    playerStats:PlayerStatsReducer,
    session:SessionReducer,
    notifications:NotificationReducer,
    gInfo:GinfoReducer    
    
})
