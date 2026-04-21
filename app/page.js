"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Frames per batch", value: "10,000+" },
  { label: "Hardware capex", value: "Zero" },
  { label: "Zero-shot deployment", value: "99.5%" },
];

const industries = [
  "Embodied AI builders",
  "Enterprise robotics OEMs",
];

const users = [
  "Lead ML engineers",
  "Robotics CTOs",
  "Foundation model researchers",
];

const materials = [
  "Metal",
  "Plastic",
  "Glass",
  "Rubber",
  "Paper / Carton",
  "Composite",
];

const defects = [
  "Scratch",
  "Dent",
  "Crack",
  "Discoloration",
  "Misalignment",
  "Contamination",
  "Other",
];

const comparison = [
  {
    feature: "Data requirement",
    legacy: "Manual collection loops",
    diy: "Generic simulators",
    visynex: "Physics-accurate API datasets",
  },
  {
    feature: "Scalability",
    legacy: "Human-labeling bottlenecks",
    diy: "Low-fidelity edge cases",
    visynex: "10,000+ frames per batch",
  },
  {
    feature: "Physics realism",
    legacy: "Sparse real defects",
    diy: "Weak material realism",
    visynex: "Semantic physical chaos control",
  },
  {
    feature: "Target user",
    legacy: "Factory QA teams",
    diy: "Simulation specialists",
    visynex: "ML and robotics platform teams",
  },
];

const simulatorShapeTypes = ["gear", "bearing", "bracket"];

function drawRoundedRectPath(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
    return;
  }

  let r = radius;
  if (width < 2 * r) r = width / 2;
  if (height < 2 * r) r = height / 2;

  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
}

function drawGear(ctx, size) {
  const radius = size / 2;
  const teeth = 8;

  ctx.beginPath();
  for (let i = 0; i < teeth; i += 1) {
    const angle = (i / teeth) * Math.PI * 2;
    const p1x = Math.cos(angle - 0.1) * radius;
    const p1y = Math.sin(angle - 0.1) * radius;
    const p2x = Math.cos(angle + 0.1) * radius;
    const p2y = Math.sin(angle + 0.1) * radius;
    const p3x = Math.cos(angle + 0.25) * (radius * 0.7);
    const p3y = Math.sin(angle + 0.25) * (radius * 0.7);
    const p4x = Math.cos(angle + 0.35) * (radius * 0.7);
    const p4y = Math.sin(angle + 0.35) * (radius * 0.7);

    if (i === 0) {
      ctx.moveTo(p1x, p1y);
    } else {
      ctx.lineTo(p1x, p1y);
    }
    ctx.lineTo(p2x, p2y);
    ctx.lineTo(p3x, p3y);
    ctx.lineTo(p4x, p4y);
  }
  ctx.closePath();

  ctx.moveTo(radius * 0.3, 0);
  ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2, true);
}

function drawBearing(ctx, size) {
  const radius = size / 2;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.moveTo(radius * 0.6, 0);
  ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2, true);
  ctx.moveTo(radius * 0.3, 0);
  ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2, false);

  const balls = 8;
  for (let i = 0; i < balls; i += 1) {
    const angle = (i / balls) * Math.PI * 2;
    const ballDistance = radius * 0.45;
    const cx = Math.cos(angle) * ballDistance;
    const cy = Math.sin(angle) * ballDistance;
    ctx.moveTo(cx + radius * 0.1, cy);
    ctx.arc(cx, cy, radius * 0.1, 0, Math.PI * 2);
  }
}

function drawBracket(ctx, size) {
  const width = size * 1.2;
  const height = size * 0.5;
  const holeDistance = width / 2 - height / 2;
  const holeRadius = height * 0.15;

  ctx.beginPath();
  drawRoundedRectPath(ctx, -width / 2, -height / 2, width, height, height / 3);
  ctx.moveTo(-holeDistance + holeRadius, 0);
  ctx.arc(-holeDistance, 0, holeRadius, 0, Math.PI * 2, true);
  ctx.moveTo(holeDistance + holeRadius, 0);
  ctx.arc(holeDistance, 0, holeRadius, 0, Math.PI * 2, true);
}

