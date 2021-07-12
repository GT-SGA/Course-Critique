import {
    PROFESSOR_DATA_TERM_REQUESTED,
    PROFESSOR_DATA_TERM_RECIEVED,
    PROFESSOR_DATA_TERM_FAILED
} from '../constants/ActionTypes'

const initialState = {
    isLoading: false,
    error: null,
    data: []
};

function getProfessorDataTermReducer(state = initialState, action) {
    switch (action.type) {
        case PROFESSOR_DATA_TERM_REQUESTED:
            return {
                isLoading: true,
                error: null,
                data: null
            };
        case PROFESSOR_DATA_TERM_RECIEVED:
            return {
                isLoading: false,
                data: action.data,
                error: null
            };
        case PROFESSOR_DATA_TERM_FAILED:
            return {
                isLoading: false,
                error: action.error
            };
        default:
            return state;

    }
}

export default getProfessorDataTermReducer