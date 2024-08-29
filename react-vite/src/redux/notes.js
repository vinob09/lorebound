import { csrfFetch } from './csrf';

// action types
const GET_NOTES = 'notes/getAll';
const GET_NOTE = 'notes/getOne';
const CREATE_NOTE = 'notes/create';
const UPDATE_NOTE = 'notes/update';
const DELETE_NOTE = 'notes/delete';

// action creators
const getNotes = (notes) => ({
    type: GET_NOTES,
    payload: notes
});

const getNote = (note) => ({
    type: GET_NOTE,
    payload: note
});

const createNote = (note) => ({
    type: CREATE_NOTE,
    payload: note
});

const updateNote = (note) => ({
    type: UPDATE_NOTE,
    payload: note
});

const deleteNote = (note) => ({
    type: DELETE_NOTE,
    payload: note
});

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

export const thunkGetNote = (noteId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/notes/${noteId}`);
        if (response.ok) {
            const note = await response.json();
            dispatch(getNote(note));
            return note;
        }
    } catch (err) {
        console.error("Failed to fetch note:", err);
        return null;
    }
};

export const thunkCreateNote = (noteData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/notes`, {
            method: 'POST',
            body: JSON.stringify(noteData)
        });
        if (response.ok) {
            const newNote = await response.json();
            dispatch(createNote(newNote));
            return newNote;
        } else if (response.status === 400) {
            const errorData = await response.json();
            return { error: errorData };
        }
    } catch (err) {
        console.error("Failed to create new note:", err);
        return { error: { general: "An unexpected error occurred while creating the note." } };
    }
};

export const thunkUpdateNote = (noteId, noteData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            body: JSON.stringify(noteData),
        });
        if (response.ok) {
            const updatedNote = await response.json();
            dispatch(updateNote(updatedNote));
            return updatedNote;
        }
    } catch (err) {
        console.error("Failed to update note:", err);
        return null;
    }
};

export const thunkDeleteNote = (noteId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/notes/${noteId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deleteNote(noteId));
            return noteId;
        }
    } catch (err) {
        console.error("Failed to delete note:", err);
        return null;
    }
};

// initial state and reducer
const initialState = {
    allNotes: [],
    note: null
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTES:
            return { ...state, allNotes: action.payload }
        case GET_NOTE:
            return { ...state, note: action.payload }
        case CREATE_NOTE:
            return { ...state, allNotes: [...state.allNotes, action.payload] }
        case UPDATE_NOTE:
            return {
                ...state,
                // map through to check for matching note ids in array and updates note, otherwise note remains the same in state
                allNotes: state.allNotes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
                // optional chaining to check if the note exists in state, then checks against action id and updates, otherwise note remains the same
                note: state.note?.id === action.payload.id ? action.payload : state.note
            }
        case DELETE_NOTE:
            return {
                ...state,
                // filter through to return new array without deleted note
                allNotes: state.allNotes.filter((note) => note.id !== action.payload),
                // optional chaining to check if the deleted note exists in state, then sets to null if so, otherwise note remains the same
                note: state.note?.id === action.payload ? null : state.note
            }
        default:
            return state;
    }
};

export default notesReducer;
