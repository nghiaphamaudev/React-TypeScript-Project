import About from 'src/components/client/About';
import Banner from 'src/components/client/Banner';
import BlockSection from 'src/components/client/BlockSection';
import Portfolio from 'src/components/client/Portfolio';
import Testimonials from 'src/components/client/Testimonials';
import TrustedBy from 'src/components/client/TrustedBy';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <TrustedBy />
      <About />
      <Portfolio />
      <Testimonials />
      <BlockSection />
    </div>
  );
};

export default HomePage;
