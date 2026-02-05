const stats = [
  { label: "Go-live speed", value: "<24 hrs" },
  { label: "Synthetic defects", value: "5,000+" },
  { label: "Day-one accuracy", value: "99%" },
];

const industries = [
  "Packaging & bottling",
  "Automotive components",
  "Metal fabrication",
  "Fasteners & bearings",
];

const users = [
  "Factory managers",
  "Operations leaders",
  "Quality engineers (non-AI)",
];

const comparison = [
  {
    feature: "Data requirement",
    legacy: "Weeks of line tuning",
    diy: "1,000+ labeled defects",
    visynex: "1 golden photo",
  },
  {
    feature: "Setup time",
    legacy: "8-12 weeks",
    diy: "6-10 weeks",
    visynex: "<24 hours",
  },
  {
    feature: "Cost structure",
    legacy: "High capex + integrator fees",
    diy: "Hidden labeling costs",
    visynex: "Transparent SaaS per line",
  },
  {
    feature: "Target user",
    legacy: "Vision specialists",
    diy: "AI engineers",
    visynex: "Ops teams",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-graphite text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-deck" />
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <header className="relative z-10 section-padding pb-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="h-14 w-14 rounded-2xl bg-electric/10 border border-electric/40 flex items-center justify-center"> */}
              <img
                src="/Visynex-logo.png"
                alt="Visynex logo"
                className="h-20 w-21 object-contain"
              />
              <div>
                <p className="text-lg font-display">Visynex AI Systems</p>
              </div>
            </div>
            <div className="hidden items-center gap-4 text-sm text-mist md:flex">
              <a href="#solution" className="hover:text-white transition">
                Solution
              </a>
              <a href="#pipeline" className="hover:text-white transition">
                How it works
              </a>
              <a href="#comparison" className="hover:text-white transition">
                Market
              </a>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
              <a
                href="#contact"
                className="rounded-full border border-electric/40 px-3 sm:px-4 py-2 text-white hover:bg-electric/20 transition text-xs sm:text-sm"
              >
                Send One Photo
              </a>
            </div>
          </div>
        </header>

        <section className="relative z-10 section-padding pt-6 sm:pt-8">
          <div className="mx-auto grid max-w-6xl gap-8 sm:gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="section-title text-sm sm:text-base">
                Zero-Shot Quality Control
              </p>
              <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold leading-tight text-white">
                Automating Quality. Zero Data Required.
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-mist leading-relaxed">
                Deploy AI quality control from a single photo. No datasets. No
                waiting for defects. Live in &lt;24 hours with edge-native
                deployment built for factory floors.
              </p>
              <div className="mt-6 sm:mt-8 grid gap-2 sm:gap-3 text-xs sm:text-sm text-mist">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  One photo input
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  99% accuracy on day one
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  Edge-native (NVIDIA Jetson)
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  No data leaves the factory
                </div>
              </div>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center rounded-full bg-electric px-6 py-3 text-sm font-semibold text-graphite shadow-glow hover:bg-electricDark transition"
                >
                  Send Us One Photo
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center rounded-full border border-electric/40 px-6 py-3 text-sm font-semibold text-white hover:bg-electric/10 transition"
                >
                  Book a Pilot Demo
                </a>
              </div>
              <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 border-t border-line/70 pt-6 sm:pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl sm:text-2xl font-display font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em] text-mist/70 mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card glass p-4 sm:p-6 lg:p-8">
              <div className="rounded-2xl border border-line/70 overflow-hidden">
                <img
                  src="/Factory-sorting.png"
                  alt="Factory sorting line"
                  className="h-32 sm:h-48 w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                  Live Command Deck
                </p>
                <span className="rounded-full border border-electric/40 px-3 py-1 text-xs text-electric">
                  Edge Agent
                </span>
              </div>
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <div className="rounded-2xl border border-line/80 bg-slate/70 p-4 sm:p-5">
                  <p className="text-xs text-mist/80 uppercase tracking-[0.3em]">
                    Input
                  </p>
                  <p className="mt-2 sm:mt-3 text-base sm:text-lg font-display">
                    1 Golden Sample Photo
                  </p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-mist">
                    Captured on the production line.
                  </p>
                </div>
                <div className="rounded-2xl border border-line/80 bg-slate/70 p-4 sm:p-5">
                  <p className="text-xs text-mist/80 uppercase tracking-[0.3em]">
                    Engine
                  </p>
                  <p className="mt-2 sm:mt-3 text-base sm:text-lg font-display">
                    Synthetic Defect Generator
                  </p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-mist">
                    Physics-aware variations for materials, geometry, and
                    lighting.
                  </p>
                </div>
                <div className="rounded-2xl border border-line/80 bg-slate/70 p-5">
                  <p className="text-xs text-mist/80 uppercase tracking-[0.3em]">
                    Outcome
                  </p>
                  <p className="mt-3 text-lg font-display">Deployed QC Agent</p>
                  <p className="mt-2 text-sm text-mist">
                    Detects and rejects defects in real time.
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-electric/30 bg-electric/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-electric">
                  Visual Formula
                </p>
                <p className="mt-3 text-xl font-display">
                  1 Photo → Dataset → Deployed Agent
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section-padding" id="problem">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-title">The Cold Start Barrier</p>
            <h2 className="section-heading mt-4">
              Most factories can’t train AI because defects are rare.
            </h2>
            <p className="mt-6 text-mist leading-relaxed">
              90% of factories remain unautomated for quality inspection.
              Traditional AI needs thousands of defect images. But defects are
              exactly what high-performing lines avoid. Teams end up waiting
              months, projects stall, and initiatives get abandoned.
            </p>
          </div>
          <div className="card p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-3 w-3 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="font-display text-lg">Waiting for Defects</p>
                  <p className="text-sm text-mist">
                    Manual collection, scrap accumulation, zero momentum.
                  </p>
                </div>
              </div>
              <div className="h-px divider" />
              <div className="flex items-start gap-4">
                <div className="h-3 w-3 rounded-full bg-electric mt-2" />
                <div>
                  <p className="font-display text-lg">Instant Readiness</p>
                  <p className="text-sm text-mist">
                    One photo unlocks a full defect library on day one.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-mist/60 font-mono">
              Stop waiting. Start inspecting.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="solution">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">The Breakthrough</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="section-heading">Zero-Shot Quality Control</h2>
              <p className="mt-6 text-mist leading-relaxed">
                We don’t wait for defects — we generate them. From one golden
                sample, Visynex produces 5,000+ realistic defect scenarios that
                respect the physics, material, and geometry of your parts.
                Models are trained against true variability and arrive
                production-ready with &gt;99% confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full border border-electric/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric">
                  Physics-aware synthesis
                </span>
                <span className="rounded-full border border-electric/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric">
                  No defect waiting time
                </span>
                <span className="rounded-full border border-electric/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric">
                  Day-one deployment
                </span>
              </div>
            </div>
            <div className="card glass p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Breakthrough Output
              </p>
              <div className="mt-4 rounded-2xl border border-line/70 overflow-hidden">
                <img
                  src="/Example1.png"
                  alt="Golden sample example"
                  className="h-38 w-full object-cover"
                />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-line/70 pb-4">
                  <p className="text-sm text-mist">Input</p>
                  <p className="font-display">1 golden sample</p>
                </div>
                <div className="flex items-center justify-between border-b border-line/70 pb-4">
                  <p className="text-sm text-mist">Synthetic library</p>
                  <p className="font-display">5,000+ scenarios</p>
                </div>
                <div className="flex items-center justify-between border-b border-line/70 pb-4">
                  <p className="text-sm text-mist">Confidence</p>
                  <p className="font-display">&gt;99% accuracy</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-mist">Deployment</p>
                  <p className="font-display">Edge agent live</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-electric/40 bg-electric/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-electric">
                  Formula
                </p>
                <p className="mt-2 text-lg font-display">
                  1 Photo → Dataset → Deployed Agent
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="pipeline">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">How It Works</p>
          <h2 className="section-heading mt-4">
            No-code pipeline. Edge-native deployment.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Upload golden sample",
                text: "Capture a single reference photo on the production line.",
              },
              {
                title: "Define constraints",
                text: "Use the no-code wizard to set tolerances and defect types.",
              },
              {
                title: "Generate labeled data",
                text: "Our synthesis engine creates realistic defect variants.",
              },
              {
                title: "Deploy edge agent",
                text: "Jetson-based agent detects and rejects defects in real time.",
              },
            ].map((step, index) => (
              <div key={step.title} className="card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm text-mist">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-mist">
            <span className="rounded-full border border-line/70 px-4 py-2">
              No bounding boxes
            </span>
            <span className="rounded-full border border-line/70 px-4 py-2">
              No AI engineers
            </span>
            <span className="rounded-full border border-line/70 px-4 py-2">
              No Python scripts
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding" id="edge">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="section-title">Edge & Privacy</p>
            <h2 className="section-heading mt-4">
              Built for factories that cannot leak data.
            </h2>
            <p className="mt-6 text-mist leading-relaxed">
              Visynex runs locally on NVIDIA Jetson hardware. Images never leave
              the factory; only metadata syncs for monitoring and audit trails.
              Connect to PLCs or robotic arms for automatic rejection without
              introducing new latency on the line.
            </p>
          </div>
          <div className="card glass p-8 space-y-6">
            <div className="flex items-center justify-between rounded-xl border border-line/70 bg-slate/60 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Powered by
              </p>
              <img
                src="/Nvidia.png"
                alt="NVIDIA logo"
                className="h-72 w-full object-contain"
              />
            </div>
            {[
              "Jetson deployment with deterministic latency",
              "Air-gapped support and secure updates",
              "Only metadata synced to the cloud",
              "PLC and robotic arm integration",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-electric" />
                <p className="text-sm text-mist">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" id="audience">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Who It’s For</p>
          <h2 className="section-heading mt-4">
            SME & mid-market factories ready to automate.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Industries
              </p>
              <ul className="mt-6 space-y-4 text-mist">
                {industries.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-electric" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Primary Users
              </p>
              <ul className="mt-6 space-y-4 text-mist">
                {users.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-electric" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="comparison">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Visynex vs The Market</p>
          <h2 className="section-heading mt-4">
            Competitors sell tools. We deliver outcomes.
          </h2>
          <div className="mt-10 card overflow-hidden">
            <div className="grid grid-cols-4 gap-4 border-b border-line/70 bg-slate/80 p-6 text-xs uppercase tracking-[0.2em] text-mist">
              <span>Category</span>
              <span>Legacy Vision</span>
              <span>DIY Labeling</span>
              <span className="text-electric">Visynex</span>
            </div>
            {comparison.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 gap-4 border-b border-line/70 p-6 text-sm text-mist"
              >
                <span className="text-white font-display">{row.feature}</span>
                <span>{row.legacy}</span>
                <span>{row.diy}</span>
                <span className="text-electric">{row.visynex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" id="pricing">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Business Model</p>
          <h2 className="section-heading mt-4">
            Hybrid SaaS built for production lines.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Production Assurance Pilot
              </p>
              <p className="mt-4 text-3xl font-display">$2,500 setup</p>
              <p className="mt-2 text-mist">$950/month per line</p>
              <ul className="mt-6 space-y-3 text-sm text-mist">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Hardware + deployment included
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Retraining and drift monitoring
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  24/7 support for plant teams
                </li>
              </ul>
            </div>
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Visynex Studio (Add-On)
              </p>
              <p className="mt-4 text-3xl font-display">$5,000 per dataset</p>
              <p className="mt-2 text-mist">For enterprise AI teams</p>
              <ul className="mt-6 space-y-3 text-sm text-mist">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Synthetic dataset generation
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Advanced defect libraries
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Integration with internal ML stacks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="traction">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Validation & Traction</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="section-heading">
                Proof from real production lines.
              </h2>
              <p className="mt-6 text-mist leading-relaxed">
                A pilot is signed with an industrial manufacturer. Visynex
                detected defects that manual collection could not capture,
                achieving 99.5% detection on day one with zero downtime for data
                collection.
              </p>
            </div>
            <div className="card glass p-8 space-y-4">
              {[
                "Pilot signed with industrial manufacturer",
                "Real defect detection where manual collection failed",
                "99.5% detection rate on day one",
                "Zero downtime for data collection",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" />
                  <p className="text-sm text-mist">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="gtm">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Go-To-Market</p>
          <h2 className="section-heading mt-4">
            The Trojan Horse offer that shortens the sales cycle.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Instant Proof Loop
              </p>
              <ol className="mt-6 space-y-4 text-mist">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" />{" "}
                  Client sends 1 photo
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" /> We
                  return a video detecting 50 defects
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" />{" "}
                  Instant proof builds momentum
                </li>
              </ol>
            </div>
            <div className="card glass p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Regional Focus
              </p>
              <div className="mt-6 space-y-4 text-mist">
                <p className="text-sm">Turkey industrial zones</p>
                <p className="text-sm">
                  Saudi Arabia manufacturing hubs (Vision 2030)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="vision">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Vision</p>
          <div className="mt-6 card glass p-10">
            <h2 className="section-heading">
              From visual inspection to autonomous manufacturing.
            </h2>
            <p className="mt-6 text-mist leading-relaxed">
              Visynex is building the intelligence layer that allows factories
              to adapt and correct themselves. We start with vision because
              every defect is visible before it becomes expensive. Next comes
              closed-loop automation.
            </p>
            <div className="mt-8 rounded-2xl border border-line/70 overflow-hidden">
              <img
                src="/Ai-chips.png"
                alt="AI chip cluster"
                className="h-44 w-full object-cover"
              />
            </div>
            <p className="mt-8 text-xl font-display text-white">
              “Today we flag defects. Tomorrow we correct the machines.”
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="contact">
        <div className="mx-auto max-w-6xl">
          <div className="card glass p-10 text-center">
            <p className="section-title">Ready to Deploy</p>
            <h2 className="section-heading mt-4">
              Join the Zero-Shot Revolution.
            </h2>
            <p className="mt-4 text-mist">
              Send us a single photo and see how Visynex performs on your line
              in under 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contact@visynex.ai"
                className="rounded-full bg-electric px-6 py-3 text-sm font-semibold text-graphite shadow-glow hover:bg-electricDark transition"
              >
                Send One Photo
              </a>
              <a
                href="mailto:pilot@visynex.ai"
                className="rounded-full border border-electric/40 px-6 py-3 text-sm font-semibold text-white hover:bg-electric/10 transition"
              >
                Book a Pilot
              </a>
              <a
                href="mailto:sales@visynex.ai"
                className="rounded-full border border-line/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-padding pt-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-line/70 pt-8 text-xs text-mist md:flex-row">
          <div className="flex items-center gap-3">
            <img
              src="/Visynex-logo2.png"
              alt="Visynex secondary logo"
              className="h-12 w-12 object-contain"
            />
            <p>© 2026 Visynex AI Systems. All rights reserved.</p>
          </div>
          <p className="font-mono">
            Edge-native quality control for modern manufacturing.
          </p>
        </div>
      </footer>
    </div>
  );
}
