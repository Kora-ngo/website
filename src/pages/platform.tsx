import HomeFeatureSection from "../layouts/home/home-feature-section";
import HomeSolutionSection from "../layouts/home/home-solution-section";
import HomeWorkSection from "../layouts/home/home-work-section";

const Platform = () => {
    return (
        <div className="min-h-screen bg-white">

        <section id="solution">
            <HomeSolutionSection />
        </section>

        <section id="how-it-works">
            <HomeWorkSection />
        </section>

        <section id="features">
            <HomeFeatureSection />
        </section>

        </div>
     );
}

export default Platform;
