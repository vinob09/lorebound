import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { thunkLogin } from '../../../redux/session';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import SignupFormModal from '../../SignupFormModal';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import Loader from '../../Loader/Loader';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user);

    const sectionStyle = {
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    };

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

    return (
        <section id="home" style={sectionStyle}>
            <div className="overlay" />
            <div className="home-content">
                <div className="row contents">
                    <div className="home-content-left">
                        <h3>Welcome to Lorebound</h3>
                        <h1>
                            Organize Your <br />
                            TTRPG Adventures <br />
                            With Ease.
                        </h1>
                        <div className="buttons">
                            <div className={`auth-buttons ${user ? 'hide-buttons' : ''}`}>
                                <button className="button stroke">
                                    <OpenModalMenuItem
                                        itemText="Signup"
                                        modalComponent={<SignupFormModal />}
                                    />
                                </button>
                                <button
                                    onClick={handleTryDemoClick}
                                    className="button stroke"
                                >
                                    Try a Demo
                                </button>
                            </div>
                            {isLoaded && <Loader />}
                        </div>
                    </div>
                    <div className="home-image-right">
                        <div className="video-container">
                            <video
                                className="rounded-video"
                                playsInline
                                autoPlay
                                muted
                                loop
                            >
                                <source
                                    src="/wildlife-adventure.mp4"
                                    type="video/mp4"
                                    data-aos="fade-up"
                                />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="home-social-list">
                <li>
                    <a href="https://github.com/vinob09" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/chanary-wilson/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                </li>
            </ul>
            <div className="home-scrolldown">
                <a href="#about" className="scroll-icon">
                    <span>Scroll Down</span>
                    <IoIosArrowForward
                        aria-hidden="true"
                        style={{
                            fontSize: "2.4rem",
                            position: "relative",
                            left: "5px",
                            top: "8px"
                        }}
                    />
                </a>
            </div>
        </section>
    )
};

export default Home;
