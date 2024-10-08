import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkAllNotes } from '../../redux/notes';
import Tiles from '../Tiles';
import Loader from '../Loader/Loader';
import './NotesPage.css';

const NotesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.allNotes);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkAllNotes()).then(() => setIsLoaded(true));
    }, [dispatch]);

    // sort notes by newest first
    const sortedNotes = notes.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // handle tiles click into details
    const handleClick = (noteId) => {
        if (user && user.id) {
            navigate(`/client/${user.id}/notes/${noteId}`);
        }
    };

    // handle creating new note
    const handleNewNote = () => {
        navigate(`/client/${user.id}/note/new`)
    };

    return isLoaded ? (
        <div className='notes-page'>
            {notes.length === 0 ? (
                <div className="notes-empty-state">
                    <p>It looks like you haven&apos;t created any notes yet. Start by clicking the button below!</p>
                    <button className="empty-create-button" onClick={handleNewNote}>Create Your First Note</button>
                    <img src="/empty-state.png" alt="Empty Notes" className="empty-image" />
                </div>
            ) : (
                <>
                    <Link onClick={handleNewNote}>Create New Note</Link>
                    <Tiles items={sortedNotes} type="note" onTileClick={handleClick} />
                </>
            )}
        </div>
    ) : (
        <Loader />
    )
};

export default NotesPage;
