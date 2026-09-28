import { FiInstagram, FiFacebook, FiFeather, FiHeart, FiShield, FiAward, FiUsers, FiStar } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Flourish from '../components/Flourish'
import ParallaxImage from '../components/ParallaxImage'
import ParallaxBg from '../components/ParallaxBg'
import DepthFrame from '../components/DepthFrame'
import { useSiteData } from '../context/SiteDataContext'
import { resolveImage } from '../lib/api'

const initials = (name) => {
  const parts = name.split(' ')
  return parts[0][0] + parts[parts.length - 1][0]
}

const VALUE_ICONS = {
  feather: FiFeather,
  heart: FiHeart,
  shield: FiShield,
  award: FiAward,
  users: FiUsers,
  star: FiStar,
}

const AboutUs = () => {
  const { team, about } = useSiteData()
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end pb-16 px-6 md:px-10 bg-brown overflow-hidden">
        <ParallaxBg src={resolveImage(about.heroImage)} containerClassName="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brown/45 to-brown/65" />
        </ParallaxBg>
        <div className="relative max-w-7xl mx-auto w-full">
          <Reveal>
            <Eyebrow light>About Us</Eyebrow>
            <h1 className="font-serif text-4xl md:text-6xl text-cream-50">
              The Story Behind <span className="italic text-rose">Eliseo</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="right" className="order-2 md:order-1">
            <DepthFrame frameClassName="absolute -bottom-6 -right-6 w-full h-full border border-rose-dark hidden md:block">
              <ParallaxImage
                src={resolveImage(about.storyImage)}
                alt="Interior of Eliseo Beauty Lounge"
                containerClassName="relative w-full h-[420px] md:h-[520px] bg-blush"
                tilt
              />
            </DepthFrame>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="order-1 md:order-2">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              {about.storyHeading}
            </h2>
            <p className="text-brown-soft font-light leading-relaxed mb-5 max-w-lg">
              {about.storyParagraph1}
            </p>
            <p className="text-brown-soft font-light leading-relaxed max-w-lg">
              {about.storyParagraph2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-blush-light">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>Our Values</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              What Guides <span className="italic text-mauve">Every Treatment</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10">
            {about.values.map((v, i) => {
              const Icon = VALUE_ICONS[v.icon] || FiFeather
              return (
                <Reveal key={v.title} delay={i * 0.12}>
                  <div className="bg-cream-50 p-10 h-full border border-blush hover:border-rose-dark transition-colors duration-300">
                    <div className="w-14 h-14 rounded-full bg-blush flex items-center justify-center mb-6">
                      <Icon size={20} className="text-mauve" />
                    </div>
                    <h3 className="font-serif text-2xl mb-3">{v.title}</h3>
                    <p className="text-brown-soft font-light leading-relaxed text-sm">{v.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT BANNER */}
      <section className="py-20 px-6 md:px-10 bg-forest">
        <Reveal className="max-w-4xl mx-auto text-center">
          <p className="font-script italic text-2xl md:text-4xl text-cream-50 leading-relaxed">
            &ldquo;{about.missionQuote}&rdquo;
          </p>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow center>Meet The Team</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              The Hands Behind Your <span className="italic text-mauve">Transformation</span>
            </h2>
            <Flourish />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <Reveal key={member.id || member.name} delay={i * 0.1}>
                <div className="group relative h-full bg-brown text-cream-50 px-7 py-10 flex flex-col items-center text-center border border-brown hover:border-gold/70 transition-colors duration-500">
                  <span className="absolute top-5 right-5 font-serif italic text-gold/40 text-xs">
                    {String(member.years).padStart(2, '0')} yrs
                  </span>

                  <div className="relative w-24 h-24 rounded-full border border-gold/50 flex items-center justify-center mb-6 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                    {member.photo ? (
                      <img src={resolveImage(member.photo)} alt={member.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <>
                        <span className="absolute inset-1.5 rounded-full border border-gold/20" />
                        <span className="font-serif text-3xl text-gold">{initials(member.name)}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-xl text-cream-50">{member.name}</h3>
                  <p className="text-rose text-xs tracking-luxe uppercase mt-2">{member.role}</p>

                  <span className="h-px w-8 bg-gold/60 my-5" />

                  <p className="text-cream-50/60 text-xs font-light leading-relaxed">
                    {member.specialty}
                  </p>

                  <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <span className="w-8 h-8 rounded-full border border-cream-50/20 flex items-center justify-center text-cream-50/80 hover:text-gold hover:border-gold/60 transition-colors">
                      <FiInstagram size={13} />
                    </span>
                    <span className="w-8 h-8 rounded-full border border-cream-50/20 flex items-center justify-center text-cream-50/80 hover:text-gold hover:border-gold/60 transition-colors">
                      <FiFacebook size={13} />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <Reveal className="max-w-5xl mx-auto bg-blush rounded-none px-8 py-16 md:py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Ready to Experience <span className="italic text-mauve">Eliseo</span>?
          </h2>
          <p className="text-brown-soft font-light mb-8 max-w-md mx-auto">
            Come meet our artists and discover an experience made entirely for you.
          </p>
          <Button to="/contact" variant="primary">Book an Appointment</Button>
        </Reveal>
      </section>
    </div>
  )
}

export default AboutUs
