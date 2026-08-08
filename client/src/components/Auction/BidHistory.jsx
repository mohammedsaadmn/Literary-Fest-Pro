

function BidHistory({ history }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-5">Live Bid History</h2>

      {history.length === 0 ? (
        <p>No students sold yet.</p>
      ) : (
        history.map((item, index) => (
  <div
    key={index}
    className="flex justify-between border-b border-slate-700 py-3"
  >
    <span>{item.student}</span>

    <span>{item.team}</span>

    <span className="text-yellow-400 font-bold">
      ₹ {item.amount}
    </span>
  </div>
))
      )}
    </div>
  );
}

export default BidHistory;
