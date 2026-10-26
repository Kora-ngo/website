import CtaRequestDemo from "../layouts/common/genneral-request-demo";
import HomeDownloadSection from "../layouts/home/home-download-section";
import KoraFieldActionSection from "../layouts/kora-feild/kora-field-action-section";
import KoraFieldIntroSection from "../layouts/kora-feild/kora-field-intro-section";
import KoraFieldPromiseSection from "../layouts/kora-feild/kora-field-promise-section";

const KoraFeild = () => {
    return ( 
        <div className="min-h-screen bg-white">
            <section id="intro">
                <KoraFieldIntroSection />
            </section>

            <section id="promise">
                <KoraFieldPromiseSection />
            </section>

            <section id="in-action">
                <KoraFieldActionSection />
            </section>


            <section id="download">
                <HomeDownloadSection />
            </section>


            <section className="mb-10">
                <CtaRequestDemo />
            </section>
        </div>
     );
}
 
export default KoraFeild;