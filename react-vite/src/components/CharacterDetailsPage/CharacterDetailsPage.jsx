import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { thunkGetCharacterById, thunkDeleteCharacter, thunkExportCharacterPdf } from '../../redux/characterSheets';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import Loader from '../Loader/Loader';
import 'react-quill/dist/quill.snow.css';
import './CharacterDetailsPage.css';

const CharacterDetailsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { characterId } = useParams();
    const { closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const character = useSelector(state => state.characters.character);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (characterId) {
            dispatch(thunkGetCharacterById(characterId)).then(() => setIsLoaded(true));
        }
    }, [dispatch, characterId]);

    const handleExportPDF = async () => {
        setIsGenerating(true);
        await dispatch(thunkExportCharacterPdf(characterId));
        setIsGenerating(false);
    };

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

    // helper function to render skills
    const renderSkills = (skills) => {
        if (!skills || !skills.length) {
            return <p>No skills available</p>;
        }

        return (
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>
                        {skill.skillName} - {skill.skillLevel}%
                    </li>
                ))}
            </ul>
        );
    };

    // helper function to render weapons
    const renderWeapons = (weapons) => {
        if (!weapons || !weapons.length) {
            return <p>No weapons available</p>;
        }

        return (
            <ul>
                {weapons.map((weapon, index) => (
                    <li key={index}>
                        {weapon.name}
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
                <button onClick={handleExportPDF} disabled={isGenerating}>
                    {isGenerating ? 'Generating PDF' : 'Export PDF'}
                </button>
                {isGenerating && <div className="loading-spinner"></div>}
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
                    <p>Physical Description: {displayValue(character.deltaGreenCharacter.physicalDescription)}</p>
                    <p>Motivations & Mental Disorders: {displayValue(character.deltaGreenCharacter.motivationsMentalDisorders)}</p>
                    <p>Incidents - Violence: {displayValue(character.deltaGreenCharacter.incidentsViolence)}</p>
                    <p>Incidents - Helplessness: {displayValue(character.deltaGreenCharacter.incidentsHelplessness)}</p>
                    <p>Wounds & Ailments: {displayValue(character.deltaGreenCharacter.woundsAilments)}</p>
                    <p>Armor & Gear: {displayValue(character.deltaGreenCharacter.armorGear)}</p>
                    <p>Developments at Home & Family: {displayValue(character.deltaGreenCharacter.developmentHomeFamily)}</p>
                    <p>Special Training: {displayValue(character.deltaGreenCharacter.specialTraining)}</p>
                    <p>Skill/Stat Used: {displayValue(character.deltaGreenCharacter.skillStatUsed)}</p>
                    <div className='character-bonds'>
                        <h3>Bonds</h3>
                        {renderBonds(character.deltaGreenCharacter.bonds, character.deltaGreenCharacter.bondsScore)}
                    </div>
                    <div className='character-stats'>
                        <h3>Stats</h3>
                        <ul>
                            <li><p>Strength: {displayValue(character.deltaGreenCharacter.strengthx5)}, {displayValue(character.deltaGreenCharacter.strengthFeatures)}</p></li>
                            <li><p>Constitution: {displayValue(character.deltaGreenCharacter.constitutionx5)}, {displayValue(character.deltaGreenCharacter.constitutionFeatures)}</p></li>
                            <li><p>Dexterity: {displayValue(character.deltaGreenCharacter.dexterityx5)}, {displayValue(character.deltaGreenCharacter.dexterityFeatures)}</p></li>
                            <li><p>Intelligence: {displayValue(character.deltaGreenCharacter.intelligencex5)}, {displayValue(character.deltaGreenCharacter.intelligenceFeatures)}</p></li>
                            <li><p>Power: {displayValue(character.deltaGreenCharacter.powerx5)}, {displayValue(character.deltaGreenCharacter.powerFeatures)}</p></li>
                            <li><p>Charisma: {displayValue(character.deltaGreenCharacter.charismax5)}, {displayValue(character.deltaGreenCharacter.charismaFeatures)}</p></li>
                            <li><p>Hit Points Current: {displayValue(character.deltaGreenCharacter.hitPointsCurrent)}</p></li>
                            <li><p>Willpower Points Current: {displayValue(character.deltaGreenCharacter.willpowerPointsCurrent)}</p></li>
                            <li><p>Sanity Points Current: {displayValue(character.deltaGreenCharacter.sanityPointsCurrent)}</p></li>
                            <li><p>Breaking Point Current: {displayValue(character.deltaGreenCharacter.breakingPointCurrent)}</p></li>
                        </ul>
                    </div>
                    <div className='character-weapons'>
                        <h3>Weapons</h3>
                        {renderWeapons(character.weapons)}
                    </div>
                    <div className='character-skills'>
                        <h3>Skills</h3>
                        {renderSkills(character.skills)}
                    </div>
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
};

export default CharacterDetailsPage;
