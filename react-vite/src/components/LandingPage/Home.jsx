const Home = () => {
    const sectionStyle = {
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    };

    return (
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
    )
}

export default Home;
