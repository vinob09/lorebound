import { csrfFetch } from './csrf';

// action types
const GET_NOTES = 'notes/getAll';

// action creators
const getNotes = (notes) => ({
    type: GET_NOTES,
    payload: notes
})

// thunks
export const thunkAllNotes = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/notes`);
        if (response.ok) {
            const notes = await response.json();
            dispatch(getNotes(notes));
            return notes;
        }
    } catch (err) {
        console.error("Failed to fetch notes:", err);
        return null;
    }
};

// initial state and reducer
const initialState = {
    allNotes: []
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTES:
            return { ...state, allNotes: action.payload }
        default:
            return state;
    }
};

export default notesReducer;
