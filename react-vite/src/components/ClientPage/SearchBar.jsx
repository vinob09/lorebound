import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { csrfFetch } from '../../redux/csrf';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const handleSearch = (query) => {
        setIsLoading(true)

        csrfFetch('/api/notes')
            .then((response) => response.json())
            .then(json =>
                json.filter(note => note && note.title && note.title.toLowerCase().includes(query))
            )
            .then((notes) => {
                setOptions(notes)
                setIsLoading(false)
            })
    };

    const selectNote = (e, note) => {
        e.stopPropagation()
        navigate(`/client/${user.id}/notes/${note.id}`)
    };

    const filterBy = () => true

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="async-search"
            isLoading={isLoading}
            labelKey="title"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a note..."
            renderMenuItemChildren={note => (
                <button onClick={(e) => selectNote(e, note)}>
                    {note.title}
                </button>
            )}
        />
    )
};

export default SearchBar;
