import HomeDownloadSection from "../layouts/home/home-download-section";
import HomeFeatureSection from "../layouts/home/home-feature-section";
import HomeHeroSection from "../layouts/home/home-hero-section";
import HomeNavbar from "../layouts/home/home-navbar";
import HomeProblemSection from "../layouts/home/home-problem-section";
import HomeSolutionSection from "../layouts/home/home-solution-section";
import HomeWhoSection from "../layouts/home/home-who-section";
import HomeWorkSection from "../layouts/home/home-work-section";

const Home = () => {
    return ( 
        <div className="min-h-screen bg-white">
            <section><HomeNavbar /> </section>
            <section ><HomeHeroSection /></section>
            <section className="py-30" ><HomeProblemSection /></section>
            <section ><HomeSolutionSection /></section>
            <section ><HomeWorkSection /></section>
            <section ><HomeFeatureSection /></section>
            <section ><HomeWhoSection /></section>
            <section ><HomeDownloadSection /></section>
        </div>
     );
}
 
export default Home;