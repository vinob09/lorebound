import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { thunkUserById } from '../../redux/session';
import { thunkAllNotes } from '../../redux/notes';
import TopNav from './TopNav';
import './ClientPage.css';

const ClientPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

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
            navigate("/");
        }
        // displays content if user is correctly loaded
        else {
            setIsLoaded(true);
        }

        // fetch notes on initial load
        if (user) {
            dispatch(thunkAllNotes());
        }

    }, [dispatch, userId, user, navigate]);

    return isLoaded && user ? (
        <div className="client-page">
            <TopNav userId={user.id} />
            <div className="client-info">
                <h1>Welcome, {user.username}</h1>
            </div>
            <div className="client-main-content">
                <Outlet />
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    );
};

export default ClientPage;
