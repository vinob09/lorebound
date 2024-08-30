import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteNote } from '../../redux/notes';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import 'react-quill/dist/quill.snow.css';
import './Tiles.css';

const Tiles = ({ items, type, onTileClick }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user);

    // handle broken image links
    const handleImageError = (e) => {
        e.target.src = '/sorry-image-not-available.jpg';
    };

    // handle click to delete note
    const handleDeleteNote = (noteId) => {
        dispatch(thunkDeleteNote(noteId)).then(() => {
            closeModal();
        })
    };

    // handle confirmation modal for delete note
    const DeleteNoteConfirmationModal = ({ noteId }) => {
        return (
            <div>
                <p>Are you sure you want to delete this note?</p>
                <button onClick={() => handleDeleteNote(noteId)}>Confirm Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        )
    };

    return (
        <div className='tiles-grid'>
            {items.map(item => (
                <div className='tile' key={item.id} onClick={() => onTileClick(item.id)}>
                    {type === 'note' ? (
                        <>
                            <img
                                src={item.url ? item.url : '/sorry-image-not-available.jpg'}
                                alt={item.title}
                                className='tile-image'
                                onError={handleImageError}
                            />
                            <div className='tile-content'>
                                <h2>{item.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: item.content ? item.content.substring(0, 100) : '' }}></p>
                                <div className='tile-footer'>
                                    <p><em>last updated at: {new Date(item.updatedAt).toLocaleString()}</em></p>
                                </div>
                                <div className='tile-buttons'>
                                    <Link to={`/client/${user.id}/note/edit/${item.id}`}>
                                        <button onClick={(e) => e.stopPropagation()}>Edit Note</button>
                                    </Link>
                                    <OpenModalButton
                                        modalComponent={<DeleteNoteConfirmationModal noteId={item.id} />}
                                        buttonText="Delete Note"
                                        onButtonClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        </>
                    ) : type === 'character' ? (
                        <>
                            <img
                                src={item.url ? item.url : '/sorry-image-not-available.jpg'}
                                alt={item.name}
                                className='tile-image'
                                onError={handleImageError}
                            />
                            <div className='tile-content'>
                                <h2>{item.name}</h2>
                                <p><em>Last updated at: {new Date(item.updatedAt).toLocaleString()}</em></p>
                            </div>
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    )
};

export default Tiles;
