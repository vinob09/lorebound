import { thunkLogin } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { FaDiceD20, FaMapMarkedAlt } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import Navigation from '../Navigation';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import Loader from '../Loader/Loader';
import './LandingPage.css';
import './animations.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector(state => state.session.user);

    // intro animation
    // useEffect(() => {
    //     const intro = document.getElementById('intro');
    //     setTimeout(() => {
    //         intro.classList.add('show-intro');
    //     }, 500);
    // }, []);

    // handle demo button
    const handleTryDemoClick = async (e) => {
        e.preventDefault();

        setIsLoaded(true);
        try {
            await dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }))
                .then(() => {
                    navigate(`/client/1`)
                })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoaded(false);
        }
    };

    const handleUserDashboard = () => {
        navigate(`/client/${user.id}`)
    };

    return (
        <>
            <nav>
                <Navigation />
            </nav>

            {/* Initial Header Video */}
            <section className="landing-container">
                <div id="intro" className="video-wrapper">
                    {/* <video className="background-video" playsInline autoPlay muted loop>
                        <source src="/Bookv2.mp4" type="video/mp4" />
                    </video> */}
                    <div className="mask">
                        <h1 className="landing-name animate-fade-in">Hello, adventurer...</h1>
                        <h2 className="landing-subtitle animate-fly-in-right">
                            Organize Your TTRPG Adventures with Ease
                        </h2>
                        <div className="button-group animate-fade-in">
                            {user ? (
                                <button className="cta-button" onClick={handleUserDashboard}>
                                    Dashboard
                                </button>
                            ) : (
                                <button className="cta-button">
                                    <OpenModalMenuItem itemText="Signup" modalComponent={<SignupFormModal />} />
                                </button>
                            )}
                            <button className="cta-button demo-button" onClick={handleTryDemoClick}>Try a Demo</button>
                            {isLoaded && <Loader />}
                        </div>
                        <div className="gradient-line"></div>
                    </div>
                </div>
            </section>

            {/* Introductory Section */}
            <section className="intro-section animate-slide-up">
                <div className="content">
                    <h2>Welcome to Your Next Adventure</h2>
                    <p>Keep track of your most exciting campaigns, take detailed session notes, and manage your character sheets effortlessly. Our platform is perfect for both Game Masters and players who want to stay organized.</p>
                    <button className="cta-button">
                        <OpenModalMenuItem
                            itemText="Join the Journey"
                            modalComponent={<SignupFormModal />}
                        />
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section animate-slide-up">
                <div className="feature-card animate-fade-in">
                    <h3>Session Notes</h3>
                    <p>Capture every detail of your TTRPG sessions with our easy-to-use note-taking tools, ensuring you never lose track of important moments.</p>
                </div>
                <div className="feature-card animate-fade-in">
                    <h3>Character Sheets</h3>
                    <p>Create and manage detailed character sheets for a variety of TTRPG systems like Warhammer Wrath and Glory, Delta Green, and D&D.</p>
                </div>
                <div className="feature-card animate-fade-in">
                    <h3>Game System Support</h3>
                    <p>Our platform supports multiple TTRPG systems, allowing you to customize your notes and character sheets based on your chosen game.</p>
                </div>
            </section>

            {/* Character Sheets in Action */}
            <section className="showcase-section animate-slide-up">
                <div className="showcase-grid">
                    <div className="showcase-item animate-zoom-in">
                        <img src="/warhammer-sheet.png" alt="Warhammer Character Sheet" />
                        <p>Create dynamic Warhammer Wrath & Glory character sheets with detailed inventory management.</p>
                    </div>
                    <div className="showcase-item animate-zoom-in">
                        <img src="/dg-sheet.png" alt="Delta Green Character Sheet" />
                        <p>Manage your Delta Green agents and track their skills, gear, and sanity with ease.</p>
                    </div>
                    <div className="showcase-item animate-zoom-in">
                        <img src="/dnd-sheet.png" alt="D&D Character Sheet" />
                        <p>Customize your D&D character sheets, tracking everything from spells to abilities in one place.</p>
                    </div>
                </div>
            </section>

            {/* Upcoming Features Section */}
            <section className="upcoming-features-section animate-slide-up">
                <h2>Upcoming Features</h2>
                <ul className="features-list">
                    <li>
                        <FaDiceD20 style={{ color: '#3E1F47', marginRight: '10px' }} />
                        <strong style={{ color: '#3E1F47', textDecoration: 'underline', fontSize: '1.2em' }}>Real-Time Dice Rolls:</strong>
                        {" "}
                        Chat with friends and roll dice directly in the app during your sessions.
                    </li>
                    <li>
                        <AiFillDashboard style={{ color: '#3E1F47', marginRight: '10px' }} />
                        <strong style={{ color: '#3E1F47', textDecoration: 'underline', fontSize: '1.2em' }}>DM Dashboard:</strong>
                        {" "}
                        A powerful tool for Game Masters to manage campaigns, NPCs, and storylines.
                    </li>
                    <li>
                        <FaMapMarkedAlt style={{ color: '#3E1F47', marginRight: '10px' }} />
                        <strong style={{ color: '#3E1F47', textDecoration: 'underline', fontSize: '1.2em' }}>Interactive Maps:</strong>
                        {" "}
                        Upload maps, add points of interest, and link them to quests or lore entries.
                    </li>
                </ul>
            </section>

            {/* Community Section */}
            <section className="community-section animate-slide-up">
                <h2>Explore the Community</h2>
                <p>Join the thriving world of TTRPG enthusiasts, explore resources, and enhance your campaign tracking and character management experience.</p>
                <a href="https://www.dndbeyond.com/" className="cta-button" target="_blank" rel="noopener noreferrer">Visit D&D Beyond</a>
                <a href="https://www.reddit.com/r/rpg/" className="cta-button" target="_blank" rel="noopener noreferrer">Join the r/RPG Community</a>
                <a href="https://www.gmbinder.com/" className="cta-button" target="_blank" rel="noopener noreferrer">Check Out GM Binder</a>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section animate-slide-up">
                <div className="cta-content">
                    <h2>Ready to Begin Your Adventure?</h2>
                    <p>Sign up now and start exploring the countless possibilities that await.</p>
                    <button className="cta-button">
                        <OpenModalMenuItem
                            itemText="Get Started"
                            modalComponent={<SignupFormModal />}
                        />
                    </button>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
