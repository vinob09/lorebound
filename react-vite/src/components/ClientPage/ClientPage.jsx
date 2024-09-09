import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { thunkUserById } from '../../redux/session';
import { thunkAllNotes } from '../../redux/notes';
import { thunkGetAllCharacters } from '../../redux/characterSheets';
import TopNav from './TopNav';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ClientPage.css';

const ClientPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState(new Date());

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
    }, [dispatch, userId, user, navigate]);

    useEffect(() => {
        // fetch notes and characters on load
        if (user) {
            dispatch(thunkAllNotes());
            dispatch(thunkGetAllCharacters());
        }
    }, [location.pathname, dispatch, user]);

    // check if on the main ClientPage
    const isDashboard = location.pathname === `/client/${userId}`;


    return isLoaded && user ? (
        <div className="client-page">
            <TopNav userId={user.id} />
            <div className="client-info">
                <h1>Welcome, {user.username}</h1>
            </div>

            {isDashboard && (
                <div className="client-dashboard-content">
                    <div className="calendar-section">
                        <h2>Your Calendar</h2>
                        <Calendar onChange={setDate} value={date} />
                        <p>Selected Date: {date.toDateString()}</p>
                    </div>

                    <div className="create-content-links">
                        <h3>Start your adventure below!</h3>
                        <Link to={`/client/${user.id}/note/new`}>Add a New Note</Link>
                        {"   "}
                        <Link to={`/client/${user.id}/character/new`}>Add a New Character</Link>
                    </div>
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
