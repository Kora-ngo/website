import CtaRequestDemo from "../layouts/common/genneral-request-demo";
import PricingIntroSection from "../layouts/pricing/pricing-intro-section";
import PricingOpportunitySection from "../layouts/pricing/pricing-opportunity-section";
import PricingProcessSection from "../layouts/pricing/pricing-process-section";
import PricingWorkingTogetherSection from "../layouts/pricing/pricing-working-together-section";
import Seo from "../widgets/seo";

const Pricing = () => {
    return (
        <div className="min-h-screen bg-white">

            <Seo
                title="Pricing & Pilot Program for NGOs | Kora"
                description="Kora is in its pilot phase. Join the pilot to evaluate beneficiary and aid-tracking software for your NGO and help shape it."
                path="/pricing"
            />

            <section id="intro">
                <PricingIntroSection />
            </section>

            <section id="opportunity">
                <PricingOpportunitySection />
            </section>

            <section id="working-together">
                <PricingWorkingTogetherSection />
            </section>

            <section id="process">
                <PricingProcessSection />
            </section>

            <section className="mb-10">
                <CtaRequestDemo />
            </section>
        </div>
     );
}

export default Pricing;
