import KeyServices from "@/app/[locale]/Policies/Policies";
import Banner1 from "./Banner1";
import Container from "@/components/shared/Container";
import Category from "./Category";

const Hero = () => {
  return (
    <section className=" mt-24">
      <Container className=" px-1 lg:px-primary gap-y-4">
        <Banner1 />
        <KeyServices />
       <Category />
      </Container>
    </section>
  );
};

export default Hero;
