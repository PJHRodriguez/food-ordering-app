import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-12 flex flex-col lg:flex-row justify-center items-center">
      <div className="py-14 text-center lg:text-left">
        <h1 className="text-2xl md:text-4xl font-semibold leading-12">
          Everything is better with a{" "}
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm justify-center lg:justify-start">
          <button className="flex justify-center bg-primary gap-2 items-center !text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex gap-2 !border-0 py-2 items-center text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>

      <div className="relative w-full flex justify-center ">
        <Image
          src={"/pizza.png"}
          alt="Pizza image"
          layout="intrinsic"
          width={800}
          height={800}
          objectFit="contain"
          className="w-full max-w-[600px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]"
        />
      </div>
    </section>
  );
}
