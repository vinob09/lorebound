import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { thunkGetNote, thunkDeleteNote } from '../../redux/notes';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import Loader from '../Loader/Loader';
import 'react-quill/dist/quill.snow.css';
import './NoteDetailsPage.css';

const NoteDetailsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { noteId } = useParams();
    const { closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const note = useSelector(state => state.notes.note);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (noteId) {
            dispatch(thunkGetNote(noteId)).then(() => setIsLoaded(true));
        }
    }, [dispatch, noteId]);

    // handle broken image links
    const handleImageError = (e) => {
        e.target.src = '/sorry-image-not-available.jpg';
    };

    // handle note deletion
    const handleDeleteNote = (noteId) => {
        dispatch(thunkDeleteNote(noteId)).then(() => {
            closeModal();
            navigate(`/client/${user.id}/notes`);
        });
    };

    // delete confirmation modal
    const DeleteNoteConfirmationModal = ({ noteId }) => {
        return (
            <div className='delete-modal'>
                <p>Are you sure you want to delete this note?</p>
                <div className='modal-buttons'>
                    <button className='delete-confirmation-button' onClick={() => handleDeleteNote(noteId)}>Confirm Delete</button>
                    <button className='delete-cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        );
    };

    return isLoaded && note ? (
        <div className='note-details-container'>
            <h1>{note.title}</h1>
            <div className='note-action-buttons'>
                <Link to={`/client/${user.id}/note/edit/${noteId}`}>
                    <button>Edit Note</button>
                </Link>
                <OpenModalButton
                    modalComponent={<DeleteNoteConfirmationModal noteId={noteId} />}
                    buttonText="Delete Note"
                />
            </div>
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
        <Loader />
    )
};

export default NoteDetailsPage;
