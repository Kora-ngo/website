import CtaRequestDemo from "../layouts/common/genneral-request-demo";
import HomeDownloadSection from "../layouts/home/home-download-section";
import KoraFieldActionSection from "../layouts/kora-feild/kora-field-action-section";
import KoraFieldIntroSection from "../layouts/kora-feild/kora-field-intro-section";
import KoraFieldPromiseSection from "../layouts/kora-feild/kora-field-promise-section";
import Seo from "../widgets/seo";

const KoraFeild = () => {
    return ( 
        <div className="min-h-screen bg-white">

            <Seo
                title="Kora Field | Offline Data Collection App for NGOs"
                description="Kora Field is an Android app that lets NGO field teams register beneficiaries and record aid delivery offline, then sync when connected."
                path="/kora-field"
            />

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