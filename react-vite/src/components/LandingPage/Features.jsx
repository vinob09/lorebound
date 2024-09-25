const Features = () => {
    return (
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
    )
}

export default Features;
