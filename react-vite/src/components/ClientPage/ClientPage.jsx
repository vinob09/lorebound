import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { thunkUserById } from '../../redux/session';
import { thunkAllNotes } from '../../redux/notes';
import { thunkGetAllCharacters } from '../../redux/characterSheets';
import { allQuotes } from './quotes';
import TopNav from './TopNav';
import Calendar from 'react-calendar';
import Loader from '../Loader/Loader';
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
    const [selectedDate, setSelectedDate] = useState(null);
    const [quote, setQuote] = useState(allQuotes[0]);

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

    // fetch random quote from import
    const fetchRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * allQuotes.length);
        setQuote(allQuotes[randomIndex]);
    };

    // handle date click with window alert
    const handleDateClick = (value) => {
        window.alert("Feature coming soon!");
        setSelectedDate(value);
    };

    return isLoaded && user ? (
        <div className="client-page">
            <TopNav userId={user.id} />
            <div id="top-page" className="client-info">
                <h1 className='client-page-title'>Hello, {user.username}</h1>
            </div>

            {isDashboard && (
                <div className="client-dashboard-content">
                    <div className="content-wrapper">
                        <div className="quote-section">
                            <h2>Echoes of the Past</h2>
                            <p>&quot;{quote}&quot;</p>
                            <button onClick={fetchRandomQuote}>Get New Quote</button>
                        </div>

                        <div className="calendar-section">
                            <h2>Fate&apos;s Ledger</h2>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                onClickDay={handleDateClick}
                                tileClassName={({ date }) =>
                                    date.toDateString() === (selectedDate ?
                                        selectedDate.toDateString() : '') ? 'selected-date' : null
                                }
                            />
                            <p>Selected Date: {date.toDateString()}</p>
                        </div>
                    </div>

                    <div className="create-content-links">
                        <h3>Start your adventure now!</h3>
                        <div className="content-links">
                            <Link to={`/client/${user.id}/note/new`}>Add a New Note</Link>
                            <Link to={`/client/${user.id}/character/new`}>Add a New Character</Link>
                        </div>
                    </div>
                </div>
            )}
            <div className="client-main-content">
                <Outlet />
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default ClientPage;
