import { SiteHeader }    from "@/components/site-header"
import { Hero }          from "@/components/hero"
import { MarqueeStrip }  from "@/components/marquee-strip"
import { Stats }         from "@/components/stats"
import { WhyDisruptec }  from "@/components/why-disruptec"
import { Process }       from "@/components/process"
import { GamingPcs }     from "@/components/gaming-pcs"
import { BuildGuides }   from "@/components/build-guides"
import { Testimonials }  from "@/components/testimonials"
import { SocialProof }   from "@/components/social-proof"
import { Contact }       from "@/components/contact"
import { SiteFooter }    from "@/components/site-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080809]">
      <SiteHeader />
      <Hero />
      <MarqueeStrip />
      <Stats />
      <WhyDisruptec />
      <Process />
      <GamingPcs />
      <BuildGuides />
      <Testimonials />
      <SocialProof />
      <Contact />
      <SiteFooter />
    </main>
  )
}
