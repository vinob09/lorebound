import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteNote } from '../../redux/notes';
import { thunkDeleteCharacter } from '../../redux/characterSheets';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import 'react-quill/dist/quill.snow.css';
import './Tiles.css';

const Tiles = ({ items, onTileClick, type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            <div className='delete-modal'>
                <p>Are you sure you want to delete this note?</p>
                <div className='modal-buttons'>
                    <button className='delete-confirmation-button' onClick={() => handleDeleteNote(noteId)}>Confirm Delete</button>
                    <button className='delete-cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        )
    };

    // handle click to delete character
    const handleDeleteCharacter = (characterId) => {
        dispatch(thunkDeleteCharacter(characterId)).then(() => {
            closeModal();
        })
    };

    // handle confirmation modal for delete character
    const DeleteCharacterConfirmationModal = ({ characterId }) => {
        return (
            <div className='delete-modal'>
                <p>Are you sure you want to delete this character?</p>
                <div className='modal-buttons'>
                    <button className='delete-confirmation-button' onClick={() => handleDeleteCharacter(characterId)}>Confirm Delete</button>
                    <button className='delete-cancel-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        )
    };

    // handle edits
    const handleEdit = (e, itemId) => {
        e.stopPropagation();
        if (type === 'note') {
            navigate(`/client/${user.id}/note/edit/${itemId}`);
        } else if (type === 'character') {
            navigate(`/client/${user.id}/character/edit/${itemId}`);
        }
    };

    return (
        <div className="tiles-grid">
            {items.map((item, index) => (
                <div className="tile"
                    key={`${type}-${item.id}-${index}`}
                    onClick={() => onTileClick(item.id)}
                >
                    {item.title ? (
                        <>
                            <img
                                src={item.url ? item.url : '/sorry-image-not-available.jpg'}
                                alt={item.title}
                                className="tile-image"
                                onError={handleImageError}
                            />
                            <div className="tile-content">
                                <h2>{item.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: item.content ? item.content.substring(0, 100) : '' }}></p>
                                <div className="tile-footer">
                                    <p><em>last updated at: {new Date(item.updatedAt).toLocaleString()}</em></p>
                                </div>
                                <div className="tile-buttons">
                                    <button onClick={(e) => handleEdit(e, item.id)}>
                                        Edit {type === 'note' ? 'Note' : 'Character'}
                                    </button>
                                    <OpenModalButton
                                        modalComponent={
                                            type === 'note'
                                                ? <DeleteNoteConfirmationModal noteId={item.id} />
                                                : <DeleteCharacterConfirmationModal characterId={item.id} />
                                        }
                                        buttonText={`Delete ${type === 'note' ? 'Note' : 'Character'}`}
                                        onButtonClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={item.url ? item.url : '/sorry-image-not-available.jpg'}
                                alt={item.characterName}
                                className="tile-image"
                                onError={handleImageError}
                            />
                            <div className="tile-content">
                                <h2>{item.characterName}</h2>
                                <div className="tile-footer">
                                    <p><em>last updated at: {new Date(item.updatedAt).toLocaleString()}</em></p>
                                </div>
                                <div className="tile-buttons">
                                    <button onClick={(e) => handleEdit(e, item.id)}>
                                        Edit {type === 'note' ? 'Note' : 'Character'}
                                    </button>
                                    <OpenModalButton
                                        modalComponent={
                                            type === 'note'
                                                ? <DeleteNoteConfirmationModal noteId={item.id} />
                                                : <DeleteCharacterConfirmationModal characterId={item.id} />
                                        }
                                        buttonText={`Delete ${type === 'note' ? 'Note' : 'Character'}`}
                                        onButtonClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Tiles;
