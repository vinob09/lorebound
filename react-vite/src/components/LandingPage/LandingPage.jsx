import Header from './Partials/Header';
import Home from './Partials/Home';
import About from './Partials/About';
import Features from './Partials/Features';
import Community from './Partials/Community';
import Footer from './Partials/Footer';
import './main.css';
import './base.css';

const LandingPage = () => {

    return (
        <div>
            <Header />
            <Home />
            <About />
            <Features />
            <Community />
            <Footer />

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
            
        </div>
    );
};

export default LandingPage;
