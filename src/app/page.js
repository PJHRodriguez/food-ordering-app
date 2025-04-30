import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            erat in urna sodales dignissim non quis eros. Praesent euismod non
            odio a eleifend. Fusce enim metus, dapibus id varius vitae, luctus
            quis velit. Suspendisse ut convallis nisl, non maximus lacus.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            erat in urna sodales dignissim non quis eros. Praesent euismod non
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
          </p>
        </div>
      </section>

      <section className="text-center my-4" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a className="text-4xl" href="tel:+52123123123">
            +52 123 123 123
          </a>
        </div>
      </section>
    </>
  );
}
