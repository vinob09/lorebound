import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { thunkUserById } from '../../redux/session';
import TopNav from './TopNav';
import './ClientPage.css';

const ClientPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // checks if no user id loaded and matches it with curr user
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
        // checks for match in loaded user id
        else if (user.id !== parseInt(userId)) {
            navigate("/");
        }
        // displays content if loaded user id matches
        else {
            setIsLoaded(true);
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
