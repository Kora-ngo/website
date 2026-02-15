import HomeDownloadSection from "../layouts/home/home-download-section";
import HomeFeatureSection from "../layouts/home/home-feature-section";
import HomeFooter from "../layouts/home/home-footer";
import HomeHeroSection from "../layouts/home/home-hero-section";
import HomeNavbar from "../layouts/home/home-navbar";
import HomeProblemSection from "../layouts/home/home-problem-section";
import HomeSolutionSection from "../layouts/home/home-solution-section";
import HomeWhoSection from "../layouts/home/home-who-section";
import HomeWorkSection from "../layouts/home/home-work-section";

const Home = () => {
    return ( 
        <div className="min-h-screen bg-white">
        <section>
            <HomeNavbar />
        </section>

        <section id="hero">
            <HomeHeroSection />
        </section>

        <section id="problem" className="lg:py-30">
            <HomeProblemSection />
        </section>

        <section id="solution">
            <HomeSolutionSection />
        </section>

        <section id="how-it-works">
            <HomeWorkSection />
        </section>

        <section id="features">
            <HomeFeatureSection />
        </section>

        <section id="audience">
            <HomeWhoSection />
        </section>

        <section id="download">
            <HomeDownloadSection />
        </section>

        <section id="footer">
            <HomeFooter />
        </section>
        </div>
     );
}
 
export default Home;