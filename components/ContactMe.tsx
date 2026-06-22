import React, { useState } from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe({}: Props) {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: 5000,
          style: {
            background: "#f0f4f3",
            color: "#2C6975",
            border: "1px solid #68B2A0",
          },
        });
        reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      // Fallback to mailto if Web3Forms fails
      toast.error("Service unavailable. Opening email client instead.", {
        duration: 3000,
      });
      window.location.href = `mailto:rakshithg2098@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (Reply to: ${formData.email})`;
    } finally {
      setIsSubmitting(false);
    }
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
              {...register("name", { required: true })}
              placeholder="Name"
              className="contactInput w-80 md:w-auto"
              type="text"
              disabled={isSubmitting}
            />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="contactInput w-80 md:w-auto"
              type="email"
              disabled={isSubmitting}
            />
          </div>
          <input
            {...register("subject", { required: true })}
            placeholder="Subject"
            className="contactInput"
            type="text"
            disabled={isSubmitting}
          />
          <textarea
            {...register("message", { required: true })}
            placeholder="Message"
            className="contactInput"
            rows={3}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative group overflow-hidden py-3 md:py-4 px-10 rounded-xl text-white font-bold text-lg
              bg-gradient-to-r from-darkGreen to-lightGreen
              hover:shadow-xl hover:shadow-darkGreen/20 hover:-translate-y-0.5
              active:translate-y-0 active:shadow-lg
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            <span className="relative z-10">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit"
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-lightGreen to-darkGreen opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
