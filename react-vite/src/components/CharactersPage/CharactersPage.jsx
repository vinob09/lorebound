import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkGetAllCharacters } from '../../redux/characterSheets';
import Tiles from '../Tiles';
import Loader from '../Loader/Loader';
import './CharactersPage.css';

const CharactersPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const characters = useSelector(state => state.characters.characters);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllCharacters()).then(() => setIsLoaded(true));
    }, [dispatch]);

    // sort notes by newest first
    const sortedCharacters = characters.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // handle tiles click into details
    const handleClick = (characterId) => {
        if (user && user.id) {
            navigate(`/client/${user.id}/characters/${characterId}`);
        }
    };

    // handle creating new character
    const handleNewCharacter = () => {
        navigate(`/client/${user.id}/character/new`)
    };

    return isLoaded ? (
        <div className='characters-page'>
            {characters.length === 0 ? (
                <div className="characters-empty-state">
                    <p>It looks like you haven&apos;t created any characters yet. Start by clicking the button below!</p>
                    <button className="empty-create-button" onClick={handleNewCharacter}>Create Your First Character</button>
                    <img src="/empty-state.png" alt="Empty Characters" className="empty-image" />
                </div>
            ) : (
                <>
                    <Link onClick={handleNewCharacter}>Create New Character</Link>
                    <Tiles items={sortedCharacters} type="character" onTileClick={handleClick} />
                </>
            )}
        </div>
    ) : (
        <Loader />
    )
};

export default CharactersPage;
