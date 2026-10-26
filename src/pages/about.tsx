import AboutCurrentChapterSection from "../layouts/about/about-current-chapter-section";
import AboutIntroSection from "../layouts/about/about-intro-section";
import AboutMissionSection from "../layouts/about/about-mission-section";
import AboutProblemSection from "../layouts/about/about-problem-section";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
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
