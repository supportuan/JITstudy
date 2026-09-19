import { motion } from "framer-motion";
import { BlurText } from "./BlurText";
import { HeroCtaButtons } from "./HeroCtaButtons";
import { SiteHeader } from "./SiteHeader";
import { VideoBackgroundLayout } from "./VideoBackgroundLayout";

export function HeroSection() {
  return (
    <VideoBackgroundLayout
      header={<SiteHeader />}
      homeMobileStacked
      mobileBottomActions={<HeroCtaButtons />}
    >
      <div className="flex h-full min-h-0 flex-col items-center justify-center px-4 pt-16 pb-14 text-center max-md:justify-start max-md:px-0 max-md:pt-0 max-md:pb-0 md:pt-20 md:pb-16">
        <div className="flex w-full flex-col items-center max-md:gap-8 md:gap-0">
          <div className="flex w-full translate-y-[75px] flex-col items-center max-md:gap-8 md:gap-0">
          <motion.div
            className="liquid-glass max-w-[92vw] -translate-y-2 rounded-full bg-black/10 px-3 py-1.5 font-body text-xs text-[hsl(var(--foreground)/0.9)] max-md:translate-y-0 md:mb-6 md:translate-y-0 md:py-2 md:text-sm"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            End to End Study Abroad Recruitment Platform
          </motion.div>

          <BlurText
            text="Global Education Brighter Tomorrows"
            className="font-heading max-w-[92vw] text-[clamp(2.55rem,11vw,3.75rem)] leading-[0.88] tracking-[-0.06em] text-[hsl(var(--heading))] md:max-w-3xl md:text-[clamp(2rem,8.5vw,5.5rem)] md:tracking-[-4px]"
          />

          <motion.p
            className="max-w-[92vw] text-sm leading-tight tracking-[-0.05em] text-black md:mt-6 md:max-w-2xl md:text-[calc(1.125rem+3px)]"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            An innovative student-recruitment platform that helps access to tailored
            solutions for seamless operations
          </motion.p>
          </div>

          <motion.div
            className="hidden -translate-y-[3px] md:block md:mt-8"
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <HeroCtaButtons />
          </motion.div>
        </div>
      </div>
    </VideoBackgroundLayout>
  );
}
