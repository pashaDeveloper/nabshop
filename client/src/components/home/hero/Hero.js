import KeyServices from "@/app/KeyServices/Policies";
import Banner1 from "./Banner1";
import Container from "@/components/shared/Container";

const Hero = () => {
  return (
    <section className="  md:mt-20">
      <Container className=" px-1 lg:px-primary gap-y-4">
        <Banner1 />
        <KeyServices />
      </Container>
    </section>
  );
};

export default Hero;
