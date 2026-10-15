import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const navigate = useNavigate();
  
  const { user, setUser } = useContext(UserDataContext);
  
  
 const handleSubmit = async (e) => {
   e.preventDefault();
 
 
   const userData = {
     
     email: form.email,
     password: form.password,
     phone: form.phone,
   };
 
   
     const response = await axios.post(
       `${import.meta.env.VITE_BASE_URL}/users/login`,
       userData
     );
 
     if (response.status === 200) {
      const data = response.data
       setUser(data.user);
       localStorage.setItem('token', JSON.stringify(data.token))
       navigate("/home");
     }
   } 

  return (
    <main className="min-h-screen bg-[#050912] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
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
              YOUR JOURNEY STARTS HERE
            </p>
            <h1 className="text-5xl font-extrabold leading-tight xl:text-6xl">
              Every ride,
              <br />
              <span className="text-yellow-400">a better journey.</span>
            </h1>
            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Get where you need to go with convenient rides,
              trusted drivers, and a smoother booking experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Safe rides", "Quick booking", "Live tracking"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300"
                >
                  <span className="mr-2 text-yellow-400">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-500">
            © {new Date().getFullYear()} AapkiRide. Your Ride. Our Priority.
          </p>
          <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />
        </section>

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

            <div className="mb-8 text-center sm:mb-10">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-3xl">
                👋
              </div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Welcome Back
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Log in to continue your journey with AapkiRide.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 outline-none placeholder:text-slate-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/15"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-200"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 sm:text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-400 px-5 py-4 font-extrabold text-black transition hover:bg-yellow-300 active:scale-[0.99]"
              >
                Log In <span className="text-xl">→</span>
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
                onClick={() => console.log("Connect Google sign-in")}
                className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm font-semibold hover:border-yellow-400/60"
              >
                <span className="text-lg font-bold">G</span>
                Google
              </button>
              <button
                type="button"
                onClick={() => console.log("Connect Apple sign-in")}
                className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm font-semibold hover:border-yellow-400/60"
              >
                <span className="text-xl">●</span>
                Apple
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/UserSignup"
                className="font-bold text-yellow-400 hover:underline"
              >
                Sign Up
              </Link>
            </p>

<div className="mt-4 text-center">
  <p className="text-gray-400 text-sm">
    Are you a driver?{" "}
    <Link
      to="/CaptainLogin"
      className="font-semibold text-yellow-400 hover:text-yellow-300 transition"
    >
      Login as Captain
    </Link>
  </p>
</div>


            <p className="mt-8 text-center text-xs leading-5 text-slate-600">
              By continuing, you agree to AapkiRide's Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}