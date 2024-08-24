import './LandingPage.css';

const LandingPage = () => {
    return (
        <section className="landing-page">
            <div className="landing-card">
                <div className='content-container'>
                    <div className='gradient-line'></div>
                    <h1 className="landing-name">Landing Page</h1>
                    <p className="landing-description">
                        Organize Your TTRPG Adventures with Ease <a href="#">Try a Demo</a>.
                    </p>
                    <button className="landing-button">Button</button>
                </div>
            </div>
        </section>
    )
};

export default LandingPage;
