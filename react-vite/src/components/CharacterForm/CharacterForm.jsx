import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    thunkCreateCharacter,
    thunkGetAllSkills,
    thunkGetAllGames,
    thunkGetCharacterById,
    thunkUpdateCharacter,
    thunkGetCharacterSkills,
    thunkGetCharacterWeapons
} from '../../redux/characterSheets';
import Loader from '../Loader/Loader';
import './CharacterForm.css';

const CharacterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { characterId } = useParams();

    const user = useSelector(state => state.session.user);
    const character = useSelector(state => state.characters.character);

    // General
    const [skills, setSkills] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    // General Character Fields
    const [characterName, setCharacterName] = useState('');
    const [file, setFile] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    // Delta Green Specific Fields
    const [profession, setProfession] = useState('');
    const [employer, setEmployer] = useState('');
    const [nationality, setNationality] = useState('');
    const [sex, setSex] = useState('');
    const [ageDOB, setAgeDOB] = useState('');
    const [educationOccupationHistory, setEducationOccupationHistory] = useState('');

    // Stats
    const [strengthScore, setStrengthScore] = useState('');
    const [strengthx5, setStrengthx5] = useState('');
    const [strengthFeatures, setStrengthFeatures] = useState('');

    const [constitutionScore, setConstitutionScore] = useState('');
    const [constitutionx5, setConstitutionx5] = useState('');
    const [constitutionFeatures, setConstitutionFeatures] = useState('');

    const [dexterityScore, setDexterityScore] = useState('');
    const [dexterityx5, setDexterityx5] = useState('');
    const [dexterityFeatures, setDexterityFeatures] = useState('');

    const [intelligenceScore, setIntelligenceScore] = useState('');
    const [intelligencex5, setIntelligencex5] = useState('');
    const [intelligenceFeatures, setIntelligenceFeatures] = useState('');

    const [powerScore, setPowerScore] = useState('');
    const [powerx5, setPowerx5] = useState('');
    const [powerFeatures, setPowerFeatures] = useState('');

    const [charismaScore, setCharismaScore] = useState('');
    const [charismax5, setCharismax5] = useState('');
    const [charismaFeatures, setCharismaFeatures] = useState('');

    // Derived Attributes
    const [hitPointsMax, setHitPointsMax] = useState('');
    const [hitPointsCurrent, setHitPointsCurrent] = useState('');
    const [willpowerMax, setWillpowerMax] = useState('');
    const [willpowerCurrent, setWillpowerCurrent] = useState('');
    const [sanityMax, setSanityMax] = useState('');
    const [sanityCurrent, setSanityCurrent] = useState('');
    const [breakingPointMax, setBreakingPointMax] = useState('');
    const [breakingPointCurrent, setBreakingPointCurrent] = useState('');

    // Additional Fields
    const [bonds, setBonds] = useState([""]);
    const [bondsScore, setBondsScore] = useState([""]);
    const [physicalDescription, setPhysicalDescription] = useState("");
    const [motivationsMentalDisorders, setMotivationsMentalDisorders] = useState("");
    const [incidentsViolence, setIncidentsViolence] = useState(0);
    const [incidentsHelplessness, setIncidentsHelplessness] = useState(0);
    const [armorGear, setArmorGear] = useState('');
    const [woundsAilments, setWoundsAilments] = useState('');
    const [personalDetails, setPersonalDetails] = useState('');
    const [developments, setDevelopments] = useState('');
    const [specialTraining, setSpecialTraining] = useState('');
    const [skillStatUsed, setSkillStatUsed] = useState("");

    // Weapons
    const [weapons, setWeapons] = useState([]);
    const [deletedWeapons, setDeletedWeapons] = useState([]);

    // check for editing or creating and mount all skills
    useEffect(() => {
        if (characterId) {
            // Fetch the character data for editing
            dispatch(thunkGetCharacterById(characterId)).then((characterData) => {
                // Prepopulate the form fields with character data
                setCharacterName(characterData.characterName);
                setWeapons(characterData.weapons || []);
                // check for existing weapons
                dispatch(thunkGetCharacterWeapons(characterId)).then((weaponsData) => {
                    setWeapons(weaponsData);
                })
                // check for existing skills
                dispatch(thunkGetCharacterSkills(characterId)).then((skillsData) => {
                    const populatedSkills = skillsData.map(skill => ({
                        skillId: skill.skillId,
                        name: skill.name || '',
                        baseValue: skill.baseValue,
                        skillLevel: skill.skillLevel
                    }));
                    setSkills(populatedSkills);
                });
                setProfession(characterData.deltaGreenCharacter.profession);
                setEmployer(characterData.deltaGreenCharacter.employer);
                setNationality(characterData.deltaGreenCharacter.nationality);
                setSex(characterData.deltaGreenCharacter.sex);
                setAgeDOB(characterData.deltaGreenCharacter.ageDOB);
                setEducationOccupationHistory(characterData.deltaGreenCharacter.educationOccupation);
                setStrengthScore(characterData.deltaGreenCharacter.strengthScore);
                setStrengthx5(characterData.deltaGreenCharacter.strengthx5);
                setStrengthFeatures(characterData.deltaGreenCharacter.strengthFeatures);
                setConstitutionScore(characterData.deltaGreenCharacter.constitutionScore);
                setConstitutionx5(characterData.deltaGreenCharacter.constitutionx5);
                setConstitutionFeatures(characterData.deltaGreenCharacter.constitutionFeatures);
                setDexterityScore(characterData.deltaGreenCharacter.dexterityScore);
                setDexterityx5(characterData.deltaGreenCharacter.dexterityx5);
                setDexterityFeatures(characterData.deltaGreenCharacter.dexterityFeatures);
                setIntelligenceScore(characterData.deltaGreenCharacter.intelligenceScore);
                setIntelligencex5(characterData.deltaGreenCharacter.intelligencex5);
                setIntelligenceFeatures(characterData.deltaGreenCharacter.intelligenceFeatures);
                setPowerScore(characterData.deltaGreenCharacter.powerScore);
                setPowerx5(characterData.deltaGreenCharacter.powerx5);
                setPowerFeatures(characterData.deltaGreenCharacter.powerFeatures);
                setCharismaScore(characterData.deltaGreenCharacter.charismaScore);
                setCharismax5(characterData.deltaGreenCharacter.charismax5);
                setCharismaFeatures(characterData.deltaGreenCharacter.charismaFeatures);
                setHitPointsMax(characterData.deltaGreenCharacter.hitPointsMaximum);
                setHitPointsCurrent(characterData.deltaGreenCharacter.hitPointsCurrent);
                setWillpowerMax(characterData.deltaGreenCharacter.willpowerPointsMaximum);
                setWillpowerCurrent(characterData.deltaGreenCharacter.willpowerPointsCurrent);
                setSanityMax(characterData.deltaGreenCharacter.sanityPointsMaximum);
                setSanityCurrent(characterData.deltaGreenCharacter.sanityPointsCurrent);
                setBreakingPointMax(characterData.deltaGreenCharacter.breakingPointMaximum);
                setBreakingPointCurrent(characterData.deltaGreenCharacter.breakingPointCurrent);
                setBonds(characterData.deltaGreenCharacter.bonds || []);
                setBondsScore(characterData.deltaGreenCharacter.bondsScore || []);
                setPhysicalDescription(characterData.deltaGreenCharacter.physicalDescription);
                setMotivationsMentalDisorders(characterData.deltaGreenCharacter.motivationsMentalDisorders);
                setIncidentsViolence(characterData.deltaGreenCharacter.incidentsViolence);
                setIncidentsHelplessness(characterData.deltaGreenCharacter.incidentsHelplessness);
                setArmorGear(characterData.deltaGreenCharacter.armorGear);
                setWoundsAilments(characterData.deltaGreenCharacter.woundsAilments);
                setPersonalDetails(characterData.deltaGreenCharacter.personalDetailsNotes);
                setDevelopments(characterData.deltaGreenCharacter.developmentHomeFamily);
                setSpecialTraining(characterData.deltaGreenCharacter.specialTraining);
                setSkillStatUsed(characterData.deltaGreenCharacter.skillStatUsed);
                setIsLoaded(true);
            });
        } else {
            // Load skills and set loaded to true when creating a new character
            Promise.all([
                dispatch(thunkGetAllSkills()),
                dispatch(thunkGetAllGames())
            ]).then(([fetchedSkills]) => {
                const initialSkills = fetchedSkills.map(skill => ({
                    skillId: skill.id,
                    name: skill.name,
                    baseValue: skill.baseValue,
                    skillLevel: skill.baseValue
                }));
                setSkills(initialSkills);
                setIsLoaded(true);
            });
        }
    }, [dispatch, characterId]);


    // Handle skill level change
    const handleSkillLevelChange = (skillId, newLevel) => {
        setSkills(skills.map(skill =>
            skill.skillId === skillId ? { ...skill, skillLevel: newLevel } : skill
        ));
    };

    // Handle adding weapon
    const handleAddWeapon = () => {
        setWeapons([...weapons, {
            name: '',
            skillPercentage: 0,
            baseRange: '',
            damage: '',
            armorPiercing: 0,
            lethality: 0,
            killRadius: '',
            ammo: 0,
            toDelete: false
        }]);
    };

    // Handle deleting weapon
    const handleWeaponDelete = (weaponId) => {
        const weaponToDelete = weapons.find(weapon => weapon.id === weaponId);
        if (weaponToDelete) {
            setDeletedWeapons([...deletedWeapons, weaponToDelete]);
            setWeapons(weapons.filter(weapon => weapon.id !== weaponId));
        }
    };

    const handleNumericInput = (value) => {
        return value === '' ? 0 : parseInt(value, 10);
    };

    const handleWeaponChange = (index, key, value) => {
        const updatedWeapons = [...weapons];
        if (['skillPercentage', 'lethality', 'ammo'].includes(key)) {
            updatedWeapons[index][key] = value === '' ? 0 : parseInt(value, 10);
        } else {
            updatedWeapons[index][key] = value;
        }
        setWeapons(updatedWeapons);
    };

    // Handle adding new bond
    const handleAddBond = () => {
        setBonds([...bonds, '']);
        setBondsScore([...bondsScore, '']);
    };

    // Handle bond change
    const handleBondChange = (index, value) => {
        const newBonds = [...bonds];
        newBonds[index] = value;
        setBonds(newBonds);
    };

    // Handle bond score change
    const handleBondScoreChange = (index, value) => {
        const newBondsScores = [...bondsScore];
        newBondsScores[index] = parseInt(value, 10);
        setBondsScore(newBondsScores);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoaded(false);
        const formData = new FormData();

        formData.append('game_id', 1);
        formData.append('character_name', characterName);
        if (file) formData.append('url', file);
        if (removeImage) formData.append('removeImage', 'true');
        setImageLoading(true);

        formData.append('skills', JSON.stringify(skills.map(skill => ({
            skillId: skill.skillId,
            skillLevel: skill.skillLevel
        }))));

        formData.append('weapons', JSON.stringify(weapons.map(weapon => ({
            id: weapon.id,
            name: weapon.name,
            skillPercentage: weapon.skillPercentage,
            baseRange: weapon.baseRange,
            damage: weapon.damage,
            armorPiercing: weapon.armorPiercing,
            lethality: weapon.lethality,
            killRadius: weapon.killRadius,
            ammo: weapon.ammo
        }))));
        formData.append('deletedWeapons', JSON.stringify(deletedWeapons.map(weapon => ({
            id: weapon.id
        }))));

        formData.append('sex', sex);
        formData.append('profession', profession);
        formData.append('employer', employer);
        formData.append('nationality', nationality);
        formData.append('age_dob', ageDOB);
        formData.append('education_occupation_history', educationOccupationHistory);

        formData.append('strength_score', handleNumericInput(strengthScore));
        formData.append('strength_x5', handleNumericInput(strengthx5));
        formData.append('strength_features', strengthFeatures);
        formData.append('constitution_score', handleNumericInput(constitutionScore));
        formData.append('constitution_x5', handleNumericInput(constitutionx5));
        formData.append('constitution_features', constitutionFeatures);
        formData.append('dexterity_score', handleNumericInput(dexterityScore));
        formData.append('dexterity_x5', handleNumericInput(dexterityx5));
        formData.append('dexterity_features', dexterityFeatures);
        formData.append('intelligence_score', handleNumericInput(intelligenceScore));
        formData.append('intelligence_x5', handleNumericInput(intelligencex5));
        formData.append('intelligence_features', intelligenceFeatures);
        formData.append('power_score', handleNumericInput(powerScore));
        formData.append('power_x5', handleNumericInput(powerx5));
        formData.append('power_features', powerFeatures);
        formData.append('charisma_score', handleNumericInput(charismaScore));
        formData.append('charisma_x5', handleNumericInput(charismax5));
        formData.append('charisma_features', charismaFeatures);

        formData.append('hit_points_maximum', handleNumericInput(hitPointsMax));
        formData.append('hit_points_current', handleNumericInput(hitPointsCurrent));
        formData.append('willpower_points_maximum', handleNumericInput(willpowerMax));
        formData.append('willpower_points_current', handleNumericInput(willpowerCurrent));
        formData.append('sanity_points_maximum', handleNumericInput(sanityMax));
        formData.append('sanity_points_current', handleNumericInput(sanityCurrent));
        formData.append('breaking_point_maximum', handleNumericInput(breakingPointMax));
        formData.append('breaking_point_current', handleNumericInput(breakingPointCurrent));

        formData.append('incidents_violence', incidentsViolence);
        formData.append('incidents_helplessness', incidentsHelplessness);
        formData.append('armor_gear', armorGear);
        formData.append('wounds_ailments', woundsAilments);
        formData.append('personal_details_notes', personalDetails);
        formData.append('developments_home_family', developments);
        formData.append('special_training', specialTraining);
        formData.append('bonds', JSON.stringify(bonds));
        formData.append('bonds_score', JSON.stringify(bondsScore));
        formData.append('physical_description', physicalDescription);
        formData.append('motivations_mental_disorders', motivationsMentalDisorders);
        formData.append('skill_stat_used', skillStatUsed);

        // creating character
        if (!characterId) {
            const result = await dispatch(thunkCreateCharacter(formData));

            if (!result.error) {
                navigate(`/client/${user.id}/characters/${result.id}`);
            } else {
                setErrors(result.error);
                setIsLoaded(true);
            }
        } else {
            // editing character
            const result = await dispatch(thunkUpdateCharacter(characterId, formData));

            if (!result.error) {
                navigate(`/client/${user.id}/characters/${characterId}`);
            } else {
                setErrors(result.error);
                setIsLoaded(true); 
            }
        }
        setImageLoading(false);
    };

    // handle cancel editing or creating
    const handleCancel = () => {
        navigate(`/client/${user.id}/characters`);
    };

    const handleViolenceCheckboxChange = (e) => {
        const updatedValue = incidentsViolence;
        if (e.target.checked) {
            setIncidentsViolence(Math.min(updatedValue + 1, 3));
        } else {
            setIncidentsViolence(Math.max(updatedValue - 1, 0));
        }
    };

    const handleHelplessnessCheckboxChange = (e) => {
        const updatedValue = incidentsHelplessness;
        if (e.target.checked) {
            setIncidentsHelplessness(Math.min(updatedValue + 1, 3));
        } else {
            setIncidentsHelplessness(Math.max(updatedValue - 1, 0));
        }
    };

    // Form Rendering
    return isLoaded ? (
        <div className="character-form-wrapper">
            <h1>{characterId ? 'Edit Character' : 'Create Character'}</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className='section personal-data'>
                    <h2>Personal Data</h2>
                    {/* Character Name */}
                    <div className="form-group">
                        <label htmlFor="characterName">Character Name</label>
                        <input
                            type="text"
                            id="characterName"
                            name="characterName"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            required
                            disabled={!!characterId}
                        />
                        {errors.characterName && <p className="error-message">{errors.characterName}</p>}
                    </div>
                    {/* Image loading */}
                    <div className="form-group">
                        <label htmlFor="url">Image File</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {errors.url && <p className="error-message">{errors.url}</p>}
                    </div>
                    {/* Existing Image */}
                    {characterId && character?.url && (
                        <div className="form-group image-removal">
                            <label htmlFor="removeImage">Remove existing image</label>
                            <input
                                type="checkbox"
                                id="removeImage"
                                checked={removeImage}
                                onChange={(e) => setRemoveImage(e.target.checked)}
                            />
                        </div>
                    )}
                    {/* Profession */}
                    <div className="form-group">
                        <label htmlFor="profession">Profession</label>
                        <input
                            type="text"
                            id="profession"
                            name="profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        />
                    </div>
                    {/* Sex */}
                    <div className="form-group">
                        <label>Sex</label>
                        <select value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value="">Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        {errors.sex && <p className="error-message">{errors.sex}</p>}
                    </div>
                    {/* Employer */}
                    <div className="form-group">
                        <label htmlFor="employer">Employer</label>
                        <input
                            type="text"
                            id="employer"
                            name="employer"
                            value={employer}
                            onChange={(e) => setEmployer(e.target.value)}
                        />
                        {errors.employer && <p className="error-message">{errors.employer}</p>}
                    </div>
                    {/* Nationality */}
                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                        {errors.nationality && <p className="error-message">{errors.nationality}</p>}
                    </div>
                    {/* Age and DOB */}
                    <div className="form-group">
                        <label htmlFor="age_dob">Age and DOB</label>
                        <input
                            type="text"
                            id="age_dob"
                            name="ageDOB"
                            value={ageDOB}
                            onChange={(e) => setAgeDOB(e.target.value)}
                        />
                        {errors.age_dob && <p className="error-message">{errors.age_dob}</p>}
                    </div>
                    {/* Education and Occupational History */}
                    <div className="form-group">
                        <label htmlFor="education_occupation_history">Education and Occupational History</label>
                        <textarea
                            id="education_occupation_history"
                            name="educationOccupationHistory"
                            value={educationOccupationHistory}
                            onChange={(e) => setEducationOccupationHistory(e.target.value)}
                        />
                        {errors.education_occupation_history && <p className="error-message">{errors.education_occupation_history}</p>}
                    </div>
                    {/* Physical Description */}
                    <div className="form-group">
                        <label htmlFor="physical_description">Physical Description</label>
                        <textarea
                            id="physical_description"
                            value={physicalDescription}
                            name="physicalDescription"
                            onChange={(e) => setPhysicalDescription(e.target.value)}
                        />
                        {errors.physical_description && <p className="error-message">{errors.physical_description}</p>}
                    </div>
                </div>

                <div className='section stats'>
                    <h2>Statistics</h2>
                    {/* Strength */}
                    <div className="form-group">
                        <label htmlFor="strength_score">Strength</label>
                        <input
                            type="number"
                            id="strength_score"
                            name="strengthScore"
                            value={strengthScore}
                            onChange={(e) => setStrengthScore(e.target.value)}
                        />
                        {errors.strength_score && <p className="error-message">{errors.strength_score}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="strength_x5">Strength x5</label>
                        <input
                            type="number"
                            id="strength_x5"
                            name="strengthx5"
                            value={strengthx5}
                            onChange={(e) => setStrengthx5(e.target.value)}
                        />
                        {errors.strength_x5 && <p className="error-message">{errors.strength_x5}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="strength_features">Strength Features</label>
                        <input
                            type="text"
                            id="strength_features"
                            name="strengthFeatures"
                            value={strengthFeatures}
                            onChange={(e) => setStrengthFeatures(e.target.value)}
                        />
                        {errors.strength_features && <p className="error-message">{errors.strength_features}</p>}
                    </div>
                    {/* Constitution */}
                    <div className="form-group">
                        <label htmlFor="constitution_score">Constitution</label>
                        <input
                            type="number"
                            id="constitution_score"
                            name="constitutionScore"
                            value={constitutionScore}
                            onChange={(e) => setConstitutionScore(e.target.value)}
                        />
                        {errors.constitution_score && <p className="error-message">{errors.constitution_score}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="constitution_x5">Constitution x5</label>
                        <input
                            type="number"
                            id="constitution_x5"
                            name="constitutionx5"
                            value={constitutionx5}
                            onChange={(e) => setConstitutionx5(e.target.value)}
                        />
                        {errors.constitution_x5 && <p className="error-message">{errors.constitution_x5}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="constitution_features">Constitution Features</label>
                        <input
                            type="text"
                            id="constitution_features"
                            name="constitutionFeatures"
                            value={constitutionFeatures}
                            onChange={(e) => setConstitutionFeatures(e.target.value)}
                        />
                        {errors.constitution_features && <p className="error-message">{errors.constitution_features}</p>}
                    </div>
                    {/* Dexterity */}
                    <div className="form-group">
                        <label htmlFor="dexterity_score">Dexterity</label>
                        <input
                            type="number"
                            id="dexterity_score"
                            name="dexterityScore"
                            value={dexterityScore}
                            onChange={(e) => setDexterityScore(e.target.value)}
                        />
                        {errors.dexterity_score && <p className="error-message">{errors.dexterity_score}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dexterity_x5">Dexterity x5</label>
                        <input
                            type="number"
                            id="dexterity_x5"
                            name="dexterityx5"
                            value={dexterityx5}
                            onChange={(e) => setDexterityx5(e.target.value)}
                        />
                        {errors.dexterity_x5 && <p className="error-message">{errors.dexterity_x5}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dexterity_features">Dexterity Features</label>
                        <input
                            type="text"
                            id="dexterity_features"
                            name="dexterityFeatures"
                            value={dexterityFeatures}
                            onChange={(e) => setDexterityFeatures(e.target.value)}
                        />
                        {errors.dexterity_features && <p className="error-message">{errors.dexterity_features}</p>}
                    </div>
                    {/* Intelligence */}
                    <div className="form-group">
                        <label htmlFor="intelligence_score">Intelligence</label>
                        <input
                            type="number"
                            id="intelligence_score"
                            name="intelligenceScore"
                            value={intelligenceScore}
                            onChange={(e) => setIntelligenceScore(e.target.value)}
                        />
                        {errors.intelligence_score && <p className="error-message">{errors.intelligence_score}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="intelligence_x5">Intelligence x5</label>
                        <input
                            type="number"
                            id="intelligence_x5"
                            name="intelligencex5"
                            value={intelligencex5}
                            onChange={(e) => setIntelligencex5(e.target.value)}
                        />
                        {errors.intelligence_x5 && <p className="error-message">{errors.intelligence_x5}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="intelligence_features">Intelligence Features</label>
                        <input
                            type="text"
                            id="intelligence_features"
                            name="intelligenceFeatures"
                            value={intelligenceFeatures}
                            onChange={(e) => setIntelligenceFeatures(e.target.value)}
                        />
                        {errors.intelligence_features && <p className="error-message">{errors.intelligence_features}</p>}
                    </div>
                    {/* Power */}
                    <div className="form-group">
                        <label htmlFor="power_score">Power</label>
                        <input
                            type="number"
                            id="power_score"
                            name="powerScore"
                            value={powerScore}
                            onChange={(e) => setPowerScore(e.target.value)}
                        />
                        {errors.power_score && <p className="error-message">{errors.power_score}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="power_x5">Power x5</label>
                        <input
                            type="number"
                            id="power_x5"
                            name="powerx5"
                            value={powerx5}
                            onChange={(e) => setPowerx5(e.target.value)}
                        />
                        {errors.power_x5 && <p className="error-message">{errors.power_x5}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="power_features">Power Features</label>
                        <input
                            type="text"
                            id="power_features"
                            name="powerFeatures"
                            value={powerFeatures}
                            onChange={(e) => setPowerFeatures(e.target.value)}
                        />
                        {errors.power_features && <p className="error-message">{errors.power_features}</p>}
                    </div>
                    {/* Charisma */}
                    <div className="form-group">
                        <label htmlFor="charisma_score">Charisma</label>
                        <input
                            type="number"
                            id="charisma_score"
                            name="charismaScore"
                            value={charismaScore}
                            onChange={(e) => setCharismaScore(e.target.value)}
                        />
                        {errors.charisma_score && <p className="error-message">{errors.charisma_score}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="charisma_x5">Charisma x5</label>
                        <input
                            type="number"
                            id="charisma_x5"
                            name="charismax5"
                            value={charismax5}
                            onChange={(e) => setCharismax5(e.target.value)}
                        />
                        {errors.charisma_x5 && <p className="error-message">{errors.charisma_x5}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="charisma_features">Charisma Features</label>
                        <input
                            type="text"
                            id="charisma_features"
                            name="charismaFeatures"
                            value={charismaFeatures}
                            onChange={(e) => setCharismaFeatures(e.target.value)}
                        />
                        {errors.charisma_features && <p className="error-message">{errors.charisma_features}</p>}
                    </div>
                </div>

                <div className='section derived-attributes'>
                    <h2>Derived Attributes</h2>
                    {/* Hit Points */}
                    <div className="form-group">
                        <label htmlFor="hit_points_maximum">Hit Points Maximum</label>
                        <input
                            type="number"
                            id="hit_points_maximum"
                            name="hitPointsMaximum"
                            value={hitPointsMax}
                            onChange={(e) => setHitPointsMax(e.target.value)}
                        />
                        {errors.hit_points_maximum && <p className="error-message">{errors.hit_points_maximum}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="hit_points_current">Hit Points Current</label>
                        <input
                            type="number"
                            id="hit_points_current"
                            name="hitPointsCurrent"
                            value={hitPointsCurrent}
                            onChange={(e) => setHitPointsCurrent(e.target.value)}
                        />
                        {errors.hit_points_current && <p className="error-message">{errors.hit_points_current}</p>}
                    </div>
                    {/* Willpower */}
                    <div className="form-group">
                        <label htmlFor="willpower_points_maximum">Willpower Points Maximum</label>
                        <input
                            type="number"
                            id="willpower_points_maximum"
                            name="willpowerPointsMaximum"
                            value={willpowerMax}
                            onChange={(e) => setWillpowerMax(e.target.value)}
                        />
                        {errors.willpower_points_maximum && <p className="error-message">{errors.willpower_points_maximum}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="willpower_points_current">Willpower Points Current</label>
                        <input
                            type="number"
                            id="willpower_points_current"
                            name="willpowerPointsCurrent"
                            value={willpowerCurrent}
                            onChange={(e) => setWillpowerCurrent(e.target.value)}
                        />
                        {errors.willpower_points_current && <p className="error-message">{errors.willpower_points_current}</p>}
                    </div>
                    {/* Sanity */}
                    <div className="form-group">
                        <label htmlFor="sanity_points_maximum">Sanity Points Maximum</label>
                        <input
                            type="number"
                            id="sanity_points_maximum"
                            name="sanityPointsMaximum"
                            value={sanityMax}
                            onChange={(e) => setSanityMax(e.target.value)}
                        />
                        {errors.sanity_points_maximum && <p className="error-message">{errors.sanity_points_maximum}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sanity_points_current">Sanity Points Current</label>
                        <input
                            type="number"
                            id="sanity_points_current"
                            name="sanityPointsCurrent"
                            value={sanityCurrent}
                            onChange={(e) => setSanityCurrent(e.target.value)}
                        />
                        {errors.sanity_points_current && <p className="error-message">{errors.sanity_points_current}</p>}
                    </div>
                    {/* Breaking Point */}
                    <div className="form-group">
                        <label htmlFor="breaking_point_maximum">Breaking Point Maximum</label>
                        <input
                            type="number"
                            id="breaking_point_maximum"
                            name="breakingPointMaximum"
                            value={breakingPointMax}
                            onChange={(e) => setBreakingPointMax(e.target.value)}
                        />
                        {errors.breaking_point_maximum && <p className="error-message">{errors.breaking_point_maximum}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="breaking_point_current">Breaking Point Current</label>
                        <input
                            type="number"
                            id="breaking_point_current"
                            name="breakingPointCurrent"
                            value={breakingPointCurrent}
                            onChange={(e) => setBreakingPointCurrent(e.target.value)}
                        />
                        {errors.breaking_point_current && <p className="error-message">{errors.breaking_point_current}</p>}
                    </div>
                </div>

                <div className='section bonds'>
                    <h2>Bonds</h2>
                    {/* Bonds Section */}
                    <div className="form-group bonds-grid">
                        {bonds.map((bond, index) => (
                            <div key={index} className='bond-entry'>
                                <input
                                    type="text"
                                    placeholder="Bond Name"
                                    name="bonds"
                                    value={bond}
                                    onChange={(e) => handleBondChange(index, e.target.value)}
                                />
                                <input
                                    type="number"
                                    name="bondsScore"
                                    placeholder="Bond Score"
                                    value={bondsScore[index]}
                                    onChange={(e) => handleBondScoreChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        <div className="add-bond-button">
                            <button type="button" onClick={handleAddBond}>Add Bond</button>
                        </div>
                    </div>
                </div>

                <div className='section skills'>
                    <h2>Skills</h2>
                    {/* Skills */}
                    <div>
                        <h3>Skills</h3>
                        {skills.length > 0 ? (
                            skills.map(skill => (
                                <div key={skill.skillId} className="skill-entry">
                                    <label>{skill.name} (Base: {skill.baseValue})</label>
                                    <input
                                        type="number"
                                        name="skillLevel"
                                        value={skill.skillLevel}
                                        onChange={(e) => handleSkillLevelChange(skill.skillId, e.target.value)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No skills available.</p>
                        )}
                    </div>
                </div>

                <div className='section psychological-data'>
                    <h2>Psychological Data</h2>
                    {/* Motivations and Mental Disorders */}
                    <div className="form-group">
                        <label htmlFor="motivations_mental_disorders">Motivations and Mental Disorders</label>
                        <textarea
                            id="motivations_mental_disorders"
                            name="motivationsMentalDisorders"
                            value={motivationsMentalDisorders}
                            onChange={(e) => setMotivationsMentalDisorders(e.target.value)}
                        />
                        {errors.motivations_mental_disorders && <p className="error-message">{errors.motivations_mental_disorders}</p>}
                    </div>
                </div>

                <div className='section sanity'>
                    <h2>Incidents</h2>
                    {/* Incidents of Sanity Loss - Violence */}
                    <div className="form-group">
                        <label>Incidents of Sanity Loss - Violence</label>
                        <div>
                            {[...Array(3)].map((_, index) => (
                                <input
                                    key={index}
                                    type="checkbox"
                                    checked={index < incidentsViolence}
                                    onChange={(e) => handleViolenceCheckboxChange(e)}
                                />
                            ))}
                        </div>
                        {errors.incidents_violence && <p className="error-message">{errors.incidents_violence}</p>}
                    </div>
                    {/* Incidents of Sanity Loss - Helplessness */}
                    <div className="form-group">
                        <label>Incidents of Sanity Loss - Helplessness</label>
                        <div>
                            {[...Array(3)].map((_, index) => (
                                <input
                                    key={index}
                                    type="checkbox"
                                    checked={index < incidentsHelplessness}
                                    onChange={(e) => handleHelplessnessCheckboxChange(e)}
                                />
                            ))}
                        </div>
                        {errors.incidents_helplessness && <p className="error-message">{errors.incidents_helplessness}</p>}
                    </div>
                </div>

                <div className='section equipment'>
                    <h2>Equipment</h2>
                    {/* Armor and Gear */}
                    <div className="form-group">
                        <label htmlFor="armor_gear">Armor and Gear</label>
                        <textarea
                            id="armor_gear"
                            value={armorGear}
                            name="armorGear"
                            onChange={(e) => setArmorGear(e.target.value)}
                        />
                        {errors.armor_gear && <p className="error-message">{errors.armor_gear}</p>}
                    </div>
                    {/* Wounds and Ailments */}
                    <div className="form-group">
                        <label htmlFor="wounds_ailments">Wounds and Ailments</label>
                        <textarea
                            id="wounds_ailments"
                            name="woundsAilments"
                            value={woundsAilments}
                            onChange={(e) => setWoundsAilments(e.target.value)}
                        />
                        {errors.wounds_ailments && <p className="error-message">{errors.wounds_ailments}</p>}
                    </div>
                </div>

                <div className='section personal-history'>
                    <h2>Personal History</h2>
                    {/* Personal Details */}
                    <div className="form-group">
                        <label htmlFor="personal_details_notes">Personal Details and Notes</label>
                        <textarea
                            id="personal_details_notes"
                            name="personalDetailsNotes"
                            value={personalDetails}
                            onChange={(e) => setPersonalDetails(e.target.value)}
                        />
                        {errors.personal_details_notes && <p className="error-message">{errors.personal_details_notes}</p>}
                    </div>
                    {/* Developments Which Affect Home and Family */}
                    <div className="form-group">
                        <label htmlFor="developments_home_family">Developments Which Affect Home and Family</label>
                        <textarea
                            id="developments_home_family"
                            name="developmentHomeFamily"
                            value={developments}
                            onChange={(e) => setDevelopments(e.target.value)}
                        />
                        {errors.developments_home_family && <p className="error-message">{errors.developments_home_family}</p>}
                    </div>
                </div>

                <div className='section training-abilities'>
                    <h2>Training and Abilities</h2>
                    {/* Special Training */}
                    <div className="form-group">
                        <label htmlFor="special_training">Special Training</label>
                        <textarea
                            id="special_training"
                            name="specialTraining"
                            value={specialTraining}
                            onChange={(e) => setSpecialTraining(e.target.value)}
                        />
                        {errors.special_training && <p className="error-message">{errors.special_training}</p>}
                    </div>
                    {/* Skill or Stat Used */}
                    <div className="form-group">
                        <label htmlFor="skill_stat_used">Skill or Stat Used</label>
                        <textarea
                            id="skill_stat_used"
                            name="skillStatUsed"
                            value={skillStatUsed}
                            onChange={(e) => setSkillStatUsed(e.target.value)}
                        />
                        {errors.skill_stat_used && <p className="error-message">{errors.skill_stat_used}</p>}
                    </div>
                </div>

                <div className='section weapons'>
                    <h2>Weapons</h2>
                    {/* Weapons */}
                    <div className="form-group">
                        {weapons && weapons.length > 0 ? (
                            weapons.map((weapon, index) => (
                                <div key={index} className="weapon-entry">
                                    <div className="column">
                                        <label>Weapon Name</label>
                                        <input
                                            type="text"
                                            placeholder="Weapon Name"
                                            name="name"
                                            value={weapon.name}
                                            onChange={(e) => handleWeaponChange(index, 'name', e.target.value)}
                                        />
                                        <label>Skill Percentage</label>
                                        <input
                                            type="number"
                                            placeholder="Skill Percentage"
                                            name="skillPercentage"
                                            value={weapon.skillPercentage}
                                            onChange={(e) => handleWeaponChange(index, 'skillPercentage', e.target.value)}
                                        />
                                        <label>Base Range</label>
                                        <input
                                            type="text"
                                            placeholder="Base Range"
                                            name="baseRange"
                                            value={weapon.baseRange}
                                            onChange={(e) => handleWeaponChange(index, 'baseRange', e.target.value)}
                                        />
                                        <label>Damage</label>
                                        <input
                                            type="text"
                                            placeholder="Damage"
                                            name="damage"
                                            value={weapon.damage}
                                            onChange={(e) => handleWeaponChange(index, 'damage', e.target.value)}
                                        />
                                    </div>
                                    <div className="column">

                                        <label>Armor Piercing</label>
                                        <input
                                            type="text"
                                            placeholder="Armor Piercing"
                                            name="armorPiercing"
                                            value={weapon.armorPiercing}
                                            onChange={(e) => handleWeaponChange(index, 'armorPiercing', e.target.value)}
                                        />
                                        <label>Lethality</label>
                                        <input
                                            type="number"
                                            placeholder="Lethality"
                                            name="lethality"
                                            value={weapon.lethality}
                                            onChange={(e) => handleWeaponChange(index, 'lethality', e.target.value)}
                                        />
                                        <label>Kill Radius</label>
                                        <input
                                            type="text"
                                            placeholder="Kill Radius"
                                            name="killRadius"
                                            value={weapon.killRadius}
                                            onChange={(e) => handleWeaponChange(index, 'killRadius', e.target.value)}
                                        />
                                        <label>Ammo</label>
                                        <input
                                            type="number"
                                            placeholder="Ammo"
                                            name="ammo"
                                            value={weapon.ammo}
                                            onChange={(e) => handleWeaponChange(index, 'ammo', e.target.value)}
                                        />
                                    </div>
                                    <div className="delete-button">
                                        <button
                                            type="button"
                                            onClick={() => handleWeaponDelete(weapon.id)}
                                        >
                                            Delete Weapon
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No weapons added.</p>
                        )}
                        <div className="add-weapon-button">
                            <button type="button" onClick={handleAddWeapon}>Add Weapon</button>
                        </div>
                    </div>
                </div>
                <div className="character-form-buttons">
                    <button type="submit" className="character-save-button">Save Character</button>
                    <button type="button" className="character-cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
                {imageLoading && <p>Loading...</p>}
            </form>
        </div>
    ) : (
        <Loader />
    )
};

export default CharacterForm;
