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
        </div>
    );
};

export default LandingPage;
