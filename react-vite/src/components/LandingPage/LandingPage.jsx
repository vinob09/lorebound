import './LandingPage.css';

const LandingPage = () => {
    return (
        <header>
            <section>
                <div id="intro" className="bg-image">
                    <video
                        style={{ minWidth: "100%", minHeight: "100%" }}
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
                                <p className="landing-description">
                                    Organize Your TTRPG Adventures with Ease
                                </p>
                                <button className="landing-button">Button</button>
                                <div className="gradient-line"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </header>
    );

};

export default LandingPage;
