import { thunkLogin } from '../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Navigation from '../Navigation';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const handleTryDemoClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }))
                .then(() => {
                    navigate(`/client/1`)
                })
        } catch (err) {
            console.error(err)
        }
    };

    const handleUserDashboard = () => {
        navigate(`/client/${user.id}`)
    };

    return (
        <div>
            <header>
                <Navigation />
                <section className="landing-container">
                    <div id="intro" className="video-wrapper">
                        <video
                            className="background-video"
                            playsInline
                            autoPlay
                            muted
                            loop
                        >
                            <source
                                src="/Bookv2.mp4"
                                type="video/mp4"
                            />
                        </video>
                        <div className="mask">
                            <section className="landing-page">
                                <div className="landing-card">
                                    <h1 className="landing-name">Hello, adventurer...</h1>
                                    <h2 className="landing-subtitle">Organize Your TTRPG Adventures with Ease</h2>
                                    <div className="button-group">
                                        {user ? (
                                            <button className="cta-button" onClick={handleUserDashboard}>
                                                Dashboard
                                            </button>
                                        ) : (
                                            <button className="cta-button">
                                                <OpenModalMenuItem
                                                    itemText="Signup"
                                                    modalComponent={<SignupFormModal />}
                                                />
                                            </button>
                                        )}
                                        <button className="cta-button demo-button" onClick={handleTryDemoClick}>Try a Demo</button>
                                    </div>
                                    <div className="gradient-line"></div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </header>

            {/* Introductory Section */}
            <section className="intro-section">
                <div className="content">
                    <h2>Welcome to Your Next Adventure</h2>
                    <p>Discover exciting new worlds and embark on thrilling adventures that push the boundaries of your imagination. Our platform is designed for those who dream of exploring the unknown.</p>
                    <button className="cta-button">
                        <OpenModalMenuItem
                            itemText="Join the Journey"
                            modalComponent={<SignupFormModal />}
                        />
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="feature-card">
                    <h3>Interactive Quests</h3>
                    <p>Immerse yourself in detailed, interactive quests that challenge your decision-making skills.</p>
                </div>
                <div className="feature-card">
                    <h3>Customizable Characters</h3>
                    <p>Build and customize your own characters to suit your playstyle, and bring them to life in the adventures ahead.</p>
                </div>
                <div className="feature-card">
                    <h3>Rich Storylines</h3>
                    <p>Experience storytelling like never before, with plots that evolve based on your choices and actions.</p>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="testimonial">
                    <p>Random text</p>
                </div>
                <div className="testimonial">
                    <p>Random Text</p>
                </div>
                <div className="testimonial">
                    <p>Random text</p>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
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
        </div>
    );
};

export default LandingPage;
