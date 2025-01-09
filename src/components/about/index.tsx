import { Routes } from "@/constants/enums";
import MainHeading from "../mainheading";

function About() {
  return (
    <section className="section-gap" id={Routes.ABOUT}>
      <div className="container text-center">
        <MainHeading subTitle="About US" title="Our Story" />
        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit dolor magni facilis fugit nulla, quis vel alias
            consectetur voluptas exercitationem soluta voluptatem similique!
            Unde, beatae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            repudiandae eum repellendus at tempore mollitia, aut dolor quam
            itaque quidem distinctio sit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non libero
            minima nesciunt, ratione molestiae vero fuga voluptates quia numquam
            maxime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
