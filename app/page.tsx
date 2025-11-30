import { Hero } from "@/components/hero"
import { WhyDisruptec } from "@/components/why-disruptec"
import { GamingPcs } from "@/components/gaming-pcs"
import { BuildGuides } from "@/components/build-guides"
import { SocialProof } from "@/components/social-proof"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyDisruptec />
      <GamingPcs />
      <BuildGuides />
      <SocialProof />
      <Contact />
    </main>
  )
}
