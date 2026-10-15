
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";


export default function CaptainLogin() {

  const navigate = useNavigate();

const { captain, setCaptain } = useContext(CaptainDataContext);


  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const captain = {
     
     email: form.email,
     password: form.password,
     phone: form.phone,
   };
 
   
     const response = await axios.post(
       `${import.meta.env.VITE_BASE_URL}/captains/login`,
       captain
     );
 
     if (response.status === 200) {
      const data = response.data
       setCaptain(data.captain);
       localStorage.setItem('token', JSON.stringify(data.token))
       navigate("/captain-home");
     }
   
    // Connect your captain login API here.
    console.log("Captain login submitted:", form.email);
  };

  return (
    <main className="min-h-screen bg-[#050912] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left branding section */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-slate-800 bg-[#080f1c] p-12 lg:flex xl:p-16">
          <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-2xl text-black">
              🚘
            </span>
            <span className="text-3xl font-extrabold">
              Aapki<span className="text-yellow-400">Ride</span>
            </span>
          </Link>

          <div className="relative z-10 my-12 max-w-xl">
            <p className="mb-5 text-xs font-bold tracking-[0.25em] text-yellow-400">
              CAPTAIN PARTNER
            </p>

            <h1 className="text-5xl font-extrabold leading-tight xl:text-6xl">
              Your journey
              <br />
              <span className="text-yellow-400">to earning starts here.</span>
            </h1>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Log in to manage your rides, connect with passengers,
              and grow with AapkiRide.
            </p>

            <div className="mt-10 space-y-4 text-sm text-slate-300">
              <p>✓ Manage your trips</p>
              <p>✓ Track your earnings</p>
              <p>✓ Ride on your schedule</p>
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-500">
            © {new Date().getFullYear()} AapkiRide Captain
          </p>

          <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />
        </section>

        {/* Login form */}
        <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 sm:py-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mx-auto mb-8 flex w-fit items-center gap-3 lg:hidden"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-2xl text-black">
                🚘
              </span>
              <span className="text-3xl font-extrabold">
                Aapki<span className="text-yellow-400">Ride</span>
              </span>
            </Link>

            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-3xl">
                🚖
              </div>

              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-yellow-400">
                CAPTAIN PORTAL
              </p>

              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Welcome Back, Captain
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Log in to continue your driving journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="captain-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="captain-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="captain@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 outline-none placeholder:text-slate-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/15"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="captain-password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    to="/captain/forgot-password"
                    className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 sm:text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="captain-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 pr-16 outline-none placeholder:text-slate-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-4 text-sm font-semibold text-slate-400 hover:text-yellow-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-yellow-400"
                />
                Remember me
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-400 px-5 py-4 font-extrabold text-black transition hover:bg-yellow-300"
              >
                Captain Log In <span className="text-xl">→</span>
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs text-slate-500">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => console.log("Connect Google captain login")}
                className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm font-semibold hover:border-yellow-400/60"
              >
                <span className="text-lg font-bold">G</span>
                Google
              </button>

              <button
                type="button"
                onClick={() => console.log("Connect Apple captain login")}
                className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm font-semibold hover:border-yellow-400/60"
              >
                <span className="text-xl">●</span>
                Apple
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-400">
              New to AapkiRide Captain?{" "}
              <Link
                to="/CaptainSignup"
                className="font-bold text-yellow-400 hover:underline"
              >
                Register Now
              </Link>
            </p>

            <p className="mt-5 text-center text-sm text-slate-500">
              Looking for a passenger account?{" "}
              <Link
                to="/UserLogin"
                className="text-yellow-400 hover:underline"
              >
               Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}