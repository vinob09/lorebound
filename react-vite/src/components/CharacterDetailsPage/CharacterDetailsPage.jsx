import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { thunkGetCharacterById, thunkDeleteCharacter } from '../../redux/characterSheets';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import 'react-quill/dist/quill.snow.css';
import './CharacterDetailsPage.css';

const CharacterDetailsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { characterId } = useParams();
    const { closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const character = useSelector(state => state.characters.character);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (characterId) {
            dispatch(thunkGetCharacterById(characterId)).then(() => setIsLoaded(true));
        }
    }, [dispatch, characterId]);

    // handle broken image links
    const handleImageError = (e) => {
        e.target.src = '/sorry-image-not-available.jpg';
    };

    // helper func to display null fields
    const displayValue = (value) => {
        return value ? value : 'None';
    };

    // helper function to render bonds
    const renderBonds = (bonds, bondsScore) => {
        if (!bonds || !bonds.length) {
            return <p>No bonds available</p>;
        }

        return (
            <ul>
                {bonds.map((bond, index) => (
                    <li key={index}>
                        {bond} - Score: {bondsScore && bondsScore[index] ? bondsScore[index] : 'N/A'}
                    </li>
                ))}
            </ul>
        );
    };

    // handle character deletion
    const handleDeleteCharacter = (characterId) => {
        dispatch(thunkDeleteCharacter(characterId)).then(() => {
            closeModal();
            navigate(`/client/${user.id}/characters`);
        });
    };

    // delete confirmation modal
    const DeleteCharacterConfirmationModal = ({ characterId }) => {
        return (
            <div>
                <p>Are you sure you want to delete this character?</p>
                <button onClick={() => handleDeleteCharacter(characterId)}>Confirm Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        );
    };

    return isLoaded && character ? (
        <div className='character-details-container'>
            <h1>{character.characterName}</h1>
            <div className='character-action-buttons'>
                <Link to={`/client/${user.id}/character/edit/${characterId}`}>
                    <button>Edit Character</button>
                </Link>
                <OpenModalButton
                    modalComponent={<DeleteCharacterConfirmationModal characterId={characterId} />}
                    buttonText="Delete Character"
                />
            </div>
            <div className='character-details-image'>
                <img
                    src={character.url ? character.url : '/sorry-image-not-available.jpg'}
                    alt={character.characterName}
                    onError={handleImageError}
                />
            </div>
            {character.deltaGreenCharacter && (
                <div className='delta-green-character-details'>
                    <h2>Delta Green Details</h2>
                    <p>Profession: {displayValue(character.deltaGreenCharacter.profession)}</p>
                    <p>Employer: {displayValue(character.deltaGreenCharacter.employer)}</p>
                    <p>Nationality: {displayValue(character.deltaGreenCharacter.nationality)}</p>
                    <p>Sex: {displayValue(character.deltaGreenCharacter.sex)}</p>
                    <p>Age & DOB: {displayValue(character.deltaGreenCharacter.ageDOB)}</p>
                    <p>Education or Occupation: {displayValue(character.deltaGreenCharacter.educationOccupation)}</p>
                    <p>Personal Details & Notes: {displayValue(character.deltaGreenCharacter.personalDetailsNotes)}</p>
                    <div className='character-bonds'>
                        <h3>Bonds</h3>
                        {renderBonds(character.deltaGreenCharacter.bonds, character.deltaGreenCharacter.bondsScore)}
                    </div>
                </div>
            )}
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default CharacterDetailsPage;
