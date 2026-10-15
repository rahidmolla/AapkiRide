
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";

export default function UserSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

const { user, setUser } = useContext(UserDataContext);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const newUser = {
    fullname: {
      firstname: form.firstName,
      lastname: form.lastName,
    },
    email: form.email,
    password: form.password,
    phone: form.phone,
  };

  
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data
             setUser(data.user);
      localStorage.setItem('token', JSON.stringify(data.token))
      navigate("/home");
    }
  } 


  return (
    <main className="min-h-screen bg-[#050912] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-md">
        <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-2xl text-black">
            🚘
          </span>
          <span className="text-3xl font-extrabold">
            Aapki<span className="text-yellow-400">Ride</span>
          </span>
        </Link>

        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Join AapkiRide and make every journey easier.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-semibold"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 outline-none placeholder:text-slate-500 focus:border-yellow-400"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-semibold"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 outline-none placeholder:text-slate-500 focus:border-yellow-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 outline-none placeholder:text-slate-500 focus:border-yellow-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
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
              className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 outline-none placeholder:text-slate-500 focus:border-yellow-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 pr-16 outline-none placeholder:text-slate-500 focus:border-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 text-sm text-slate-400 hover:text-yellow-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 pr-16 outline-none placeholder:text-slate-500 focus:border-yellow-400"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-0 px-4 text-sm text-slate-400 hover:text-yellow-400"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-400 px-5 py-4 font-extrabold text-black transition hover:bg-yellow-300"
          >
            Create Account <span className="text-xl">→</span>
          </button>
        </form>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs text-slate-500">OR SIGN UP WITH</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => console.log("Connect Google sign-up")}
            className="rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 font-semibold hover:border-yellow-400/60"
          >
            G&nbsp; Google
          </button>
          <button
            type="button"
            onClick={() => console.log("Connect Apple sign-up")}
            className="rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 font-semibold hover:border-yellow-400/60"
          >
            ●&nbsp; Apple
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/UserLogin"
            className="font-bold text-yellow-400 hover:underline"
          >
            Log In
          </Link>
        </p>
        x
<div className="mt-4 text-center">
  <p className="text-gray-400 text-sm">
    Want to drive with us?{" "}
    <Link
      to="/CaptainSignup"
      className="font-semibold text-yellow-400 hover:text-yellow-300 transition"
    >
      Register as Captain
    </Link>
  </p>
</div>


      </div>
    </main>
  );
}