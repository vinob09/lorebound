import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetNote } from '../../redux/notes';
import 'react-quill/dist/quill.snow.css';
import './NoteDetailsPage.css';

const NoteDetailsPage = () => {
    const dispatch = useDispatch();
    const { noteId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const note = useSelector(state => state.notes.note);

    useEffect(() => {
        if (noteId) {
            dispatch(thunkGetNote(noteId)).then(() => setIsLoaded(true));
        }
    }, [dispatch, noteId]);

    // handle broken image links
    const handleImageError = (e) => {
        e.target.src = '/sorry-image-not-available.jpg';
    }

    return isLoaded ? (
        <div className='note-details-container'>
            <h1>{note.title}</h1>
            <div className='note-details-image'>
                <img
                    src={note.url ? note.url : '/sorry-image-not-available.jpg'}
                    alt={note.title}
                    onError={handleImageError}
                />
            </div>
            <div className='note-details-content'>
                <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default NoteDetailsPage;
