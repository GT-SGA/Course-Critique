import {
    fetchProfessorDataTermRequested,
    fetchProfessorDataTermRecieved,
    fetchProfessorDataTermFailed
} from '../actions/ProfessorDataTermActions';

import {API_BASE_URL} from "../constants/Endpoints";

function fetchProfessorDataTerm(professorId) {
    return dispatch => {
        dispatch(fetchProfessorDataTermRequested());
        // to do generalize to any professor
        // to do -- cannot let this rely on local host
        fetch(`${API_BASE_URL}/prof?profID=${professorId}&by=term`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProfessorDataTermRecieved(res))
                return res;
            })
            .catch(error => {
                dispatch(fetchProfessorDataTermFailed(error));
            })
    }
}

export default fetchProfessorDataTerm