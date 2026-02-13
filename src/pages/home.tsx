import HomeHeroSection from "../layouts/home/home-hero-section";
import HomeNavbar from "../layouts/home/home-navbar";
import HomeProblemSection from "../layouts/home/home-problem-section";
import HomeSolutionSection from "../layouts/home/home-solution-section";

const Home = () => {
    return ( 
        <div className="min-h-screen bg-white">
            <section><HomeNavbar /> </section>
            <section ><HomeHeroSection /></section>
            <section className="py-30" ><HomeProblemSection /></section>
            <section ><HomeSolutionSection /></section>
        </div>
     );
}
 
export default Home;