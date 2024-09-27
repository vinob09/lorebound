import './Community.css';

const Community = () => {
    return (
        <section id="community">
            <div className="row">
                <div className="col-full">
                    <h1 className="intro-header">
                        Explore the Community
                    </h1>
                    <p className="lead">
                        Join the thriving world of TTRPG enthusiasts,
                        explore resources, and enhance your campaign
                        tracking and character management experience.
                    </p>
                    <ul className="community-badges">
                        <li>
                            <a
                                href="https://www.dndbeyond.com/"
                                title="D&D"
                                className="community-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit D&D Beyond
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.reddit.com/r/rpg/"
                                title="Reddit"
                                className="community-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join the r/RPG Community
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.gmbinder.com/"
                                title="GM"
                                className="community-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Check Out GM Binder
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Community;
