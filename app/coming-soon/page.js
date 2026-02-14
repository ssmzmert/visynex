export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-graphite text-white section-padding">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="section-title">Submission Received</p>
        <h1 className="section-heading mt-4">Coming Soon</h1>
        <p className="mt-4 max-w-xl text-mist">
          Thanks for submitting. We are preparing your test results experience.
          It will be available soon.
        </p>
        <a
          href="/"
          className="mt-8 rounded-full border border-electric/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-electric/10"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
