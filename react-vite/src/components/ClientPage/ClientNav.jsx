import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkLogout } from '../../redux/session';
import SearchBar from './SearchBar';
import './ClientNav.css';

const ClientNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.allNotes);

    // handle new note button
    const handleNewNote = () => {
        navigate(`/client/${user.id}/note/new`)
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

    return (
        <>
            <div className='client-nav-welcome'>
                {user ? <p>{user.username}&apos;s Menu</p> : <p>Menu</p>}
            </div>
            <div className='search-bar'><SearchBar /></div>
            <button className='client-nav-button'>New Character</button>
            <button className='client-nav-button' onClick={handleNewNote}>New Note</button>
            <div className='client-nav-section'>
                <h3>Characters</h3>
                <ul>
                    <li><a href='#'>Character_1</a></li>
                    <li><a href='#'>Character_2</a></li>
                    <li><a href='#'>Character_3</a></li>
                </ul>
            </div>
            <div className='client-nav-section'>
                <h3><Link to={`/client/${user.id}/notes`}>Grimoires</Link></h3>
                <ul>
                    {latestNotes.map(note => (
                        <li key={note.id}>
                            <Link to={`/client/${user.id}/notes/${note.id}`}>{note.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <button className='client-nav-logout' onClick={logout}>Logout</button>
        </>
    )
};

export default ClientNav;
