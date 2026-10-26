import CtaRequestDemo from "../layouts/common/genneral-request-demo";
import HomeFaqSection from "../layouts/home/home-faq-section";
import HomeFeatureSection from "../layouts/home/home-feature-section";
import HomeHeroSection from "../layouts/home/home-hero-section";
import HomeProblemSection from "../layouts/home/home-problem-section";
import HomeSolutionSection from "../layouts/home/home-solution-section";
import HomeWhoSection from "../layouts/home/home-who-section";
import HomeWorkSection from "../layouts/home/home-work-section";

const Home = () => {
    return ( 
        <div className="min-h-screen bg-white">


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

        <section id="faq">
            <HomeFaqSection />
        </section>

        <section className="py-10">
            <CtaRequestDemo />
        </section>

        {/* done by Morel Denzel */}

        </div>
     );
}
 
export default Home;