import { Routes } from "@/constants/enums";
import MainHeading from "../mainheading";

const Contact = async () => {
  return (
    <section className='section-gap' id={Routes.CONTACT}>
      <div className='container text-center'>
        <MainHeading
          subTitle="Contact Us"
          title="Don't HESITATE"
        />
        <div className='mt-8'>
          <a className='text-4xl underline text-accent' href='tel:+2012121212'>
            +201025728942
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;