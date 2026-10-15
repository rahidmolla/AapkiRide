
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const places = [
  {
    name: "Current Location",
    address: "Your present location",
    coords: [22.5726, 88.3639],
  },
  {
    name: "Narula Institute of Technology",
    address: "Agarpara, Kolkata",
    coords: [22.6814, 88.3784],
  },
  {
    name: "Kolkata Airport",
    address: "Dum Dum, Kolkata",
    coords: [22.6547, 88.4467],
  },
  {
    name: "Howrah Railway Station",
    address: "Howrah, West Bengal",
    coords: [22.5838, 88.3426],
  },
  {
    name: "Sealdah Station",
    address: "Sealdah, Kolkata",
    coords: [22.5675, 88.3700],
  },
  {
    name: "Park Street",
    address: "Central Kolkata",
    coords: [22.5535, 88.3520],
  },
  {
    name: "Salt Lake Sector V",
    address: "Bidhannagar, Kolkata",
    coords: [22.5697, 88.4330],
  },
];

const rides = [
  {
    id: "Bike",
    icon: "🏍️",
    name: "Bike",
    description: "Affordable solo rides",
    price: 45,
    arrival: "3 min",
  },
  {
    id: "Auto",
    icon: "🛺",
    name: "Auto",
    description: "Quick city travel",
    price: 75,
    arrival: "5 min",
  },
  {
    id: "Car",
    icon: "🚘",
    name: "AapkiRide Car",
    description: "Comfortable rides",
    price: 149,
    arrival: "6 min",
  },
];

function MapController({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 13, { duration: 0.8 });
  }, [map, center]);

  return null;
}

function BottomNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { name: "Home", icon: "⌂" },
    { name: "Activity", icon: "◷" },
    { name: "Wallet", icon: "▤" },
    { name: "Profile", icon: "♙" },
  ];

  return (
    <nav className="mt-5 grid grid-cols-4 border-t border-white/10 pt-4">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => onTabChange(tab.name)}
          className={`flex flex-col items-center gap-1 text-xs transition ${
            activeTab === tab.name
              ? "font-bold text-[#ffc20e]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          {tab.name}
        </button>
      ))}
    </nav>
  );
}

export default function Home() {
  const [pickup, setPickup] = useState(places[0]);
  const [destination, setDestination] = useState(null);
  const [selectedRide, setSelectedRide] = useState("Bike");

  const [screen, setScreen] = useState("home");
  const [searchType, setSearchType] = useState("destination");
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("Home");
  const [message, setMessage] = useState("");

  const selectedRideInfo = rides.find(
    (ride) => ride.id === selectedRide
  );

  const mapCenter =
    screen === "rides" || screen === "tracking"
      ? destination?.coords || pickup.coords
      : pickup.coords;

  const filteredPlaces = places.filter((place) =>
    `${place.name} ${place.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openSearch(type) {
    setSearchType(type);
    setSearch("");
    setMessage("");
    setScreen("search");
  }

  function selectPlace(place) {
    if (searchType === "pickup") {
      setPickup(place);
      setScreen("home");
    } else {
      setDestination(place);
      setScreen("rides");
    }

    setSearch("");
    setMessage("");
  }

  function handleConfirmRide() {
    if (!destination) {
      openSearch("destination");
      return;
    }

    setScreen("tracking");
    setMessage(
      `Demo booking preview: ${selectedRideInfo.name} · ₹${selectedRideInfo.price}+`
    );
  }

  function handleTabChange(tab) {
    setActiveTab(tab);

    if (tab === "Home") {
      setScreen("home");
      setMessage("");
    } else {
      setMessage(`${tab} screen is a UI placeholder.`);
    }
  }

  return (
    <main className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-[#080d16] font-sans text-white">

      {/* MAP BACKGROUND */}
      <div className="absolute inset-0">
        <MapContainer
          center={pickup.coords}
          zoom={13}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController center={mapCenter} />

          <CircleMarker
            center={pickup.coords}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 4,
              fillColor: "#ffc20e",
              fillOpacity: 1,
            }}
          />

          {destination && (
            <>
              <CircleMarker
                center={destination.coords}
                radius={8}
                pathOptions={{
                  color: "#ffffff",
                  weight: 3,
                  fillColor: "#111827",
                  fillOpacity: 1,
                }}
              />

              <Polyline
                positions={[
                  pickup.coords,
                  destination.coords,
                ]}
                pathOptions={{
                  color: "#ffc20e",
                  weight: 4,
                  dashArray: "8 9",
                }}
              />
            </>
          )}
        </MapContainer>
      </div>

      {/* BRAND HEADER */}
      {screen !== "search" && (
        <header className="absolute left-0 right-0 top-0 z-[500] flex items-center justify-between bg-gradient-to-b from-[#080d16] via-[#080d16]/90 to-transparent px-5 pb-8 pt-10">
          <button
            onClick={() => {
              setScreen("home");
              setActiveTab("Home");
              setMessage("");
            }}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffc20e] text-2xl text-black">
              🚕
            </span>

            <span>
              <span className="block text-2xl font-extrabold tracking-tight">
                Aapki<span className="text-[#ffc20e]">Ride</span>
              </span>

              <span className="block text-[10px] tracking-[1.5px] text-slate-300">
                YOUR RIDE. OUR PRIORITY.
              </span>
            </span>
          </button>

          <button
            onClick={() =>
              setMessage("Notifications UI placeholder.")
            }
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111925] text-xl"
            aria-label="Notifications"
          >
            ♧
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </header>
      )}

      {/* MAP CONTROLS */}
      {screen !== "search" && (
        <div className="absolute right-4 top-32 z-[500] flex flex-col gap-3">
          <button
            onClick={() => openSearch("pickup")}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-black shadow-xl"
            aria-label="Change pickup location"
          >
            ◎
          </button>

          <button
            onClick={() =>
              setMessage(
                "Demo location. Real GPS will be connected later."
              )
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#111925] text-2xl shadow-xl"
            aria-label="Current location"
          >
            ⌖
          </button>
        </div>
      )}

      {/* HOME SCREEN */}
      {screen === "home" && (
        <section className="animate-slide-up absolute bottom-0 left-0 right-0 z-[500] max-h-[78dvh] overflow-y-auto rounded-t-[30px] border-t border-white/10 bg-[#080d16]/[.97] px-5 pb-5 pt-3 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-slate-600" />

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">Where to?</h1>
              <p className="mt-1 text-sm text-slate-400">
                Your next journey starts here.
              </p>
            </div>

            <span className="text-3xl">📍</span>
          </div>

          {/* PICKUP AND DESTINATION */}
          <div className="rounded-2xl border border-white/10 bg-[#111925] p-4">
            <button
              onClick={() => openSearch("pickup")}
              className="flex w-full items-center gap-3 text-left"
            >
              <span className="h-3 w-3 shrink-0 rounded-full border-[3px] border-[#ffc20e]" />

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                  Pickup location
                </span>

                <span className="mt-1 block truncate text-sm font-semibold">
                  {pickup.name}
                </span>
              </span>

              <span className="text-slate-400">⌄</span>
            </button>

            <div className="my-3 ml-1.5 h-5 border-l border-dashed border-slate-600" />

            <button
              onClick={() => openSearch("destination")}
              className="flex w-full items-center gap-3 text-left"
            >
              <span className="h-3 w-3 shrink-0 rounded-sm bg-white" />

              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                  Destination
                </span>

                <span className={`mt-1 block truncate text-sm font-semibold ${
                  destination ? "text-white" : "text-slate-400"
                }`}>
                  {destination?.name || "Where do you want to go?"}
                </span>
              </span>

              <span className="text-slate-400">⌕</span>
            </button>
          </div>

          {/* RIDE OPTIONS */}
          <div className="mb-3 mt-5 flex items-center justify-between">
            <h2 className="text-sm font-bold">
              Your everyday rides
            </h2>

            <span className="text-xs text-slate-400">
              Choose your comfort
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {rides.map((ride) => (
              <button
                key={ride.id}
                onClick={() => setSelectedRide(ride.id)}
                className={`rounded-2xl border p-3 text-left transition-all duration-200 ${
                  selectedRide === ride.id
                    ? "scale-[1.02] border-[#ffc20e] bg-[#ffc20e]/10"
                    : "border-white/10 bg-[#111925] hover:border-slate-500"
                }`}
              >
                <span className="block text-3xl">
                  {ride.icon}
                </span>

                <span className="mt-2 block text-sm font-bold">
                  {ride.name}
                </span>

                <span className="mt-1 block text-xs text-slate-400">
                  ₹{ride.price}+
                </span>

                {selectedRide === ride.id && (
                  <span className="mt-2 block text-[9px] font-bold text-[#ffc20e]">
                    SELECTED ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!destination) {
                openSearch("destination");
              } else {
                setScreen("rides");
              }
            }}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ffc20e] py-4 font-extrabold text-black transition hover:bg-yellow-400 active:scale-[.98]"
          >
            {destination ? "View Ride Options" : "Choose Destination"}
            <span>→</span>
          </button>

          {message && (
            <div className="mt-3 rounded-xl border border-[#ffc20e]/20 bg-[#ffc20e]/10 p-3 text-sm text-yellow-200">
              {message}
            </div>
          )}

          <BottomNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </section>
      )}

      {/* FULL-SCREEN LOCATION SEARCH */}
      {screen === "search" && (
        <section className="animate-search-in absolute inset-0 z-[2000] flex flex-col bg-[#080d16]">
          <header className="flex items-center gap-4 px-5 pb-5 pt-10">
            <button
              onClick={() => setScreen("home")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111925] text-2xl"
              aria-label="Go back"
            >
              ←
            </button>

            <div>
              <h2 className="text-xl font-extrabold">
                {searchType === "pickup"
                  ? "Pickup location"
                  : "Where to?"}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Search a place in Kolkata
              </p>
            </div>
          </header>

          <div className="mx-5 mb-4 rounded-2xl border border-[#ffc20e]/50 bg-[#111925] p-4">
            <label className="mb-3 block text-xs text-slate-400">
              {searchType === "pickup"
                ? "PICKUP"
                : "DESTINATION"}
            </label>

            <div className="flex items-center gap-3">
              <span className="text-xl text-[#ffc20e]">⌕</span>

              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Enter a location..."
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-500"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-xl text-slate-400"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => selectPlace(places[0])}
            className="mx-5 mb-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111925] p-4 text-left"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffc20e]/10 text-xl text-[#ffc20e]">
              ◎
            </span>

            <span>
              <span className="block font-bold">
                Use current location
              </span>

              <span className="mt-1 block text-xs text-slate-400">
                Select demo location
              </span>
            </span>
          </button>

          <p className="px-5 pb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            {search ? "Search results" : "Suggested places"}
          </p>

          <div className="flex-1 overflow-y-auto px-5 pb-8">
            {filteredPlaces.map((place) => (
              <button
                key={place.name}
                onClick={() => selectPlace(place)}
                className="flex w-full items-center gap-4 border-b border-white/10 py-4 text-left transition hover:bg-white/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111925] text-xl">
                  ⌖
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {place.name}
                  </span>

                  <span className="mt-1 block truncate text-xs text-slate-400">
                    {place.address}
                  </span>
                </span>

                <span className="text-slate-400">→</span>
              </button>
            ))}

            {filteredPlaces.length === 0 && (
              <p className="py-10 text-center text-sm text-slate-400">
                No demo places found. Try another search.
              </p>
            )}
          </div>
        </section>
      )}

      {/* RIDE OPTIONS SCREEN */}
      {screen === "rides" && (
        <section className="animate-slide-up absolute bottom-0 left-0 right-0 z-[500] max-h-[85dvh] overflow-y-auto rounded-t-[30px] border-t border-white/10 bg-[#080d16]/[.98] px-5 pb-6 pt-4 shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">
                Choose your ride
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Review your journey and fare.
              </p>
            </div>

            <button
              onClick={() => setScreen("home")}
              className="rounded-full border border-white/15 px-4 py-2 text-sm"
            >
              ← Back
            </button>
          </div>

          <div className="mb-5 rounded-2xl border border-white/10 bg-[#111925] p-4">
            <p className="text-xs text-slate-400">FROM</p>
            <p className="mb-3 mt-1 font-semibold">
              {pickup.name}
            </p>

            <div className="mb-3 border-t border-dashed border-slate-700" />

            <p className="text-xs text-slate-400">TO</p>
            <p className="mt-1 font-semibold">
              {destination?.name || "Choose a destination"}
            </p>
          </div>

          <div className="space-y-3">
            {rides.map((ride) => (
              <button
                key={ride.id}
                onClick={() => setSelectedRide(ride.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  selectedRide === ride.id
                    ? "border-[#ffc20e] bg-[#ffc20e]/10"
                    : "border-white/10 bg-[#111925]"
                }`}
              >
                <span className="text-4xl">{ride.icon}</span>

                <span className="min-w-0 flex-1">
                  <span className="block font-bold">
                    {ride.name}
                  </span>

                  <span className="mt-1 block text-xs text-slate-400">
                    {ride.arrival} away · {ride.description}
                  </span>
                </span>

                <span className="font-extrabold">
                  ₹{ride.price}+
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirmRide}
            className="mt-5 w-full rounded-2xl bg-[#ffc20e] py-4 font-extrabold text-black transition hover:bg-yellow-400 active:scale-[.98]"
          >
            Confirm Demo Ride · ₹{selectedRideInfo.price}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Demo fares only. No payment or driver booking is performed.
          </p>
        </section>
      )}

      {/* BOOKING PREVIEW */}
      {screen === "tracking" && (
        <section className="animate-slide-up absolute bottom-0 left-0 right-0 z-[500] rounded-t-[30px] border-t border-white/10 bg-[#080d16]/[.98] px-5 pb-7 pt-5 shadow-2xl">
          <button
            onClick={() => setScreen("rides")}
            className="mb-4 text-sm text-slate-400"
          >
            ← Back
          </button>

          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffc20e]/10 text-3xl">
              {selectedRideInfo.icon}
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold">
                Booking preview
              </h2>

              <p className="mt-1 text-sm text-[#ffc20e]">
                Demo booking created
              </p>
            </div>

            <span className="text-xl font-extrabold">
              ₹{selectedRideInfo.price}+
            </span>
          </div>

          <div className="rounded-2xl border border-[#ffc20e]/20 bg-[#ffc20e]/10 p-4">
            <p className="font-semibold text-yellow-200">
              {message}
            </p>

            <p className="mt-2 text-sm text-slate-300">
              No real driver has been requested. Connect your backend
              to enable actual ride bookings.
            </p>
          </div>

          <div className="my-5 rounded-2xl border border-white/10 bg-[#111925] p-4">
            <p className="text-xs text-slate-400">PICKUP</p>
            <p className="mb-3 mt-1 font-semibold">
              {pickup.name}
            </p>

            <p className="text-xs text-slate-400">DESTINATION</p>
            <p className="mt-1 font-semibold">
              {destination?.name}
            </p>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-3">
            {[
              { icon: "×", label: "Cancel" },
              { icon: "↗", label: "Share" },
              { icon: "☎", label: "Emergency" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  setMessage(
                    `${item.label} is a demo control and is not connected.`
                  )
                }
                className="rounded-xl border border-white/10 bg-[#111925] p-3"
              >
                <span className="block text-xl">{item.icon}</span>
                <span className="mt-1 block text-xs">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setScreen("home");
              setMessage("");
            }}
            className="w-full rounded-2xl bg-[#ffc20e] py-4 font-extrabold text-black"
          >
            Back to AapkiRide Home
          </button>
        </section>
      )}
    </main>
  );
}

