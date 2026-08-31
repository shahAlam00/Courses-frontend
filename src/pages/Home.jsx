
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import CourseAvailable from "../components/CourseAvailable";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      

      <main>
        <Hero />

        <TrustBar />

        <CourseAvailable />
        <Testimonials/>

      </main>

    </div>
  );
}