import { HOME_FEATURES } from "@/data/homeFeatures";

export default function NextSection() {
  return (
    <section id="work" className="home-features text-neutral-900">
      <div className="home-features-inner mx-auto w-full max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid-features">
          {HOME_FEATURES.map((feature) => (
            <article key={feature.id} className="grid-feature-holder">
              <h2 className="number">
                {feature.number}
                <span className="black-text">.</span>
              </h2>
              <div className="grid-content-left">
                <h5 className="h6-style">{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
