import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkLogout } from '../../redux/session';
import { FaUserAlt, FaStickyNote, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';
import SearchBar from './SearchBar';
import './ClientNav.css';

const ClientNav = ({ isMobileOrTablet }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.allNotes);
    const characters = useSelector(state => state.characters.characters);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // handle dropdown toggle
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // handle new note button
    const handleNewNote = () => {
        navigate(`/client/${user.id}/note/new`)
    };

    // handle new character button
    const handleNewCharacter = () => {
        navigate(`/client/${user.id}/character/new`)
    };

    // handle logout
    const logout = () => {
        dispatch(thunkLogout())
            .then(() => {
                navigate("/")
            })
    };

    // sort notes by latest updated at
    const latestNotes = notes
        .slice() // shallow copy
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // sort by descending order
        .slice(0, 3); // grabbing only latest 3 to display

    // sort characters by latest updated at
    const latestCharacters = characters
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 3);

    return (
        <>
            <div className='sidebar'>
                <div className='client-nav-welcome'>
                    {user ? <p>{user.username}&apos;s Menu</p> : <p>Menu</p>}
                </div>
                <div className='client-nav-search-bar'>
                    <SearchBar inputId='client-nav-search'/>
                </div>

                {/* dropdown for TopNav links if on mobile/tablet */}
                {isMobileOrTablet && (
                    <div className='client-nav-section'>
                        <button onClick={toggleDropdown} className='client-nav-dropdown'>
                            Links <FaCaretDown />
                        </button>
                        {dropdownOpen && (
                            <ul className='client-nav-list'>
                                <li className='nav-item'>
                                    <Link to={`/client/${user.id}`} className='nav-link'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to={`/client/${user.id}/notes`} className='nav-link'>
                                        Notes
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to={`/client/${user.id}/characters`} className='nav-link'>
                                        Characters
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/" onClick={logout} className='nav-link'>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                )}

                <div className='client-nav-buttons'>
                    <button
                        className='client-nav-button'
                        onClick={handleNewCharacter}
                        id='client-nav-button'
                        name='newCharacter'>
                        <FaUserAlt /> New Character
                    </button>
                    <button
                        className='client-nav-button'
                        onClick={handleNewNote}
                        id='client-nav-button'
                        name='newNote'>
                        <FaStickyNote /> New Note
                    </button>
                </div>
                <div className='client-nav-section'>
                    <h3>
                        <FaUserAlt className='section-icon' />
                        <Link to={`/client/${user.id}/characters`} className='section-title'>
                            Characters
                        </Link>
                    </h3>
                    <ul className='client-nav-list'>
                        {latestCharacters.map(character => (
                            <li key={character.id} className='nav-item'>
                                <Link to={`/client/${user.id}/characters/${character.id}`} className='nav-link'>
                                    {character.characterName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='client-nav-section'>
                    <h3>
                        <FaStickyNote className='section-icon' />
                        <Link to={`/client/${user.id}/notes`} className='section-title'>
                            Grimoires
                        </Link>
                    </h3>
                    <ul className='client-nav-list'>
                        {latestNotes.map(note => (
                            <li key={note.id} className='nav-item'>
                                <Link to={`/client/${user.id}/notes/${note.id}`} className='nav-link'>
                                    {note.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className='client-nav-logout' onClick={logout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </>
    )
};

export default ClientNav;
