const Community = () => {
    return (
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

    )
}

export default Community;
