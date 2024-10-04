import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { csrfFetch } from '../../redux/csrf';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchBar = ({inputId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const typeaheadRef = useRef(null);
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const handleSearch = async (query) => {
        setIsLoading(true);

        const [notesResponse, charactersResponse] = await Promise.all([
            csrfFetch('/api/notes'),
            csrfFetch('/api/characters')
        ]);

        const notesData = await notesResponse.json();
        const charactersData = await charactersResponse.json();

        const filteredNotes = notesData.filter(note => note.title.toLowerCase().includes(query.toLowerCase()));
        const filteredCharacters = charactersData.filter(character => character.characterName.toLowerCase().includes(query.toLowerCase()));

        const combinedResults = [
            ...filteredNotes.map(note => ({ ...note, type: 'note' })),
            ...filteredCharacters.map(character => ({ ...character, type: 'character' }))
        ];

        setOptions(combinedResults);
        setIsLoading(false);
    };

    const selectResult = (e, result) => {
        e.stopPropagation();

        if (result.type === 'note') {
            navigate(`/client/${user.id}/notes/${result.id}`);
        } else if (result.type === 'character') {
            navigate(`/client/${user.id}/characters/${result.id}`);
        }

        setOptions([]);
        if (typeaheadRef.current) {
            typeaheadRef.current.clear();
        }
    };

    const filterBy = () => true;

    return (
        <div>
            <div className={inputId}></div>
            <AsyncTypeahead
                id="async-search"
                ref={typeaheadRef}
                filterBy={filterBy}
                inputProps={{ id: "search-bar", name: "search" }}
                isLoading={isLoading}
                minLength={3}
                onSearch={handleSearch}
                options={options}
                placeholder="Search for a note or character..."
                labelKey={(option) => option.type === 'note' ? option.title : option.characterName}
                renderMenuItemChildren={result => (
                    <button onClick={(e) => selectResult(e, result)} className="search-result-button">
                        {result.type === 'note' ? `Note: ${result.title}` : `Character: ${result.characterName}`}
                    </button>
                )}
                autocomplete="on"
            />
        </div>
    );
};

export default SearchBar;
