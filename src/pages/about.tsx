import AboutCurrentChapterSection from "../layouts/about/about-current-chapter-section";
import AboutIntroSection from "../layouts/about/about-intro-section";
import AboutMissionSection from "../layouts/about/about-mission-section";
import AboutProblemSection from "../layouts/about/about-problem-section";
import Seo from "../widgets/seo";

const About = () => {
    return (
        <div className="min-h-screen bg-white">

            <Seo
                title="About Kora | Digital Tools for Humanitarian Organizations"
                description="Learn why Kora is building practical digital tools that help humanitarian and development organizations reach the people who need aid."
                path="/about-us"
            />

            <section id="intro">
                <AboutIntroSection />
            </section>

            <section id="problem">
                <AboutProblemSection />
            </section>

            <section id="mission">
                <AboutMissionSection />
            </section>
            
            <section id="current-chapter">
                <AboutCurrentChapterSection />
            </section>
        </div>
     );
}

export default About;
