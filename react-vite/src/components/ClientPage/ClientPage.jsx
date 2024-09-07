import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { thunkUserById } from '../../redux/session';
import { thunkAllNotes } from '../../redux/notes';
import { thunkGetAllCharacters } from '../../redux/characterSheets';
import TopNav from './TopNav';
import Tiles from '../Tiles/Tiles';
import './ClientPage.css';

const ClientPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes.allNotes);
    const characters = useSelector(state => state.characters.characters);

    const [isLoaded, setIsLoaded] = useState(false);
    const [latestNote, setLatestNote] = useState(null);
    const [latestCharacter, setLatestCharacter] = useState(null);

    useEffect(() => {
        // fetch user if not loaded
        if (!user) {
            dispatch(thunkUserById(userId))
                .then((fetchedUser) => {
                    if (fetchedUser && fetchedUser.id === parseInt(userId)) {
                        setIsLoaded(true);
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => {
                    navigate("/");
                });
        }
        // validate loaded user id
        else if (user.id !== parseInt(userId)) {
            navigate("/login");
        }
        // displays content if user is correctly loaded
        else {
            setIsLoaded(true);
        }

        // fetch notes on initial load
        if (user) {
            dispatch(thunkAllNotes());
            dispatch(thunkGetAllCharacters());
        }

    }, [dispatch, userId, user, navigate]);


    useEffect(() => {
        // get the latest note by updatedAt
        if (notes && notes.length > 0) {
            const latest = [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
            setLatestNote(latest);
        }

        // get the latest character by updatedAt
        if (characters && characters.length > 0) {
            const latest = [...characters].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
            setLatestCharacter(latest);
        }
    }, [notes, characters]);

    // check if on the main ClientPage
    const isDashboard = location.pathname === `/client/${userId}`;

    // handle tiles click into character and notes details
    const handleTileClick = (item) => {
        if (item.title) {
            navigate(`/client/${user.id}/notes/${item.id}`);
        } else if (item.characterName) {
            navigate(`/client/${user.id}/characters/${item.id}`);
        }
    };


    return isLoaded && user ? (
        <div className="client-page">
            <TopNav userId={user.id} />
            <div className="client-info">
                <h1>Welcome, {user.username}</h1>
            </div>
            {isDashboard && (
                <div className="latest-tiles-section">
                    <h2>Your Latest Content</h2>
                    {latestNote && latestCharacter ? (
                        <div className="client-page-tiles">
                            <Tiles
                                items={[latestNote, latestCharacter]}
                                type="mixed"
                                onTileClick={handleTileClick}
                            />
                        </div>
                    ) : (
                        <p>Loading latest data...</p>
                    )}
                </div>
            )}
            <div className="client-main-content">
                <Outlet />
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    );
};

export default ClientPage;
