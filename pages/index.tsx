import { GetStaticProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { Experience, PageInfo, Skill, Project, Social } from "../typings";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactMe from "../components/ContactMe";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  pageInfoData,
  experiencesData,
  skillsData,
  projectsData,
  socialsData,
} from "../data/portfolioData";

const Header = dynamic(() => import("../components/Header"), { ssr: false });
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="bg-lightBackground text-darkBlack h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkGreen/80"
    >
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{"Rakshith G | ML Engineer Portfolio"}</title>
      </Head>

      {/* Header */}
      <Header socials={socials} />

      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      {/* About */}
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} scrollRef={scrollRef} />
      </section>

      {/* Experiences */}
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      {/* Skills */}
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      {/* Contact */}
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-darkGreen to-lightGreen rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="relative h-10 w-10 bg-gradient-to-r from-darkGreen to-lightGreen rounded-full flex items-center justify-center shadow-lg
                hover:scale-110 hover:shadow-xl transition-all duration-300">
                <HomeIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo = pageInfoData as any;
  const experiences = experiencesData as any;
  const skills = skillsData as any;
  const projects = projectsData as any;
  const socials = socialsData as any;

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
  };
};
