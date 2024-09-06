import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { csrfFetch } from '../../redux/csrf';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const typeaheadRef = useRef(null);
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const handleSearch = async (query) => {
        setIsLoading(true)

        // fetch for noth notes and characters
        const [notesResponse, charactersResponse] = await Promise.all([
            csrfFetch('/api/notes'),
            csrfFetch('/api/characters')
        ]);

        // convert to JSON
        const notesData = await notesResponse.json();
        const charactersData = await charactersResponse.json();

        // filter results based on search query
        const filteredNotes = notesData.filter(note => note && note.title && note.title.toLowerCase().includes(query.toLowerCase()));
        const filteredCharacters = charactersData.filter(character => character && character.characterName && character.characterName.toLowerCase().includes(query.toLowerCase()));

        // combine notes and characters
        const combinedResults = [
            ...filteredNotes.map(note => ({ ...note, type: 'note' })),
            ...filteredCharacters.map(character => ({ ...character, type: 'character' }))
        ];

        setOptions(combinedResults);
        setIsLoading(false);
    };

    const selectResult = (e, result) => {
        e.stopPropagation();

        // navigate based on whether its a note or character
        if (result.type === 'note') {
            navigate(`/client/${user.id}/notes/${result.id}`);
        } else if (result.type === 'character') {
            navigate(`/client/${user.id}/characters/${result.id}`);
        }

        // clear options and reset input
        setOptions([]);
        if (typeaheadRef.current) {
            typeaheadRef.current.clear();
        }
    };

    const filterBy = () => true;

    return (
        <AsyncTypeahead
            ref={typeaheadRef}
            filterBy={filterBy}
            id="async-search"
            isLoading={isLoading}
            labelKey={(option) => option.type === 'note' ? option.title : option.characterName}
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a note or character..."
            renderMenuItemChildren={result => (
                <button onClick={(e) => selectResult(e, result)} className="search-result-button">
                    {result.type === 'note' ? `Note: ${result.title}` : `Character: ${result.characterName}`}
                </button>
            )}
        />
    )
};

export default SearchBar;
