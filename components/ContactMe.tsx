import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:rakshithg2098@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`;
  };

  return (
    <div className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-20 md:top-24 section-heading">
        Contact
      </h3>
      <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10">
        <h4 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-center">
          I have got just what you need.{" "}
          <span className="gradient-text">Let&apos;s talk.</span>
        </h4>

        <div className="space-y-2 md:space-y-4">
          {[
            { Icon: PhoneIcon, text: "+91 9731429857" },
            { Icon: EnvelopeIcon, text: "rakshithg2098@gmail.com" },
            { Icon: MapPinIcon, text: "Bangalore, India" },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="flex items-center space-x-5 justify-center group cursor-default">
              <div className="p-2 rounded-full bg-darkGreen/5 group-hover:bg-darkGreen/10 transition-colors duration-300">
                <Icon className="text-darkGreen h-5 w-5 md:h-6 md:w-6" />
              </div>
              <p className="text-base md:text-xl text-gray-600 group-hover:text-darkGreen transition-colors duration-300">{text}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 w-80 md:w-fit mx-auto"
        >
          <div className="md:flex md:space-x-3 space-y-3 md:space-y-0">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput w-80 md:w-auto"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput w-80 md:w-auto"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput"
            rows={3}
          />
          <button className="relative group overflow-hidden py-3 md:py-4 px-10 rounded-xl text-white font-bold text-lg
            bg-gradient-to-r from-darkGreen to-lightGreen
            hover:shadow-xl hover:shadow-darkGreen/20 hover:-translate-y-0.5
            active:translate-y-0 active:shadow-lg
            transition-all duration-300">
            <span className="relative z-10">Submit</span>
            <div className="absolute inset-0 bg-gradient-to-r from-lightGreen to-darkGreen opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
