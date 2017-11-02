import axios from 'axios';

export function getStarwars() {
    let random = Math.floor( ( Math.random() * 100 ) + 1 )
    
    if( random <= 88 ) {
        return axios.get( `https://swapi.co/api/people/${random}` )
            .then( response => response.data.name )
    }
    else
        getStarwars()
}