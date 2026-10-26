import PlatformAdminSection from "../layouts/platfrom/platform-admin-section";
import PlatformEcosystemSection from "../layouts/platfrom/platform-ecosystem-section";
import PlatformIntroSection from "../layouts/platfrom/platform-intro-section";

const Platform = () => {
    return (
        <div className="min-h-screen bg-white">

        <section id="intro">
            <PlatformIntroSection />
        </section>

        <section id="ecosystem">
            <PlatformEcosystemSection />
        </section>

        <section id="admin">
            <PlatformAdminSection />
        </section>

        </div>
     );
}

export default Platform;