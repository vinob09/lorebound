import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkGetAllCharacters } from '../../redux/characterSheets';
import Tiles from '../Tiles';
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

    // sort characters by newest first
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
            <h1>All Characters Page</h1>
            <Link onClick={handleNewCharacter}>Create New Character</Link>
            <Tiles items={sortedCharacters} type="character" onTileClick={handleClick} />
        </div>
    ) : (
        <h1>Loading...</h1>
    )
};

export default CharactersPage;
