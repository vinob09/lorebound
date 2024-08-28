import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkAllNotes } from '../../redux/notes';
import Tiles from '../Tiles';
import './NotesPage.css';

const NotesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.allNotes);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(thunkAllNotes()).then(() => setIsLoaded(true));
        } else {
            navigate("/");
        }
    }, [user, dispatch, navigate]);

    return isLoaded && user ? (
        <div className='notes-page'>
            <h1>All Notes Page</h1>
            <Tiles items={notes} type="note" />
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default NotesPage;
