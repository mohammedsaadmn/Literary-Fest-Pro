function Timer({ timeLeft, running }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 text-center">
      <h2 className="text-xl font-semibold">
        Auction Timer
      </h2>

      {!running ? (
        <p className="text-yellow-400 mt-4 font-bold">
          🟢 Waiting for first bid
        </p>
      ) : (
        <h1 className="text-6xl font-bold text-red-400 mt-4">
          00:{String(timeLeft).padStart(2, "0")}
        </h1>
      )}
    </div>
  );
}

export default Timer;