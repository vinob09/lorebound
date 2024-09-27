import { FaWindowMaximize, FaFileAlt, FaSlidersH } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <section id="about">
            <div className="row about-intro">
                <div className="col-four">
                    <h1 className="intro-header">
                        Hello traveler...
                    </h1>
                </div>
                <div className="col-eight">
                    <p className="lead">
                        Keep track of your most exciting campaigns, take detailed session notes,
                        and manage your character sheets effortlessly. Our platform is perfect
                        for players who want to stay organized.
                    </p>
                </div>
            </div>
            <div className="row about-features">
                <div className="features-list block-1-3 block-m-1-2 block-mob-full group">
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaFileAlt size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Session Notes</h3>
                            <p>
                                Capture every detail of your TTRPG sessions with our easy-to-use
                                note-taking tools, ensuring you never lose track of important
                                moments.
                            </p>
                        </div>
                    </div>
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaWindowMaximize size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Character Sheets</h3>
                            <p>
                                Create and manage detailed character sheets for Delta Green
                                (and soon to be with a variety of other TTRPG systems like
                                Warhammer: Wrath & Glory and D&amp;D!)
                            </p>
                        </div>
                    </div>
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaSlidersH size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Feature-rich Tools</h3>
                            <p>
                                Our platform supports multiple interactive elements, such as
                                image uploading and PDF exporting, allowing you to seamlessly share your
                                character sheets with others.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row about-how">
                <h1 className="intro-header" />
            </div>
            <div className="row about-bottom-image">
                <img
                    src="/char-sheet.png"
                    srcSet="/char-sheet.png 600w"
                    alt="App Screenshots"
                    data-aos="fade-up"
                />
            </div>
        </section>
    )
}

export default About;
