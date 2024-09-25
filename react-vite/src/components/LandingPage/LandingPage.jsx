import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { FaDiceD20, FaMapMarkedAlt } from 'react-icons/fa';
// import { AiFillDashboard } from 'react-icons/ai';
// import Navigation from '../Navigation';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import Loader from '../Loader/Loader';
// import './LandingPage.css';
// import './animations.css';
import Header from './Header';

import './main.css';
import './base.css';
import './fonts.css';
// import './vendor.css';


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

    const sectionStyle = {
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    };

    return (
        <>
            <Header />

            <section id="home" style={sectionStyle}>
                <div className="overlay" />
                <div className="home-content">
                    <div className="row contents">
                        <div className="home-content-left">
                            <h3 data-aos="fade-up">Welcome to Lorebound</h3>
                            <h1 data-aos="fade-up">
                                Organize Your <br />
                                TTRPG Adventures <br />
                                With Ease.
                            </h1>
                            <div className="buttons" data-aos="fade-up">
                                <a href="#download" className="smoothscroll button stroke">
                                    <span className="icon-circle-down" aria-hidden="true" />
                                    Sign Up
                                </a>
                                <a
                                    href="http://player.vimeo.com/video/14592941?title=0&byline=0&portrait=0&color=39b54a"
                                    data-lity=""
                                    className="button stroke"
                                >
                                    <span className="icon-play" aria-hidden="true" />
                                    Try a Demo
                                </a>
                            </div>
                        </div>
                        <div className="home-image-right">
                            <video
                                className="rounded-video"
                                playsInline
                                autoPlay
                                muted
                                loop
                            >
                                <source
                                    src="/Adventures.mp4"
                                    type="video/mp4"
                                    data-aos="fade-up"
                                />
                            </video>
                        </div>
                    </div>
                </div>
                <ul className="home-social-list">
                    <li>
                        <a href="https://github.com/vinob09" target="_blank" rel="noreferrer">
                            <i className="fa fa-github" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/chanary-wilson/" target="_blank" rel="noreferrer">
                            <i className="fa fa-linkedin" />
                        </a>
                    </li>
                </ul>
                <div className="home-scrolldown">
                    <a href="#about" className="scroll-icon smoothscroll">
                        <span>Scroll Down</span>
                        <i className="icon-arrow-right" aria-hidden="true" />
                    </a>
                </div>
            </section>

            <section id="about">
                <div className="row about-intro">
                    <div className="col-four">
                        <h1 className="intro-header" data-aos="fade-up">
                            Hello traveler...
                        </h1>
                    </div>
                    <div className="col-eight">
                        <p className="lead" data-aos="fade-up">
                            Keep track of your most exciting campaigns, take detailed session notes,
                            and manage your character sheets effortlessly. Our platform is perfect
                            for both Game Masters and players who want to stay organized.
                        </p>
                    </div>
                </div>
                <div className="row about-features">
                    <div className="features-list block-1-3 block-m-1-2 block-mob-full group">
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon">
                                <i className="icon-window" />
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
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon">
                                <i className="icon-image" />
                            </span>
                            <div className="service-content">
                                <h3>Character Sheets</h3>
                                <p>
                                    Create and manage detailed character sheets for a variety of TTRPG
                                    systems like Warhammer Wrath and Glory, Delta Green, and D&amp;D.
                                </p>
                            </div>
                        </div>
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon">
                                <i className="icon-paint-brush" />
                            </span>
                            <div className="service-content">
                                <h3>Game System Support</h3>
                                <p>
                                    Our platform supports multiple TTRPG systems, allowing you to
                                    customize your notes and character sheets based on your chosen game.
                                </p>
                            </div>
                        </div>
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon">
                                <i className="icon-file" />
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
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon">
                                <i className="icon-sliders" />
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
                        <div className="bgrid feature" data-aos="fade-up">
                            <span className="icon">
                                <i className="icon-gift" />
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
                    <h1 className="intro-header" data-aos="fade-up" />
                    <div className="about-how-content" data-aos="fade-up">
                        <div className="about-how-steps block-1-2 block-tab-full group">
                            <div className="bgrid step" data-item={1}>
                                <h3>Warhammer</h3>
                                <p>
                                    Create dynamic Warhammer Wrath &amp; Glory character sheets with
                                    detailed inventory management.
                                </p>
                            </div>
                            <div className="bgrid step" data-item={2}>
                                <h3>Delta Green</h3>
                                <p>
                                    Manage your Delta Green agents and track their skills, gear, and
                                    sanity with ease.
                                </p>
                            </div>
                            <div className="bgrid step" data-item={3}>
                                <h3>D&amp;D</h3>
                                <p>
                                    Customize your D&amp;D character sheets, tracking everything from
                                    spells to abilities in one place.
                                </p>
                            </div>
                            <div className="bgrid step" data-item={4}>
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

            <section id="features">
                <div className="row pricing-content">
                    <div className="col-four pricing-intro">
                        <h1 className="intro-header" data-aos="fade-up">
                            Our Pricing Options
                        </h1>
                        <p data-aos="fade-up">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                            illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                            explicabo. Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium.
                        </p>
                    </div>
                    <div className="col-eight pricing-table">
                        <div className="row">
                            <div className="col-six plan-wrap">
                                <div className="plan-block" data-aos="fade-up">
                                    <div className="plan-top-part">
                                        <h3 className="plan-block-title">Lite Plan</h3>
                                        <p className="plan-block-price">
                                            <sup>$</sup>25
                                        </p>
                                        <p className="plan-block-per">Per Month</p>
                                    </div>
                                    <div className="plan-bottom-part">
                                        <ul className="plan-block-features">
                                            <li>
                                                <span>3GB</span> Storage
                                            </li>
                                            <li>
                                                <span>10GB</span> Bandwidth
                                            </li>
                                            <li>
                                                <span>5</span> Databases
                                            </li>
                                            <li>
                                                <span>30</span> Email Accounts
                                            </li>
                                        </ul>
                                        <a className="button button-primary large" href="">
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* end plan-wrap */}
                            <div className="col-six plan-wrap">
                                <div className="plan-block primary" data-aos="fade-up">
                                    <div className="plan-top-part">
                                        <h3 className="plan-block-title">Pro Plan</h3>
                                        <p className="plan-block-price">
                                            <sup>$</sup>50
                                        </p>
                                        <p className="plan-block-per">Per Month</p>
                                    </div>
                                    <div className="plan-bottom-part">
                                        <ul className="plan-block-features">
                                            <li>
                                                <span>5GB</span> Storage
                                            </li>
                                            <li>
                                                <span>20GB</span> Bandwidth
                                            </li>
                                            <li>
                                                <span>15</span> Databases
                                            </li>
                                            <li>
                                                <span>70</span> Email Accounts
                                            </li>
                                        </ul>
                                        <a className="button button-primary large" href="">
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* end plan-wrap */}
                        </div>
                    </div>
                    {/* end pricing-table */}
                </div>
                {/* end pricing-content */}
            </section>

            <section id="community">
                <div className="row">
                    <div className="col-twelve">
                        <h1 className="intro-header" data-aos="fade-up">
                            What They Say About Our App.
                        </h1>
                    </div>
                </div>
                <div className="row owl-wrap">
                    <div id="testimonial-slider" data-aos="fade-up">
                        <div className="slides owl-carousel">
                            <div>
                                <p>
                                    Your work is going to fill a large part of your life, and the only
                                    way to be truly satisfied is to do what you believe is great work.
                                    And the only way to do great work is to love what you do. If you
                                    haven&apos;t found it yet, keep looking. Don&apos;t settle. As with all
                                    matters of the heart, you&apos;ll know when you find it.
                                </p>
                                <div className="testimonial-author">
                                    <img src="/user-02.jpg" alt="Author image" />
                                    <div className="author-info">
                                        Steve Jobs
                                        <span className="position">CEO, Apple.</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>
                                    This is Photoshop&apos;s version of Lorem Ipsum. Proin gravida nibh vel
                                    velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum
                                    auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.
                                    Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
                                </p>
                                <div className="testimonial-author">
                                    <img src="/user-03.jpg" alt="Author image" />
                                    <div className="author-info">
                                        John Doe
                                        <span>CEO, ABC Corp.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end slides */}
                    </div>
                    {/* end testimonial-slider */}
                </div>
                {/* end flex-container */}
            </section>

            <section id="begin">
                <div className="row">
                    <div className="col-full">
                        <h1 className="intro-header" data-aos="fade-up">
                            Download Our App Today!
                        </h1>
                        <p className="lead" data-aos="fade-up">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        </p>
                        <ul className="download-badges">
                            <li>
                                <a href="#" title="" className="badge-appstore" data-aos="fade-up">
                                    App Store
                                </a>
                            </li>
                            <li>
                                <a href="#" title="" className="badge-googleplay" data-aos="fade-up">
                                    Play Store
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footer-main">
                    <div className="row">
                        <div className="col-three md-1-3 tab-full footer-info">
                            <div className="footer-logo" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                                in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget
                                consectetur sed, convallis at tellus.
                            </p>
                            <ul className="footer-social-list">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-facebook-square" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-behance" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-dribbble" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* end footer-info */}
                        <div className="col-three md-1-3 tab-1-2 mob-full footer-contact">
                            <h4>Contact</h4>
                            <p>
                                1600 Amphitheatre Parkway
                                <br />
                                Mountain View, CA <br />
                                94043 US
                                <br />
                            </p>
                            <p>
                                someone@dazzlesite.com <br />
                                Phone: (+63) 555 1212 <br />
                                Fax: (+63) 555 0100
                            </p>
                        </div>
                        {/* end footer-contact */}
                        <div className="col-two md-1-3 tab-1-2 mob-full footer-site-links">
                            <h4>Site Links</h4>
                            <ul className="list-links">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                                <li>
                                    <a href="#">Terms</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                        {/* end footer-site-links */}
                        <div className="col-four md-1-2 tab-full footer-subscribe">
                            <h4>Our Newsletter</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            {/* <div className="subscribe-form">
                            <form id="mc-form" className="group" noValidate="true">
                                <input
                                    type="email"
                                    defaultValue=""
                                    name="EMAIL"
                                    className="email"
                                    id="mc-email"
                                    placeholder="Email Address"
                                    required=""
                                />
                                <input type="submit" name="subscribe" defaultValue="Send" />
                                <label htmlFor="mc-email" className="subscribe-message" />
                            </form>
                        </div> */}
                        </div>
                        {/* end footer-subscribe */}
                    </div>
                    {/* /row */}
                </div>
                {/* end footer-main */}
                <div className="footer-bottom">
                    <div className="row">
                        <div className="col-twelve">
                            <div className="copyright">
                                <span>© Copyright Dazzle 2018.</span>
                                <span>
                                    Design by <a href="http://www.styleshout.com/">styleshout</a>
                                </span>
                            </div>
                            <div id="go-top">
                                <a className="smoothscroll" title="Back to Top" href="#top">
                                    <i className="icon-arrow-up" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* end footer-bottom */}
                </div>
            </footer>

            {/* <nav>
                <Navigation />
            </nav> */}

            {/* Initial Header Video */}
            {/* <section className="landing-container">
                <div id="intro" className="video-wrapper"> */}
            {/* <video className="background-video" playsInline autoPlay muted loop>
                        <source src="/Bookv2.mp4" type="video/mp4" />
                    </video> */}
            {/* <div className="mask">
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
            </section> */}

            {/* Introductory Section */}
            {/* <section className="intro-section animate-slide-up">
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
            </section> */}

            {/* Features Section */}
            {/* <section className="features-section animate-slide-up">
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
            </section> */}

            {/* Character Sheets in Action */}
            {/* <section className="showcase-section animate-slide-up">
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
            </section> */}

            {/* Upcoming Features Section */}
            {/* <section className="upcoming-features-section animate-slide-up">
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
            </section> */}

            {/* Community Section */}
            {/* <section className="community-section animate-slide-up">
                <h2>Explore the Community</h2>
                <p>Join the thriving world of TTRPG enthusiasts, explore resources, and enhance your campaign tracking and character management experience.</p>
                <a href="https://www.dndbeyond.com/" className="cta-button" target="_blank" rel="noopener noreferrer">Visit D&D Beyond</a>
                <a href="https://www.reddit.com/r/rpg/" className="cta-button" target="_blank" rel="noopener noreferrer">Join the r/RPG Community</a>
                <a href="https://www.gmbinder.com/" className="cta-button" target="_blank" rel="noopener noreferrer">Check Out GM Binder</a>
            </section> */}

            {/* Call to Action Section */}
            {/* <section className="cta-section animate-slide-up">
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
            </section> */}
        </>
    );
};

export default LandingPage;
