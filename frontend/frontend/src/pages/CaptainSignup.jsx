import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";


export default function CaptainSignup() {

 const navigate = useNavigate();

const { captain, setCaptain } = useContext(CaptainDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    vehicleType: "Bike",
    vehicleCapacity: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/register`,
          newCaptain
        );
    
        if (response.status === 201) {
          const data = response.data
                 setCaptain(data.captain);
          localStorage.setItem('token', JSON.stringify(data.token))
          navigate("/captain-home");
        }
      
    

    // Connect your captain registration API here.
    console.log("Captain registration submitted:", {
      ...form,
      password: "[hidden]",
      confirmPassword: "[hidden]",
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3.5 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/15";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-200";

  return (
    <main className="min-h-screen bg-[#050912] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-2xl text-black">
            🚘
          </span>
          <span className="text-3xl font-extrabold">
            Aapki<span className="text-yellow-400">Ride</span>
          </span>
        </Link>

        <header className="mb-8 text-center">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-yellow-400">
            BECOME A CAPTAIN
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Captain Registration
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Register to start your journey with AapkiRide.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-800 bg-[#080f1c] p-5 sm:p-8"
        >
          <section>
            <h2 className="mb-4 text-lg font-bold">Personal Information</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="lastName" className={labelClass}>
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
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="phone" className={labelClass}>
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
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="captain@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </section>

          <div className="h-px bg-slate-800" />

          <section>
            <h2 className="mb-4 text-lg font-bold">Vehicle Information</h2>

            <div>
              <label htmlFor="vehicleType" className={labelClass}>
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="vehicleCapacity" className={labelClass}>
                Vehicle Registration Number
              </label>
              <input
                id="vehicleCapacity"
                name="vehicleCapacity"
                placeholder="e.g. WB 01 AB 1234"
                value={form.vehicleCapacity}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="licenseNumber" className={labelClass}>
                Driving Licence Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                placeholder="Enter licence number"
                value={form.licenseNumber}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Your documents must be verified before you can accept rides.
              </p>
            </div>
          </section>

          <div className="h-px bg-slate-800" />

          <section>
            <h2 className="mb-4 text-lg font-bold">Create Password</h2>

            <div>
              <label htmlFor="password" className={labelClass}>
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
                  className={`${inputClass} pr-16`}
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

            <div className="mt-4">
              <label htmlFor="confirmPassword" className={labelClass}>
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
                  className={`${inputClass} pr-16`}
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
          </section>

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-yellow-400"
            />
            <span>
              I confirm that the information provided is accurate and agree
              to AapkiRide's Terms of Service and Privacy Policy.
            </span>
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-400 px-5 py-4 font-extrabold text-black transition hover:bg-yellow-300"
          >
            Register as Captain <span className="text-xl">→</span>
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link
            to="/captain/login"
            className="font-bold text-yellow-400 hover:underline"
          >
            Captain Log In
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-slate-500">
          Passenger account?{" "}
          <Link to="/UserSignup" className="text-yellow-400 hover:underline">
            User Signup
          </Link>
        </p>
      </div>
    </main>
  );
}