import {
    fetchProfessorDataSectionRequested,
    fetchProfessorDataSectionRecieved,
    fetchProfessorDataSectionFailed
} from '../actions/ProfessorDataSectionActions';

import {API_BASE_URL} from "../constants/Endpoints";

function fetchProfessorDataSection(professorId) {
    return dispatch => {
        dispatch(fetchProfessorDataSectionRequested());
        // to do generalize to any professor
        // to do -- cannot let this rely on local host
        fetch(`${API_BASE_URL}/prof?profID=${professorId}&by=section`)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProfessorDataSectionRecieved(res))
                return res;
            })
            .catch(error => {
                dispatch(fetchProfessorDataSectionFailed(error));
            })
    }
}

export default fetchProfessorDataSection