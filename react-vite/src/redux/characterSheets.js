import { csrfFetch } from './csrf';

// action Types
const GET_CHARACTERS = 'characters/getAll';
const GET_CHARACTER = 'characters/getOne';
const CREATE_CHARACTER = 'characters/create';
const UPDATE_CHARACTER = 'characters/update';
const DELETE_CHARACTER = 'characters/delete';

const GET_CHARACTER_SKILLS = 'characters/getSkills';
const UPDATE_CHARACTER_SKILL = 'characters/updateSkill';

const GET_CHARACTER_WEAPONS = 'characters/getWeapons';
const ADD_CHARACTER_WEAPON = 'characters/addWeapon';
const UPDATE_CHARACTER_WEAPON = 'characters/updateWeapon';
const DELETE_CHARACTER_WEAPON = 'characters/deleteWeapon';

// action creators
const getCharacters = (characters) => ({
    type: GET_CHARACTERS,
    payload: characters
});

const getCharacter = (character) => ({
    type: GET_CHARACTER,
    payload: character
});

const createCharacter = (character) => ({
    type: CREATE_CHARACTER,
    payload: character
});

const updateCharacter = (character) => ({
    type: UPDATE_CHARACTER,
    payload: character
});

const deleteCharacter = (characterId) => ({
    type: DELETE_CHARACTER,
    payload: characterId
});

const getCharacterSkills = (skills) => ({
    type: GET_CHARACTER_SKILLS,
    payload: skills
});

const updateCharacterSkill = (skill) => ({
    type: UPDATE_CHARACTER_SKILL,
    payload: skill
});

const getCharacterWeapons = (weapons) => ({
    type: GET_CHARACTER_WEAPONS,
    payload: weapons
});

const addCharacterWeapon = (weapon) => ({
    type: ADD_CHARACTER_WEAPON,
    payload: weapon
});

const updateCharacterWeapon = (weapon) => ({
    type: UPDATE_CHARACTER_WEAPON,
    payload: weapon
});

const deleteCharacterWeapon = (weaponId) => ({
    type: DELETE_CHARACTER_WEAPON,
    payload: weaponId
});

// thunks
export const thunkGetAllCharacters = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters`);
        if (response.ok) {
            const characters = await response.json();
            dispatch(getCharacters(characters));
            return characters;
        }
    } catch (err) {
        console.error("Failed to fetch characters:", err);
        return { error: err.message };
    }
};

export const thunkGetCharacterById = (characterId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}`);
        if (response.ok) {
            const character = await response.json();
            dispatch(getCharacter(character));
            return character;
        }
    } catch (err) {
        console.error("Failed to fetch character:", err);
        return { error: err.message };
    }
};

export const thunkCreateCharacter = (formData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters`, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const newCharacter = await response.json();
            dispatch(createCharacter(newCharacter));
            return newCharacter;
        } else if (response.status === 400) {
            const errorData = await response.json();
            return { error: errorData };
        }
    } catch (err) {
        console.error("Failed to create new character:", err);
        return { error: { general: "An unexpected error occurred while creating the character." } };
    }
};

export const thunkUpdateCharacter = (characterId, formData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
            const updatedCharacter = await response.json();
            dispatch(updateCharacter(updatedCharacter));
            return updatedCharacter;
        } else if (response.status === 400) {
            const errorData = await response.json();
            return { error: errorData };
        }
    } catch (err) {
        console.error("Failed to update character:", err);
        return { error: { general: "An unexpected error occurred while updating the character." } };
    }
};

export const thunkDeleteCharacter = (characterId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deleteCharacter(characterId));
            return characterId;
        }
    } catch (err) {
        console.error("Failed to delete character:", err);
        return { error: err.message };
    }
};

// skills thunks
export const thunkGetCharacterSkills = (characterId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}/skills`);
        if (response.ok) {
            const skills = await response.json();
            dispatch(getCharacterSkills(skills));
            return skills;
        }
    } catch (err) {
        console.error("Failed to fetch character skills:", err);
        return { error: err.message };
    }
};

export const thunkUpdateCharacterSkill = (characterId, skillId, formData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}/skills/${skillId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
            const updatedSkill = await response.json();
            dispatch(updateCharacterSkill(updatedSkill));
            return updatedSkill;
        }
    } catch (err) {
        console.error("Failed to update character skill:", err);
        return { error: err.message };
    }
};

// weapons thunks
export const thunkGetCharacterWeapons = (characterId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}/weapons`);
        if (response.ok) {
            const weapons = await response.json();
            dispatch(getCharacterWeapons(weapons));
            return weapons;
        }
    } catch (err) {
        console.error("Failed to fetch character weapons:", err);
        return { error: err.message };
    }
};

export const thunkAddCharacterWeapon = (characterId, formData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}/weapons`, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const newWeapon = await response.json();
            dispatch(addCharacterWeapon(newWeapon));
            return newWeapon;
        }
    } catch (err) {
        console.error("Failed to add new weapon:", err);
        return { error: err.message };
    }
};

export const thunkUpdateCharacterWeapon = (characterId, weaponId, formData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}/weapons/${weaponId}`, {
            method: 'PUT',
            body: formData
        });
        if (response.ok) {
            const updatedWeapon = await response.json();
            dispatch(updateCharacterWeapon(updatedWeapon));
            return updatedWeapon;
        }
    } catch (err) {
        console.error("Failed to update weapon:", err);
        return { error: err.message };
    }
};

export const thunkDeleteCharacterWeapon = (characterId, weaponId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/characters/${characterId}/weapons/${weaponId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deleteCharacterWeapon(weaponId));
            return weaponId;
        }
    } catch (err) {
        console.error("Failed to delete weapon:", err);
        return { error: err.message };
    }
};

// initial state
const initialState = {
    characters: [],
    character: null,
    skills: [],
    weapons: []
};

// reducer
const characterSheetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return { ...state, characters: action.payload };
        case GET_CHARACTER:
            return { ...state, character: action.payload };
        case CREATE_CHARACTER:
            return { ...state, characters: [...state.characters, action.payload] };
        case UPDATE_CHARACTER:
            return {
                ...state,
                characters: state.characters.map(character =>
                    character.id === action.payload.id ? action.payload : character
                ),
                character: state.character?.id === action.payload.id ? action.payload : state.character
            };
        case DELETE_CHARACTER:
            return {
                ...state,
                characters: state.characters.filter(character => character.id !== action.payload),
                character: state.character?.id === action.payload ? null : state.character
            };
        case GET_CHARACTER_SKILLS:
            return { ...state, skills: action.payload };
        case UPDATE_CHARACTER_SKILL:
            return {
                ...state,
                skills: state.skills.map(skill =>
                    skill.id === action.payload.id ? action.payload : skill
                )
            };
        case GET_CHARACTER_WEAPONS:
            return { ...state, weapons: action.payload };
        case ADD_CHARACTER_WEAPON:
            return { ...state, weapons: [...state.weapons, action.payload] };
        case UPDATE_CHARACTER_WEAPON:
            return {
                ...state,
                weapons: state.weapons.map(weapon =>
                    weapon.id === action.payload.id ? action.payload : weapon
                )
            };
        case DELETE_CHARACTER_WEAPON:
            return {
                ...state,
                weapons: state.weapons.filter(weapon => weapon.id !== action.payload)
            };
        default:
            return state;
    }
};

export default characterSheetsReducer;
