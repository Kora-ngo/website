import HomeDemoRequestSection from '../layouts/home/home-demo-section';
import Seo from '../widgets/seo';

const RequestDemo = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">

      <Seo
          title="Request a Demo | Kora NGO Field Operations Software"
          description="Book a free 20-minute live demo of Kora and see offline beneficiary registration, aid delivery tracking, and donor reporting in action."
          path="/request-demo"
      />

      <section className="">
        < HomeDemoRequestSection  />
      </section>
    </div>
  );
};

export default RequestDemo;
