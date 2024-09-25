const Footer = () => {
    return (
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

    )
}

export default Footer;
