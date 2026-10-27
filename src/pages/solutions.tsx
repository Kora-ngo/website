import CtaRequestDemo from "../layouts/common/genneral-request-demo";
import SolutionIntro from "../layouts/solution/solution-intro";
import SolutionsBeneficiarySection from "../layouts/solution/solutions-beneficiary-section";
import SolutionsDifferenceSection from "../layouts/solution/solutions-difference-section";
import SolutionsIntegrationsSection from "../layouts/solution/solutions-integrations-section";
import SolutionsOfflineSection from "../layouts/solution/solutions-offline-section";
import SolutionsReportingSection from "../layouts/solution/solutions-reporting-section";
import Seo from "../widgets/seo";

const Solutions = () => {
    return (
        <div className="min-h-screen bg-white">

            <Seo
                title="Beneficiary & Aid Delivery Management for NGOs | Kora"
                description="Manage beneficiaries, collect field data offline, track assistance delivery, and report to donors with Kora’s solutions for NGOs."
                path="/solutions"
            />

            <section id="intro">
                <SolutionIntro />
            </section>

            <section id="beneficiary-assistance">
                <SolutionsBeneficiarySection />
            </section>

            <section id="offline-collection">
                <SolutionsOfflineSection />
            </section>

            <section id="monitoring-reporting">
                <SolutionsReportingSection />
            </section>

            <section id="integrations">
                <SolutionsIntegrationsSection />
            </section>

            <section id="kora-difference">
                <SolutionsDifferenceSection />
            </section>

            <section className="mb-10">
                <CtaRequestDemo />
            </section>

        </div>
     );
}

export default Solutions;
