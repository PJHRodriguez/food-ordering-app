import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-12">
      <div className="py-14">
        <h1 className="text-4xl font-semibold leading-12">
          Everything is better with a{" "}
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete a simple yet
          delicous joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center bg-primary  gap-2 items-center !text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex gap-2 !border-0 py-2 items-center text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={""}
        />
      </div>
    </section>
  );
}
