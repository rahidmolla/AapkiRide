
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultLocation = [22.5726, 88.3639];

function MapController({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 13, { duration: 0.8 });
  }, [map, center]);

  return null;
}

const demoRequests = [
  {
    id: 1,
    passenger: "Rahul S.",
    pickup: "Park Street, Kolkata",
    destination: "Howrah Railway Station",
    distance: "1.2 km",
    tripDistance: "8.5 km",
    fare: 185,
    type: "Car",
  },
  {
    id: 2,
    passenger: "Priya M.",
    pickup: "Sealdah Station",
    destination: "Salt Lake Sector V",
    distance: "800 m",
    tripDistance: "6.2 km",
    fare: 140,
    type: "Bike",
  },
];

export default function CaptainHome() {
  const [online, setOnline] = useState(false);
  const [request, setRequest] = useState(null);
  const [trip, setTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  const [notice, setNotice] = useState("");

  const [earnings, setEarnings] = useState(0);
  const [completedTrips, setCompletedTrips] = useState(0);

  function toggleOnline() {
    const nextStatus = !online;
    setOnline(nextStatus);
    setNotice(
      nextStatus
        ? "You are online. Demo ride requests are available."
        : "You are offline and will not receive demo requests."
    );

    if (!nextStatus) {
      setRequest(null);
    }
  }

  function showDemoRequest() {
    if (!online) {
      setNotice("Go online first to receive a demo ride request.");
      return;
    }

    if (trip) {
      setNotice("Complete your current demo trip first.");
      return;
    }

    setRequest(demoRequests[0]);
    setNotice("");
    setActiveTab("Home");
  }

  function acceptRequest() {
    if (!request) return;

    setTrip({
      ...request,
      status: "accepted",
    });

    setRequest(null);
    setNotice("Ride accepted. Continue to pickup.");
  }

  function rejectRequest() {
    setRequest(null);
    setNotice("Demo ride request rejected.");
  }

  function advanceTrip() {
    if (!trip) return;

    if (trip.status === "accepted") {
      setTrip({ ...trip, status: "arrived" });
      setNotice("You have arrived at the pickup location.");
    } else if (trip.status === "arrived") {
      setTrip({ ...trip, status: "started" });
      setNotice("Demo trip started. Drive safely.");
    } else if (trip.status === "started") {
      setEarnings((previous) => previous + trip.fare);
      setCompletedTrips((previous) => previous + 1);
      setTrip(null);
      setNotice(`Trip completed. ₹${trip.fare} added to demo earnings.`);
    }
  }

  function cancelTrip() {
    setTrip(null);
    setNotice("Demo trip cancelled.");
  }

  const tripAction = {
    accepted: {
      label: "I've Arrived at Pickup",
      description: "Navigate to the passenger's pickup point.",
    },
    arrived: {
      label: "Start Trip",
      description: "Confirm the passenger has boarded.",
    },
    started: {
      label: "Complete Trip",
      description: "Finish the journey and add demo earnings.",
    },
  };

  const currentAction = trip ? tripAction[trip.status] : null;

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#080d16] font-sans text-white">

      {/* MAP */}
      <div className="absolute inset-0">
        <MapContainer
          center={defaultLocation}
          zoom={13}
          zoomControl={false}
          className="h-full min-h-[100dvh] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController center={defaultLocation} />

          <CircleMarker
            center={defaultLocation}
            radius={10}
            pathOptions={{
              color: "#ffffff",
              weight: 4,
              fillColor: "#ffc20e",
              fillOpacity: 1,
            }}
          />
        </MapContainer>
      </div>

      {/* TOP HEADER */}
      <header className="absolute left-0 right-0 top-0 z-[500] flex items-center justify-between bg-gradient-to-b from-[#080d16] via-[#080d16]/90 to-transparent px-5 pb-8 pt-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffc20e] text-2xl text-black">
            🚕
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">
              Aapki<span className="text-[#ffc20e]">Ride</span>
            </h1>
            <p className="text-[10px] tracking-[1.5px] text-slate-300">
              CAPTAIN PARTNER
            </p>
          </div>
        </div>

        <button
          onClick={() => setNotice("Captain notifications UI placeholder.")}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111925] text-xl"
          aria-label="Notifications"
        >
          ♧
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </header>

      {/* MAP CONTROLS */}
      <div className="absolute right-4 top-32 z-[500] flex flex-col gap-3">
        <button
          onClick={() =>
            setNotice("Connect device GPS to locate your actual position.")
          }
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-black shadow-xl"
          aria-label="My location"
        >
          ◎
        </button>
      </div>

      {/* CAPTAIN BOTTOM PANEL */}
      <section className="absolute bottom-0 left-0 right-0 z-[500] max-h-[78dvh] overflow-y-auto rounded-t-[30px] border-t border-white/10 bg-[#080d16]/[.97] px-5 pb-5 pt-3 shadow-2xl backdrop-blur-xl">

        <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-slate-600" />

        {/* ONLINE STATUS */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">
              {online ? "You're online" : "You're offline"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {online
                ? "Ready for your next ride?"
                : "Go online when you're ready to drive."}
            </p>
          </div>

          <span
            className={`h-3 w-3 rounded-full ${
              online ? "bg-green-400" : "bg-slate-500"
            }`}
          />
        </div>

        <button
          onClick={toggleOnline}
          className={`mt-4 w-full rounded-2xl py-4 font-extrabold transition active:scale-[.98] ${
            online
              ? "border border-white/15 bg-[#182130] text-white"
              : "bg-[#ffc20e] text-black hover:bg-yellow-400"
          }`}
        >
          {online ? "GO OFFLINE" : "GO ONLINE"}
        </button>

        {/* EARNINGS CARDS */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#111925] p-4">
            <p className="text-xs text-slate-400">Today's earnings</p>
            <p className="mt-2 text-2xl font-extrabold text-[#ffc20e]">
              ₹{earnings}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Demo earnings
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111925] p-4">
            <p className="text-xs text-slate-400">Completed trips</p>
            <p className="mt-2 text-2xl font-extrabold">
              {completedTrips}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Today's demo rides
            </p>
          </div>
        </div>

        {/* ACTIVE TRIP */}
        {trip && (
          <div className="mt-5 rounded-2xl border border-[#ffc20e]/40 bg-[#ffc20e]/[.08] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold">Active trip</h3>
              <span className="rounded-full bg-[#ffc20e]/15 px-3 py-1 text-xs font-bold text-[#ffc20e]">
                {trip.status.toUpperCase()}
              </span>
            </div>

            <p className="mt-3 font-semibold">{trip.passenger}</p>

            <div className="mt-3 space-y-3 rounded-xl bg-[#111925] p-3">
              <div>
                <p className="text-xs text-slate-400">PICKUP</p>
                <p className="mt-1 text-sm">{trip.pickup}</p>
              </div>

              <div className="border-t border-dashed border-slate-700" />

              <div>
                <p className="text-xs text-slate-400">DESTINATION</p>
                <p className="mt-1 text-sm">{trip.destination}</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {currentAction.description}
            </p>

            <button
              onClick={advanceTrip}
              className="mt-4 w-full rounded-xl bg-[#ffc20e] py-4 font-extrabold text-black"
            >
              {currentAction.label}
            </button>

            <button
              onClick={cancelTrip}
              className="mt-2 w-full rounded-xl border border-white/10 py-3 text-sm text-slate-300"
            >
              Cancel Demo Trip
            </button>
          </div>
        )}

        {/* INCOMING REQUEST */}
        {request && !trip && (
          <div className="mt-5 rounded-2xl border border-[#ffc20e]/50 bg-[#111925] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold">
                New ride request
              </h3>
              <span className="text-xs font-bold text-[#ffc20e]">
                DEMO
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{request.passenger}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {request.type} · {request.tripDistance}
                </p>
              </div>

              <p className="text-xl font-extrabold text-[#ffc20e]">
                ₹{request.fare}
              </p>
            </div>

            <div className="my-4 space-y-3 rounded-xl bg-[#080d16] p-3">
              <p className="text-sm">
                <span className="mr-2 text-[#ffc20e]">●</span>
                {request.pickup}
              </p>
              <p className="text-sm">
                <span className="mr-2 text-white">■</span>
                {request.destination}
              </p>
              <p className="text-xs text-slate-400">
                Pickup distance: {request.distance}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={rejectRequest}
                className="rounded-xl border border-white/15 py-3 font-bold"
              >
                Reject
              </button>

              <button
                onClick={acceptRequest}
                className="rounded-xl bg-[#ffc20e] py-3 font-extrabold text-black"
              >
                Accept Ride
              </button>
            </div>
          </div>
        )}

        {/* REQUEST DEMO */}
        {!trip && !request && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#111925] p-4">
            <h3 className="font-bold">Ride requests</h3>

            <p className="mt-2 text-sm text-slate-400">
              {online
                ? "Try the demo request to preview the captain workflow."
                : "Go online to enable the demo request button."}
            </p>

            <button
              onClick={showDemoRequest}
              disabled={!online}
              className="mt-4 w-full rounded-xl border border-[#ffc20e]/40 py-3 font-bold text-[#ffc20e] transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Preview Demo Ride Request
            </button>
          </div>
        )}

        {/* FEEDBACK */}
        {notice && (
          <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-[#ffc20e]/20 bg-[#ffc20e]/10 p-3 text-sm text-yellow-200">
            <p>{notice}</p>
            <button
              onClick={() => setNotice("")}
              className="font-bold"
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <nav className="mt-5 grid grid-cols-4 border-t border-white/10 pt-4">
          {[
            { name: "Home", icon: "⌂" },
            { name: "Earnings", icon: "₹" },
            { name: "Trips", icon: "◷" },
            { name: "Profile", icon: "♙" },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);

                if (tab.name === "Home") {
                  setNotice("");
                } else {
                  setNotice(`${tab.name} screen UI placeholder.`);
                }
              }}
              className={`flex flex-col items-center gap-1 text-xs ${
                activeTab === tab.name
                  ? "font-bold text-[#ffc20e]"
                  : "text-slate-400"
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
