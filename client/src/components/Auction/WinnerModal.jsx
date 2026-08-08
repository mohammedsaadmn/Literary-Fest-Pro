import { Trophy } from "lucide-react";

function WinnerModal({ show, winner }) {
  if (!show || !winner) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-800 rounded-3xl p-10 w-[450px] text-center shadow-2xl border-2 border-yellow-400">

        <Trophy
          size={70}
          className="text-yellow-400 mx-auto mb-4"
        />

        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          STUDENT SOLD
        </h1>

        <h2 className="text-3xl font-bold text-white">
          {winner.student?.name}
        </h2>

        <p className="text-xl mt-6 text-gray-300">
          Sold To
        </p>

        <h2
          className="text-3xl font-bold"
          style={{ color: winner.team?.color || "#eab308" }}
        >
          {winner.team?.name}
        </h2>

        <p className="text-xl mt-6 text-gray-300">
          Final Price
        </p>

        <h1 className="text-5xl font-bold text-green-400">
          ₹ {winner.amount?.toLocaleString("en-IN")}
        </h1>

      </div>

    </div>
  );
}

export default WinnerModal;