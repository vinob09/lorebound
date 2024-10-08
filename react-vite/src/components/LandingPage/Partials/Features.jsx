import { useCallback, useEffect, useState } from "react";
import { FaDiceD20, FaMapMarkedAlt } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import useEmblaCarousel from "embla-carousel-react";
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: <FaDiceD20 />,
            title: "Real-Time Dice Rolls:",
            text: "Chat with friends and roll dice directly in the app during your sessions.",
        },
        {
            icon: <AiFillDashboard />,
            title: "DM Dashboard:",
            text: "A powerful tool for Game Masters to manage campaigns, NPCs, and storylines.",
        },
        {
            icon: <FaMapMarkedAlt />,
            title: "Interactive Maps:",
            text: "Upload maps, add points of interest, and link them to quests or lore entries.",
        },
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    // update the curr index when the carousel scrolls
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on("select", onSelect);
            onSelect();
        }
    }, [emblaApi, onSelect]);

    const scrollToSlide = (index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    return (
        <section id="features">
            <div className="row">
                <div className="col-twelve">
                    <h1 className="intro-header">Upcoming Features</h1>
                </div>
            </div>
            <div className="row embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {features.map((feature, index) => (
                            <div className="embla__slide" key={index}>
                                <div className="feature-item">
                                    <div className="icon-title">
                                        <div className="feature-icon">{feature.icon}</div>
                                        <h3>{feature.title}</h3>
                                    </div>
                                    <div className="feature-content">
                                        <p>{feature.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="embla__dots">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            className={`embla__dot ${selectedIndex === index ? "is-selected" : ""}`}
                            onClick={() => scrollToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
