import { FaWindowMaximize, FaImage, FaPaintBrush, FaFileAlt, FaSlidersH, FaGift } from 'react-icons/fa';
import { GiWarhammer, GiNotebook } from 'react-icons/gi';
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
                        for both Game Masters and players who want to stay organized.
                    </p>
                </div>
            </div>
            <div className="row about-features">
                <div className="features-list block-1-3 block-m-1-2 block-mob-full group">
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaWindowMaximize size={48} color="#39b54a" />
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
                            <FaImage size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Character Sheets</h3>
                            <p>
                                Create and manage detailed character sheets for a variety of TTRPG
                                systems like Warhammer Wrath and Glory, Delta Green, and D&amp;D.
                            </p>
                        </div>
                    </div>
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaPaintBrush size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Game System Support</h3>
                            <p>
                                Our platform supports multiple TTRPG systems, allowing you to
                                customize your notes and character sheets based on your chosen game.
                            </p>
                        </div>
                    </div>
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaFileAlt size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Clean Code</h3>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                aspernatur aut odit aut fugit.
                            </p>
                        </div>
                    </div>
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaSlidersH size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Easy To Customize</h3>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                aspernatur aut odit aut fugit.
                            </p>
                        </div>
                    </div>
                    <div className="bgrid feature">
                        <span className="icon">
                            <FaGift size={48} color="#39b54a" />
                        </span>
                        <div className="service-content">
                            <h3>Free of Charge</h3>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                aspernatur aut odit aut fugit.
                            </p>
                        </div>
                    </div>
                </div>
                {/* end features-list */}
            </div>
            {/* end about-features */}
            <div className="row about-how">
                <h1 className="intro-header" />
                <div className="about-how-content">
                    <div className="about-how-steps block-1-2 block-tab-full group">
                        <div className="bgrid step">
                            <div className="step-icon">
                                <GiWarhammer size={30} color="#39b54a" />
                            </div>
                            <h3>Warhammer</h3>
                            <p>
                                Create dynamic Warhammer Wrath &amp; Glory character sheets with
                                detailed inventory management.
                            </p>
                        </div>
                        <div className="bgrid step">
                            <div className="step-icon">
                                <FaImage size={30} color="#39b54a" />
                            </div>
                            <h3>Delta Green</h3>
                            <p>
                                Manage your Delta Green agents and track their skills, gear, and
                                sanity with ease.
                            </p>
                        </div>
                        <div className="bgrid step">
                            <div className="step-icon">
                                <FaSlidersH size={30} color="#39b54a" />
                            </div>
                            <h3>D&amp;D</h3>
                            <p>
                                Customize your D&amp;D character sheets, tracking everything from
                                spells to abilities in one place.
                            </p>
                        </div>
                        <div className="bgrid step">
                            <div className="step-icon">
                                <GiNotebook size={30} color="#39b54a" />
                            </div>
                            <h3>Notes</h3>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo.
                            </p>
                        </div>
                    </div>
                </div>
                {/* end about-how-content */}
            </div>
            {/* end about-how */}
            <div className="row about-bottom-image">
                <img
                    src="/char-sheet.png"
                    srcSet="/char-sheet.png 600w"
                    alt="App Screenshots"
                    data-aos="fade-up"
                />
            </div>
            {/* end about-bottom-image */}
        </section>
    )
}

export default About;
