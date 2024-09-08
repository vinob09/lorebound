import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateCharacter, thunkGetAllSkills, thunkGetAllGames } from '../../redux/characterSheets';
import './CharacterForm.css';

const CharacterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    // const games = useSelector(state => state.characters.games);
    // const allSkills = useSelector(state => state.characters.allSkills);
    const [skills, setSkills] = useState([]);

    // General
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    // General Character Fields
    // const [gameId, setGameId] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [file, setFile] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // Delta Green Specific Fields
    const [profession, setProfession] = useState('');
    const [employer, setEmployer] = useState('');
    const [nationality, setNationality] = useState('');
    const [sex, setSex] = useState('');
    const [ageDOB, setAgeDOB] = useState('');
    const [educationOccupationHistory, setEducationOccupationHistory] = useState('');

    // Stats
    const [strengthScore, setStrengthScore] = useState(0);
    const [strengthx5, setStrengthx5] = useState(0);
    const [strengthFeatures, setStrengthFeatures] = useState('');

    const [constitutionScore, setConstitutionScore] = useState(0);
    const [constitutionx5, setConstitutionx5] = useState(0);
    const [constitutionFeatures, setConstitutionFeatures] = useState('');

    const [dexterityScore, setDexterityScore] = useState(0);
    const [dexterityx5, setDexterityx5] = useState(0);
    const [dexterityFeatures, setDexterityFeatures] = useState('');

    const [intelligenceScore, setIntelligenceScore] = useState(0);
    const [intelligencex5, setIntelligencex5] = useState(0);
    const [intelligenceFeatures, setIntelligenceFeatures] = useState('');

    const [powerScore, setPowerScore] = useState(0);
    const [powerx5, setPowerx5] = useState(0);
    const [powerFeatures, setPowerFeatures] = useState('');

    const [charismaScore, setCharismaScore] = useState(0);
    const [charismax5, setCharismax5] = useState(0);
    const [charismaFeatures, setCharismaFeatures] = useState('');

    // Derived Attributes
    const [hitPointsMax, setHitPointsMax] = useState(0);
    const [hitPointsCurrent, setHitPointsCurrent] = useState(0);
    const [willpowerMax, setWillpowerMax] = useState(0);
    const [willpowerCurrent, setWillpowerCurrent] = useState(0);
    const [sanityMax, setSanityMax] = useState(0);
    const [sanityCurrent, setSanityCurrent] = useState(0);
    const [breakingPointMax, setBreakingPointMax] = useState(0);
    const [breakingPointCurrent, setBreakingPointCurrent] = useState(0);

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
    const [newWeapon, setNewWeapon] = useState({
        name: '',
        skillPercentage: '',
        baseRange: '',
        damage: '',
        armorPiercing: '',
        lethality: '',
        killRadius: '',
        ammo: ''
    });

    // Load skills on mount
    useEffect(() => {
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

            // Set skills and mark component as loaded
            setSkills(initialSkills);
            setIsLoaded(true);
        });
    }, [dispatch]);

    // Handle skill level change
    const handleSkillLevelChange = (skillId, newLevel) => {
        setSkills(skills.map(skill =>
            skill.skillId === skillId ? { ...skill, skillLevel: newLevel } : skill
        ));
    };

    const handleAddWeapon = () => {
        setWeapons([...weapons, newWeapon]);
        setNewWeapon({
            name: '',
            skillPercentage: '',
            baseRange: '',
            damage: '',
            armorPiercing: '',
            lethality: '',
            killRadius: '',
            ammo: ''
        });
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

        const formData = new FormData();

        formData.append('game_id', 1);
        formData.append('character_name', characterName);
        if (file) formData.append('url', file);
        setImageLoading(true);

        formData.append('skills', JSON.stringify(skills.map(skill => ({
            skillId: skill.skillId,
            skillLevel: skill.skillLevel
        }))));

        formData.append('weapons', JSON.stringify(weapons));
        formData.append('sex', sex);
        formData.append('profession', profession);
        formData.append('employer', employer);
        formData.append('nationality', nationality);
        formData.append('age_dob', ageDOB);
        formData.append('education_occupation_history', educationOccupationHistory);

        formData.append('strength_score', strengthScore);
        formData.append('strength_x5', strengthx5);
        formData.append('strength_features', strengthFeatures);
        formData.append('constitution_score', constitutionScore);
        formData.append('constitution_x5', constitutionx5);
        formData.append('constitution_features', constitutionFeatures);
        formData.append('dexterity_score', dexterityScore);
        formData.append('dexterity_x5', dexterityx5);
        formData.append('dexterity_features', dexterityFeatures);
        formData.append('intelligence_score', intelligenceScore);
        formData.append('intelligence_x5', intelligencex5);
        formData.append('intelligence_features', intelligenceFeatures);
        formData.append('power_score', powerScore);
        formData.append('power_x5', powerx5);
        formData.append('power_features', powerFeatures);
        formData.append('charisma_score', charismaScore);
        formData.append('charisma_x5', charismax5);
        formData.append('charisma_features', charismaFeatures);

        formData.append('hit_points_maximum', hitPointsMax);
        formData.append('hit_points_current', hitPointsCurrent);
        formData.append('willpower_points_maximum', willpowerMax);
        formData.append('willpower_points_current', willpowerCurrent);
        formData.append('sanity_points_maximum', sanityMax);
        formData.append('sanity_points_current', sanityCurrent);
        formData.append('breaking_point_maximum', breakingPointMax);
        formData.append('breaking_point_current', breakingPointCurrent);

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

        const result = await dispatch(thunkCreateCharacter(formData));

        if (result.error) {
            setErrors(result.error);
        } else {
            navigate(`/client/${user.id}/characters/${result.id}`);
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
        <div className="character-form-container">
            <h1>Create New Delta Green Character</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                {/* Character Name */}
                <div className="form-group">
                    <label htmlFor="characterName">Character Name</label>
                    <input
                        type="text"
                        id="characterName"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                        required
                    />
                    {errors.characterName && <p className="error-message">{errors.characterName}</p>}
                </div>

                {/*Image loading*/}
                <div className="form-group">
                    <label htmlFor="url">Image File</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {errors.url && <p className="error-message">{errors.url}</p>}
                </div>

                {/* Profession */}
                <div className="form-group">
                    <label htmlFor="profession">Profession</label>
                    <input
                        type="text"
                        id="profession"
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
                        value={educationOccupationHistory}
                        onChange={(e) => setEducationOccupationHistory(e.target.value)}
                    />
                    {errors.education_occupation_history && <p className="error-message">{errors.education_occupation_history}</p>}
                </div>

                {/* Strength */}
                <div className="form-group">
                    <label htmlFor="strength_score">Strength</label>
                    <input
                        type="number"
                        id="strength_score"
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
                        value={charismaFeatures}
                        onChange={(e) => setCharismaFeatures(e.target.value)}
                    />
                    {errors.charisma_features && <p className="error-message">{errors.charisma_features}</p>}
                </div>

                {/* Hit Points */}
                <div className="form-group">
                    <label htmlFor="hit_points_maximum">Hit Points Maximum</label>
                    <input
                        type="number"
                        id="hit_points_maximum"
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
                        value={breakingPointCurrent}
                        onChange={(e) => setBreakingPointCurrent(e.target.value)}
                    />
                    {errors.breaking_point_current && <p className="error-message">{errors.breaking_point_current}</p>}
                </div>

                {/* Bonds Section */}
                <div className="form-group">
                    <h3>Bonds</h3>
                    {bonds.map((bond, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Bond Name"
                                value={bond}
                                onChange={(e) => handleBondChange(index, e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Bond Score"
                                value={bondsScore[index]}
                                onChange={(e) => handleBondScoreChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddBond}>Add Bond</button>
                </div>

                {/* Skills */}
                <div>
                    <h3>Skills</h3>
                    {skills.map(skill => (
                        <div key={skill.skillId} className="skill-entry">
                            <label>{skill.name} (Base: {skill.baseValue})</label>
                            <input
                                type="number"
                                value={skill.skillLevel}
                                onChange={(e) => handleSkillLevelChange(skill.skillId, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                {/* Physical Description */}
                <div className="form-group">
                    <label htmlFor="physical_description">Physical Description</label>
                    <textarea
                        id="physical_description"
                        value={physicalDescription}
                        onChange={(e) => setPhysicalDescription(e.target.value)}
                    />
                    {errors.physical_description && <p className="error-message">{errors.physical_description}</p>}
                </div>

                {/* Motivations and Mental Disorders */}
                <div className="form-group">
                    <label htmlFor="motivations_mental_disorders">Motivations and Mental Disorders</label>
                    <textarea
                        id="motivations_mental_disorders"
                        value={motivationsMentalDisorders}
                        onChange={(e) => setMotivationsMentalDisorders(e.target.value)}
                    />
                    {errors.motivations_mental_disorders && <p className="error-message">{errors.motivations_mental_disorders}</p>}
                </div>

                {/* Incidents of Sanity Loss - Violence (Checkbox) */}
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

                {/* Incidents of Sanity Loss - Helplessness (Checkbox) */}
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

                {/* Armor and Gear */}
                <div className="form-group">
                    <label htmlFor="armor_gear">Armor and Gear</label>
                    <textarea
                        id="armor_gear"
                        value={armorGear}
                        onChange={(e) => setArmorGear(e.target.value)}
                    />
                    {errors.armor_gear && <p className="error-message">{errors.armor_gear}</p>}
                </div>

                {/* Wounds and Ailments */}
                <div className="form-group">
                    <label htmlFor="wounds_ailments">Wounds and Ailments</label>
                    <textarea
                        id="wounds_ailments"
                        value={woundsAilments}
                        onChange={(e) => setWoundsAilments(e.target.value)}
                    />
                    {errors.wounds_ailments && <p className="error-message">{errors.wounds_ailments}</p>}
                </div>

                {/* Personal Details */}
                <div className="form-group">
                    <label htmlFor="personal_details_notes">Personal Details and Notes</label>
                    <textarea
                        id="personal_details_notes"
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
                        value={developments}
                        onChange={(e) => setDevelopments(e.target.value)}
                    />
                    {errors.developments_home_family && <p className="error-message">{errors.developments_home_family}</p>}
                </div>

                {/* Special Training */}
                <div className="form-group">
                    <label htmlFor="special_training">Special Training</label>
                    <textarea
                        id="special_training"
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
                        value={skillStatUsed}
                        onChange={(e) => setSkillStatUsed(e.target.value)}
                    />
                    {errors.skill_stat_used && <p className="error-message">{errors.skill_stat_used}</p>}
                </div>

                {/* Weapons */}
                <div className="form-group">
                    <label htmlFor="weapons">Weapons</label>
                    <input
                        type="text"
                        placeholder="Weapon Name"
                        value={newWeapon.name}
                        onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Skill Percentage"
                        value={newWeapon.skillPercentage}
                        onChange={(e) => setNewWeapon({ ...newWeapon, skillPercentage: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Base Range"
                        value={newWeapon.baseRange}
                        onChange={(e) => setNewWeapon({ ...newWeapon, baseRange: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Damage"
                        value={newWeapon.damage}
                        onChange={(e) => setNewWeapon({ ...newWeapon, damage: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Armor Piercing"
                        value={newWeapon.armorPiercing}
                        onChange={(e) => setNewWeapon({ ...newWeapon, armorPiercing: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Lethality"
                        value={newWeapon.lethality}
                        onChange={(e) => setNewWeapon({ ...newWeapon, lethality: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Kill Radius"
                        value={newWeapon.killRadius}
                        onChange={(e) => setNewWeapon({ ...newWeapon, killRadius: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Ammo"
                        value={newWeapon.ammo}
                        onChange={(e) => setNewWeapon({ ...newWeapon, ammo: e.target.value })}
                    />
                    <button type="button" onClick={handleAddWeapon}>Add Weapon</button>

                    <ul>
                        {weapons.map((weapon, index) => (
                            <li key={index}>
                                {weapon.name} - <p>Skill Percentage</p>{weapon.skillPercentage}%
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit">Save Character</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                {imageLoading && <p>Loading...</p>}
            </form>
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default CharacterForm;
