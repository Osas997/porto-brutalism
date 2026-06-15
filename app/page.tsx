import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <hr className="border-t-4 border-primary" />
        <Projects />
        <hr className="border-t-4 border-primary" />
        <About />
        <hr className="border-t-4 border-primary" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
