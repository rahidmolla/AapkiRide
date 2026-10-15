
import { Link } from "react-router-dom";

const features = [
  { icon: "🛡️", title: "Safe Rides", subtitle: "Verified Drivers" },
  { icon: "⚡", title: "Fast Booking", subtitle: "In Minutes" },
  { icon: "₹", title: "Affordable", subtitle: "Best Prices" },
  { icon: "📍", title: "Track Live", subtitle: "Real-time Location" },
];

export default function Start() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050912] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-2xl text-black">
            🚘
          </span>
          <span className="text-2xl font-extrabold sm:text-3xl">
            Aapki<span className="text-yellow-400">Ride</span>
          </span>
        </Link>

        <p className="hidden text-xs text-slate-400 md:block">
          Your Ride. Our Priority.
        </p>

        <Link
          to="/UserUserUserUserUserLogin"
          className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400"
        >
          Log In
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-5 sm:px-8 lg:grid-cols-2 lg:py-12">
        <div className="order-2 lg:order-1">
          <p className="mb-5 text-xs font-bold tracking-[0.25em] text-yellow-400">
            YOUR JOURNEY, YOUR WAY
          </p>

          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl xl:text-7xl">
            Ride Anytime,
            <br />
            <span className="text-yellow-400">Anywhere</span>
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-300 sm:text-lg">
            Book bikes or cars in just a few taps.
          </p>

          <p className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span>Safe</span>
            <span className="text-yellow-400">•</span>
            <span>Fast</span>
            <span className="text-yellow-400">•</span>
            <span>Affordable</span>
          </p>

          <div className="mt-9">
            <Link
              to="/UserSignup"
              className="inline-flex w-full max-w-xs items-center justify-center gap-5 rounded-xl bg-yellow-400 px-7 py-4 text-lg font-extrabold text-black transition hover:-translate-y-1 hover:bg-yellow-300"
            >
              Get Started <span className="text-2xl">→</span>
            </Link>

            <p className="mt-5 text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/UserLogin"
                className="font-bold text-yellow-400 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        <div
          className="relative order-1 min-h-[260px] overflow-hidden rounded-3xl border border-slate-800 bg-cover bg-center shadow-2xl sm:min-h-[390px] lg:order-2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=85')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050912] via-transparent to-black/10" />
          <p className="absolute bottom-6 left-6 text-sm font-semibold sm:text-base">
            <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-yellow-400" />
            Your next ride is just a tap away
          </p>
        </div>
      </section>

      <section className="mx-auto mb-8 grid max-w-6xl grid-cols-2 rounded-2xl border border-slate-800 bg-slate-900/50 px-2 py-4 sm:px-5 lg:grid-cols-4">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`px-2 py-5 text-center sm:px-4 ${
              index % 2 === 0 ? "border-r border-slate-800 lg:border-r" : ""
            } ${
              index < 2 ? "border-b border-slate-800 lg:border-b-0" : ""
            } ${
              index === 1 || index === 2 ? "lg:border-r" : ""
            }`}
          >
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-yellow-400/10 text-2xl">
              {feature.icon}
            </div>
            <h2 className="text-sm font-bold sm:text-base">
              {feature.title}
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              {feature.subtitle}
            </p>
          </article>
        ))}
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
        <p>Made for your everyday journeys.</p>
        <p>© {new Date().getFullYear()} AapkiRide</p>
      </footer>
    </main>
  );
}