import { ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";

type SectionOneProps = {
  onContactClick?: () => void;
};

export function SectionOne({ onContactClick }: SectionOneProps) {
  return (
    <section
      id="main"
      className="relative flex min-h-screen flex-col justify-end supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="relative flex flex-col gap-10 px-5 pb-16 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 md:px-12 md:pb-20">
        <h1 className="max-w-xl text-4xl font-medium uppercase leading-[1.05] tracking-tight text-[#DA7E19] drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          <Reveal as="span" delay={100} className="block ">
          The 
          </Reveal>
          <Reveal as="span" delay={220} className="block ">
          Future of
          </Reveal>
          <Reveal as="span" delay={340} className="block ">
          Study Abroad 
          </Reveal>
          <Reveal as="span" delay={460} className="block ">Recruitment</Reveal>
          
        </h1>

        <div className="flex w-full max-w-xs flex-col items-start">
          <Reveal delay={400}>
            <ul className="mb-6 list-disc space-y-2 pl-4 text-sm leading-relaxed text-white/85 drop-shadow-md sm:mb-8">
              <li>Empower Your Agency</li>
              <li>Elevate Your Earnings</li>
            </ul>
          </Reveal>
          <Reveal delay={520}>
            <p className="mb-6 text-sm leading-relaxed text-white/85 drop-shadow-md sm:mb-8">
            Say goodbye to hidden fees and outdated systems. 
            Our tech-driven platform ensures 100% transparency, 
            instant updates, and the highest commission payouts in the industry.
            </p>
          </Reveal>

          <Reveal delay={640}>
            <button
              type="button"
              onClick={onContactClick}
              className="block w-full rounded-full border border-white/60 px-8 py-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#DA7E19] hover:text-black"
            >
              Contact Us Today
            </button>
          </Reveal>
        </div>
      </div>

      <Reveal delay={760}>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6">
          <ArrowDown size={18} className="animate-bounce text-white/80" />
        </div>
      </Reveal>
    </section>
  );
}