function Sim2RealSimulator() {
  const canvasRef = useRef(null);
  const [chaosLevel, setChaosLevel] = useState(8);
  const [objectVariability, setObjectVariability] = useState(7);
  const [frameCount, setFrameCount] = useState(0);
  const totalFramesRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const halfWidth = canvas.width / 2;
    let animationFrameId = null;
    let lastMetricUpdate = 0;
    const shapes = [];
    const shapeCount = objectVariability * 3;

    for (let i = 0; i < shapeCount; i += 1) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: 40 + Math.random() * (canvas.height - 80),
        size: 25 + Math.random() * 30,
        speed: 1 + Math.random() * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        type: simulatorShapeTypes[Math.floor(Math.random() * simulatorShapeTypes.length)],
        offsetY: Math.random() * 100,
      });
    }

    const drawShape = (type, size) => {
      if (type === "gear") drawGear(ctx, size);
      if (type === "bearing") drawBearing(ctx, size);
      if (type === "bracket") drawBracket(ctx, size);
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#6b7280";
      ctx.font = '12px "Segoe UI", sans-serif';
      ctx.fillText("DIGITAL CONCEPTION (SIM)", 20, 25);
      ctx.fillText("PHYSICAL SYNTHESIS (REAL)", halfWidth + 20, 25);

      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(halfWidth, 0);
      ctx.lineTo(halfWidth, canvas.height);
      ctx.stroke();

      shapes.forEach((shape) => {
        shape.x += shape.speed;
        shape.rotation += shape.rotSpeed;
        const currentY = shape.y + Math.sin(time / 500 + shape.offsetY) * 15;

        if (shape.x > canvas.width + 50) {
          shape.x = -50;
        }

        const isRightSide = shape.x > halfWidth;
        ctx.save();

        if (isRightSide) {
          const jitterX = (Math.random() - 0.5) * chaosLevel * 1.5;
          const jitterY = (Math.random() - 0.5) * chaosLevel * 1.5;
          const renderX = shape.x + jitterX;
          const renderY = currentY + jitterY;

          ctx.translate(renderX, renderY);
          ctx.rotate(shape.rotation);
          ctx.fillStyle = "#9ca3af";
          ctx.strokeStyle = "#4b5563";
          ctx.lineWidth = 1.5;

          drawShape(shape.type, shape.size);
          ctx.fill("evenodd");
          ctx.stroke();

          ctx.restore();
          ctx.save();

          if (Math.random() < chaosLevel * 0.08) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fillRect(
              renderX + (Math.random() * 80 - 40),
              renderY + (Math.random() * 80 - 40),
              2,
              2
            );
          }

          const sensorError = chaosLevel * 2;
          const boxSize = shape.size * 1.3 + sensorError;
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 2]);
          ctx.strokeRect(
            renderX - boxSize / 2,
            renderY - boxSize / 2,
            boxSize,
            boxSize
          );
          ctx.setLineDash([]);

          totalFramesRef.current += chaosLevel * 0.1;
        } else {
          ctx.translate(shape.x, currentY);
          ctx.rotate(shape.rotation);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.5;
          drawShape(shape.type, shape.size);
          ctx.stroke();
        }

        ctx.restore();
      });

      if (time - lastMetricUpdate > 120) {
        lastMetricUpdate = time;
        setFrameCount(Math.floor(totalFramesRef.current));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [chaosLevel, objectVariability]);

  return (
    <section className="section-padding pt-0" id="simulator">
      <div className="mx-auto max-w-6xl">
        <div className="card glass p-5 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">
              Sim2Real Data Generation
            </h2>
            <p className="mt-2 text-sm text-mist">
              Visualizing procedural physical chaos and auto-annotation for Embodied AI.
            </p>
          </div>

          <canvas
            ref={canvasRef}
            width={852}
            height={400}
            className="mt-6 block h-[300px] w-full rounded-xl border border-line/80 sm:h-[400px]"
            style={{ background: "linear-gradient(90deg, #111827 50%, #1f2937 50%)" }}
          />

          <div className="mt-6 grid gap-6 border-t border-line/70 pt-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="chaosSlider"
                className="text-xs font-medium uppercase tracking-[0.08em] text-mist/80"
              >
                Physical Chaos Complexity (Noise & Drift)
              </label>
              <input
                id="chaosSlider"
                type="range"
                min={1}
                max={10}
                value={chaosLevel}
                onChange={(event) => setChaosLevel(Number(event.target.value))}
                className="w-full accent-electric"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="countSlider"
                className="text-xs font-medium uppercase tracking-[0.08em] text-mist/80"
              >
                Object Count / Variability
              </label>
              <input
                id="countSlider"
                type="range"
                min={1}
                max={10}
                value={objectVariability}
                onChange={(event) => setObjectVariability(Number(event.target.value))}
                className="w-full accent-electric"
              />
            </div>
            <div className="rounded-xl border border-line/80 bg-graphite/80 px-5 py-4 text-center lg:min-w-[260px]">
              <p className="text-2xl font-display font-semibold text-electric">
                {frameCount.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-mist/70">
                Auto-Annotated Frames Generated
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef(null);
  const redirectTimerRef = useRef(null);
  const router = useRouter();

  const clearSubmissionTimers = useCallback(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsSubmitting(false);
    setProgress(0);
    clearSubmissionTimers();
  }, [clearSubmissionTimers]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKey = (event) => {
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => () => clearSubmissionTimers(), [clearSubmissionTimers]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setProgress(0);

    const duration = 5000;
    const start = Date.now();

    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (next >= 100) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    }, 100);

    redirectTimerRef.current = setTimeout(() => {
      router.push("/coming-soon");
    }, duration);
  };

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
                Sim2Real Data Infrastructure
              </p>
              <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold leading-tight text-white">
                Procedurally Generating the Physical World via API.
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-mist leading-relaxed">
                Synthetic data infrastructure bridging the &quot;Sim2Real&quot;
                gap for Embodied AI. Upload a CAD file, inject semantic
                physical chaos, and deliver 10,000+ auto-annotated training
                frames directly into your CI/CD pipeline.
              </p>
              <div className="mt-6 sm:mt-8 grid gap-2 sm:gap-3 text-xs sm:text-sm text-mist">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  Frictionless API &amp; CAD (.STEP) Ingestion
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  Absolute Parametric Control via JSON
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  Zero Hardware CapEx
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric flex-shrink-0" />{" "}
                  Direct AWS S3 / VPC Injection
                </div>
              </div>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto text-center rounded-full bg-electric px-6 py-3 text-sm font-semibold text-graphite shadow-glow hover:bg-electricDark transition"
                >
                  Start Frictionless Trial
                </button>
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center rounded-full border border-electric/40 px-6 py-3 text-sm font-semibold text-white hover:bg-electric/10 transition"
                >
                  Book Enterprise Demo
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
                  Developer Studio
                </p>
                <span className="rounded-full border border-electric/40 px-3 py-1 text-xs text-electric">
                  API Pipeline
                </span>
              </div>
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <div className="rounded-2xl border border-line/80 bg-slate/70 p-4 sm:p-5">
                  <p className="text-xs text-mist/80 uppercase tracking-[0.3em]">
                    Input
                  </p>
                  <p className="mt-2 sm:mt-3 text-base sm:text-lg font-display">
                    Baseline 3D CAD (.STEP)
                  </p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-mist">
                    Air-gapped secure ingestion.
                  </p>
                </div>
                <div className="rounded-2xl border border-line/80 bg-slate/70 p-4 sm:p-5">
                  <p className="text-xs text-mist/80 uppercase tracking-[0.3em]">
                    Engine
                  </p>
                  <p className="mt-2 sm:mt-3 text-base sm:text-lg font-display">
                    Generative Synthesis Engine
                  </p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-mist">
                    Mathematical reconstruction of digital twins via ephemeral
                    compute.
                  </p>
                </div>
                <div className="rounded-2xl border border-line/80 bg-slate/70 p-5">
                  <p className="text-xs text-mist/80 uppercase tracking-[0.3em]">
                    Outcome
                  </p>
                  <p className="mt-3 text-lg font-display">
                    Auto-Annotated Datasets
                  </p>
                  <p className="mt-2 text-sm text-mist">
                    YOLO/COCO formats delivered securely via webhook.
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-electric/30 bg-electric/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-electric">
                  Visual Formula
                </p>
                <p className="mt-3 text-xl font-display">
                  1 CAD File → Procedural Generation → Pipeline Injection
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Sim2RealSimulator />

      <section className="section-padding" id="problem">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-title">The Data Scarcity Paradox</p>
            <h2 className="section-heading mt-4">
              Foundation models are starving for edge-case physical data.
            </h2>
            <p className="mt-6 text-mist leading-relaxed">
              Training robotic manipulation policies via manual human labeling
              is fundamentally unscalable. Basic 3D simulation engines fail to
              solve this because they lack accurate industrial material
              physics. Builders lack a scalable, purely software-driven data
              layer.
            </p>
          </div>
          <div className="card p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-3 w-3 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="font-display text-lg">
                    Manual Labeling Bottleneck
                  </p>
                  <p className="text-sm text-mist">
                    Expensive, slow annotation cycles limit model progress.
                  </p>
                </div>
              </div>
              <div className="h-px divider" />
              <div className="flex items-start gap-4">
                <div className="h-3 w-3 rounded-full bg-electric mt-2" />
                <div>
                  <p className="font-display text-lg">
                    Software-Defined Data Layer
                  </p>
                  <p className="text-sm text-mist">
                    Procedural synthesis generates edge-case coverage on demand.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-mist/60 font-mono">
              Replace collection loops with API generation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="solution">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">The Breakthrough</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="section-heading">
                Solving the Sim2Real Bottleneck
              </h2>
              <p className="mt-6 text-mist leading-relaxed">
                Visynex replaces physical data collection with a scalable API.
                Define physical constraints (lighting, material reflectivity,
                spatial anomalies) via a JSON payload, and our engine securely
                injects thousands of physically accurate frames directly into
                your cloud storage.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full border border-electric/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric">
                  Semantic payload control
                </span>
                <span className="rounded-full border border-electric/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric">
                  Ephemeral secure compute
                </span>
                <span className="rounded-full border border-electric/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric">
                  Direct cloud injection
                </span>
              </div>
            </div>
            <div className="card glass p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Breakthrough Output
              </p>
              <div className="mt-4 rounded-2xl border border-line/70 overflow-hidden">
                <img
                  src="/Example1.jpeg"
                  alt="Golden sample example"
                  className="h-38 w-full object-cover"
                />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-line/70 pb-4">
                  <p className="text-sm text-mist">Input</p>
                  <p className="font-display">1 CAD file</p>
                </div>
                <div className="flex items-center justify-between border-b border-line/70 pb-4">
                  <p className="text-sm text-mist">Generated output</p>
                  <p className="font-display">10,000+ frames</p>
                </div>
                <div className="flex items-center justify-between border-b border-line/70 pb-4">
                  <p className="text-sm text-mist">Formats</p>
                  <p className="font-display">YOLO / COCO</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-mist">Delivery</p>
                  <p className="font-display">Webhook + S3/VPC</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-electric/40 bg-electric/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-electric">
                  Formula
                </p>
                <p className="mt-2 text-lg font-display">
                  1 CAD File → Procedural Generation → Pipeline Injection
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
            Zero-hardware pipeline. Direct CI/CD injection.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Secure ingestion (.STEP / CAD)",
                text: "Upload baseline 3D assets through air-gapped secure channels.",
              },
              {
                title: "Semantic payload configuration (JSON)",
                text: "Set lighting, materials, anomalies, and physical constraints.",
              },
              {
                title: "Generative semantic injection",
                text: "Create physically accurate edge cases with auto-annotation.",
              },
              {
                title: "Direct pipeline webhook (S3/GCS)",
                text: "Stream datasets into your training stack with zero manual ops.",
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
              Zero hardware setup
            </span>
            <span className="rounded-full border border-line/70 px-4 py-2">
              API-first orchestration
            </span>
            <span className="rounded-full border border-line/70 px-4 py-2">
              CI/CD-ready delivery
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding" id="edge">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="section-title">Zero Exposure</p>
            <h2 className="section-heading mt-4">
              Air-gapped security architecture.
            </h2>
            <p className="mt-6 text-mist leading-relaxed">
              Synthesis runs on isolated, ephemeral cloud compute clusters.
              Rendering memory is purged instantly upon delivery. We never train
              shared foundation models on your proprietary IP.
            </p>
          </div>
          <div className="card glass p-8 space-y-6">
            <div className="flex flex-col gap-3 rounded-xl border border-line/70 bg-slate/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Powered by
              </p>
              <img
                src="/Nvidia.png"
                alt="NVIDIA logo"
                className="h-34 w-full object-contain sm:h-52 sm:w-auto lg:h-56"
              />
            </div>
            {[
              "Isolated ephemeral workloads per dataset job",
              "Memory purged immediately after delivery",
              "No shared-model training on proprietary assets",
              "Secure webhook delivery to private storage",
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
            Embodied AI builders and enterprise robotics OEMs.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Target Segments
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
            Manual collection is unscalable. Simulators lack physics. We provide
            both.
          </h2>
          <div className="mt-10 card overflow-hidden">
            <div className="grid grid-cols-4 gap-4 border-b border-line/70 bg-slate/80 p-6 text-xs uppercase tracking-[0.2em] text-mist">
              <span>Category</span>
              <span>Manual Collection</span>
              <span>Basic Simulators</span>
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
            API-First economics built for massive scalability.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Pay-Per-Dataset API
              </p>
              <p className="mt-4 text-3xl font-display">$5,000 flat fee</p>
              <p className="mt-2 text-mist">Per generated dataset batch</p>
              <ul className="mt-6 space-y-3 text-sm text-mist">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  CAD and JSON payload ingestion
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  10,000+ frame generation batches
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Auto-annotation + secure delivery
                </li>
              </ul>
            </div>
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Enterprise SaaS License
              </p>
              <p className="mt-4 text-3xl font-display">Continuous API access</p>
              <p className="mt-2 text-mist">For high-throughput ML platforms</p>
              <ul className="mt-6 space-y-3 text-sm text-mist">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Programmatic batch orchestration
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  Dedicated VPC and governance controls
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-electric mt-2" />{" "}
                  SLA-backed enterprise support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="traction">
        <div className="mx-auto max-w-6xl">
          <p className="section-title">Validation</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="section-heading">API telemetry and zero-shot deployment.</h2>
              <p className="mt-6 text-mist leading-relaxed">
                OMSA Automotive utilized our standardized API to train their
                visual control policies. The Embodied AI successfully identified
                structural anomalies on Day 1 without ever seeing a real-world
                defect, achieving 99.5% accuracy trained entirely on Visynex
                data.
              </p>
            </div>
            <div className="card glass p-8 space-y-4">
              {[
                "Standardized API integrated in production telemetry",
                "Day 1 anomaly detection without real defect history",
                "99.5% zero-shot deployment accuracy",
                "Training data generated entirely via Visynex",
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
            The Frictionless Trial that proves Sim2Real efficacy.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Instant Proof Loop
              </p>
              <ol className="mt-6 space-y-4 text-mist">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" />{" "}
                  ML engineer uploads 1 CAD file
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" /> We
                  inject 50 free edge-cases to their AWS S3 bucket
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-electric" />{" "}
                  Validated Sim2Real fit before enterprise rollout
                </li>
              </ol>
            </div>
            <div className="card glass p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                Deployment Pattern
              </p>
              <div className="mt-6 space-y-4 text-mist">
                <p className="text-sm">Self-serve API onboarding</p>
                <p className="text-sm">Enterprise expansion via telemetry proof</p>
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
              The Sovereign Data Flywheel for the physical world.
            </h2>
            <p className="mt-6 text-mist leading-relaxed">
              Visynex is not just generating static datasets; we are building
              the continuous data engine for automation developers. As robots
              encounter new anomalies, engineers ping our API to generate
              instant patch datasets.
            </p>
            <div className="mt-8 rounded-2xl border border-line/70 overflow-hidden">
              <img
                src="/Ai-chips.png"
                alt="AI chip cluster"
                className="h-44 w-full object-cover"
              />
            </div>
            <p className="mt-8 text-xl font-display text-white">
              “Continuous synthetic data closes the Sim2Real loop.”
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" id="contact">
        <div className="mx-auto max-w-6xl">
          <div className="card glass p-10 text-center">
            <p className="section-title">Ready to Deploy</p>
            <h2 className="section-heading mt-4">
              Build the Next Generation of Embodied AI.
            </h2>
            <p className="mt-4 text-mist">
              Upload a baseline asset to our API and inject physically accurate
              edge cases directly into your training pipeline today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:visynex1@gmail.com"
                className="rounded-full bg-electric px-6 py-3 text-sm font-semibold text-graphite shadow-glow hover:bg-electricDark transition"
              >
                Access Developer Portal
              </a>
              <a
                href="mailto:visynex1@gmail.com"
                className="rounded-full border border-electric/40 px-6 py-3 text-sm font-semibold text-white hover:bg-electric/10 transition"
              >
                Book a Pilot
              </a>
              <a
                href="mailto:visynex1@gmail.com"
                className="rounded-full border border-line/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal overlay"
            className="absolute inset-0 bg-graphite/80 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-modal-title"
            className="relative w-full max-w-lg rounded-2xl border border-line/70 bg-slate/90 p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                  Send One Photo
                </p>
                <h3
                  id="photo-modal-title"
                  className="mt-2 text-xl font-display text-white"
                >
                  Upload a sample part
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-full border border-line/70 px-3 py-1 text-xs text-mist transition hover:border-electric/40 hover:text-white"
              >
                Close
              </button>
            </div>
            <form
              className="mt-6 space-y-4"
              onSubmit={handleSubmit}
            >
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                  Material
                </span>
                <select
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-line/70 bg-graphite/60 px-4 py-3 text-sm text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="">Select material</option>
                  {materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                  Defect
                </span>
                <select
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-line/70 bg-graphite/60 px-4 py-3 text-sm text-white outline-none transition focus:border-electric/60 focus:ring-2 focus:ring-electric/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="">Select defect type</option>
                  {defects.map((defect) => (
                    <option key={defect} value={defect}>
                      {defect}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.3em] text-mist/70 font-mono">
                  Upload Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl border border-line/70 bg-graphite/60 px-4 py-3 text-sm text-mist file:mr-4 file:rounded-full file:border-0 file:bg-electric file:px-4 file:py-2 file:text-xs file:font-semibold file:text-graphite hover:file:bg-electricDark disabled:cursor-not-allowed disabled:opacity-70"
                />
              </label>
              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-mist">
                    <span>Analyzing photo...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-graphite/70">
                    <div
                      className="h-full rounded-full bg-electric transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-electric px-6 py-3 text-sm font-semibold text-graphite shadow-glow transition hover:bg-electricDark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

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
            The Sim2Real data layer for industrial automation.
          </p>
        </div>
      </footer>
    </div>
  );
}
