import * as starwars from './swapi_service'

const initialState = {
    person: '',
    loading: false
}

const GET_PERSON = 'GET_PERSON'
const GET_PERSON_PENDING = 'GET_PERSON_PENDING'
const GET_PERSON_FULFILLED = 'GET_PERSON_FULFILLED'

function starwarsReducer( state = initialState, action ) {
    switch( action.type ) {
        case GET_PERSON_PENDING:
            return Object.assign( {}, state, {loading: true})

        case GET_PERSON_FULFILLED:
            return Object.assign( {}, state, {loading: false, person: action.payload})

        default:
            return state
    }
}

export function getPerson() {
    return {
        type: GET_PERSON,
        payload: starwars.getStarwars()
    }
}

export default starwarsReducer;