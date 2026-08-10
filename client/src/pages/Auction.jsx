import socket from "../services/socket";
import students from "../data/studentData";
import OperatorPanel from "../components/Auction/OperatorPanel";
import AuctionHeader from "../components/Auction/AuctionHeader";
import StudentCard from "../components/Auction/StudentCard";
import Timer from "../components/Auction/Timer";
import TeamCard from "../components/Auction/TeamCard";
import BidHistory from "../components/Auction/BidHistory";
import WinnerModal from "../components/Auction/WinnerModal";
import useAuctionTimer from "../hooks/useAuctionTimer";
import { useState, useEffect, useRef, useCallback } from "react";
import teams from "../data/teams.json";
import { calculateBudgetProtection } from "../utils/auctionUtils";

function Auction() {
  const [teamsPlayed, setTeamsPlayed] = useState([]);
  const [unsoldStudents, setUnsoldStudents] = useState([]);
  const [auction, setAuction] = useState({
    currentBid: 0,
    highestBidder: null,
    highestTeamName: "",
  });
  const [bidHistory, setBidHistory] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [auctionCompleted, setAuctionCompleted] = useState(false);
  const [roundEnded, setRoundEnded] = useState(false);
  const [auctionStudents, setAuctionStudents] = useState(students);
  const [auctionRound, setAuctionRound] = useState(1);
  const [teamData, setTeamData] = useState(
    teams.map((team) => ({
      ...team,
      budget: 150000,
      remainingPoints: 150000,
      studentsWon: [],
    }))
  );
 const BASE_BID = 500;
  const currentStudent = auctionStudents[currentStudentIndex];

  const handleTimeUp = () => {
    if (auction.highestBidder) {
      sellStudent(auction.highestBidder);
    } else {
      unsoldStudent();
    }
  };

  const { timeLeft, running, resetTimer, stopTimer } = useAuctionTimer(handleTimeUp);

  const nextStudent = (isUnsold = false) => {
    if (currentStudentIndex < auctionStudents.length - 1) {
      setCurrentStudentIndex((prev) => prev + 1);

      setAuction({
        currentBid: 0,
        highestBidder: null,
        highestTeamName: "",
      });

      stopTimer();
      setRoundEnded(false);
      setTeamsPlayed([]);
    } else {
      const isAlreadyUnsold = currentStudent && unsoldStudents.some((s) => s.name === currentStudent.name);
      const totalUnsoldCount = unsoldStudents.length + (isUnsold && !isAlreadyUnsold ? 1 : 0);
      stopTimer();
      setAuction({
        currentBid: 0,
        highestBidder: null,
        highestTeamName: "",
      });
      if (totalUnsoldCount === 0) {
        setAuctionCompleted(true);
      }
    }
  };

  function sellStudent(teamId) {
    if (Number(auction.highestBidder) !== Number(teamId)) return;
    const winningTeam = teamData.find((team) => Number(team.id) === Number(teamId));

    if (!winningTeam || !currentStudent) return;

    const updatedTeams = teamData.map((team) => {
      if (Number(team.id) === Number(teamId)) {
        const wonStudent = {
          ...currentStudent,
          purchasePrice: auction.currentBid,
          purchaseOrder: (team.studentsWon?.length || 0) + 1,
          soldAt: Date.now(),
        };
        return {
          ...team,
          remainingPoints: team.remainingPoints - auction.currentBid,
          studentsWon: [...team.studentsWon, wonStudent],
        };
      }
      return team;
    });

    setWinner({
      student: currentStudent,
      team: winningTeam,
      amount: auction.currentBid,
    });

    setShowWinner(true);

    setTimeout(() => {
      setShowWinner(false);
      nextStudent(false);
    }, 2000);

    setTeamData(updatedTeams);
    setTeamsPlayed([]);

    setBidHistory((prev) => {
      if (prev.some((item) => item.student === currentStudent.name)) return prev;
      return [
        {
          student: currentStudent.name,
          team: winningTeam.name,
          amount: auction.currentBid,
        },
        ...prev,
      ];
    });
  }

  const unsoldStudent = () => {
    if (!currentStudent) return;

    setUnsoldStudents((prev) => {
      if (prev.some((s) => s.name === currentStudent.name)) return prev;
      return [...prev, currentStudent];
    });

    nextStudent(true);
  };

  const resetBid = () => {
    setAuction({
      currentBid: 0,
      highestBidder: null,
      highestTeamName: "",
    });
  };

  const startReAuction = () => {
    if (unsoldStudents.length === 0) return;
    setAuctionStudents(unsoldStudents);
    setUnsoldStudents([]);
    setCurrentStudentIndex(0);
    setAuctionRound((prev) => prev + 1);
    setAuctionCompleted(false);

    resetBid();
    stopTimer();
    setRoundEnded(false);
    setTeamsPlayed([]);
  };

  const endRound = () => {
    if (!roundCompleted) {
      alert("All teams must get one chance before ending the round.");
      return;
    }
    setRoundEnded(true);
  };

  const continueBidding = () => {
    setRoundEnded(false);
    setTeamsPlayed([]);
  };

  const MAX_STUDENTS = 53;
  const roundCompleted = teamsPlayed.length === teamData.length;

  const placeBid = useCallback(
    (teamId, amount) => {
      if (roundEnded) return;
      const team = teamData.find((t) => Number(t.id) === Number(teamId));

      if (!team) return;

      const { maximumAllowedBid } = calculateBudgetProtection({
        remainingPoints: team.remainingPoints,
        totalBudget: team.budget,
        squadCount: team.studentsWon?.length ?? 0,
        maxStudents: MAX_STUDENTS,
        baseBid: BASE_BID,
      });

      setTeamsPlayed((prev) => {
        if (prev.some((id) => Number(id) === Number(teamId))) return prev;
        return [...prev, teamId];
      });

      setAuction((prevAuction) => {
        if (prevAuction.highestBidder !== null && prevAuction.highestBidder !== undefined && Number(prevAuction.highestBidder) === Number(team.id)) {
          return prevAuction;
        }
        const newBid = prevAuction.currentBid + amount;
        if (newBid > maximumAllowedBid) return prevAuction;
        return {
          currentBid: newBid,
          highestBidder: team.id,
          highestTeamName: team.name,
        };
      });
      resetTimer();
    },
    [roundEnded, teamData, resetTimer]
  );

  const placeBidRef = useRef(placeBid);
  const broadcastSyncRef = useRef(null);

  const broadcastSync = useCallback(() => {
    const payload = {
      currentStudent,
      currentBid: auction.currentBid,
      highestBidder: auction.highestBidder,
      highestTeamName: auction.highestTeamName,
      auction,
      teamData,
      timer: timeLeft,
      running,
      bidHistory,
      auctionRound,
      currentStudentIndex,
      totalStudents: auctionStudents.length,
      unsoldStudentsCount: unsoldStudents.length,
      auctionCompleted,
    };

    socket.emit("SYNC_STATE", payload);

    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        const bc = new BroadcastChannel("auction_channel");
        bc.postMessage({ type: "SYNC_STATE", payload });
        bc.close();
      } catch { /* ignore */ }
    }

    localStorage.setItem("auction_state", JSON.stringify(auction));
    localStorage.setItem("auction_teamData", JSON.stringify(teamData));
    localStorage.setItem("auction_studentIndex", currentStudentIndex.toString());
    localStorage.setItem("auction_bidHistory", JSON.stringify(bidHistory));
    localStorage.setItem("auction_round", auctionRound.toString());
    localStorage.setItem("auction_totalStudents", auctionStudents.length.toString());
    localStorage.setItem("auction_timer", timeLeft.toString());
    localStorage.setItem("auction_unsoldStudentsCount", unsoldStudents.length.toString());
    localStorage.setItem("auction_completed", auctionCompleted.toString());
    if (currentStudent) {
      localStorage.setItem("auction_currentStudent", JSON.stringify(currentStudent));
    }
  }, [
    currentStudent,
    auction,
    teamData,
    timeLeft,
    running,
    bidHistory,
    auctionRound,
    currentStudentIndex,
    auctionStudents.length,
    unsoldStudents.length,
    auctionCompleted,
  ]);

  useEffect(() => {
    broadcastSyncRef.current = broadcastSync;
  }, [broadcastSync]);

  useEffect(() => {
    placeBidRef.current = placeBid;
  }, [placeBid]);

  // Master listener setup - bound once on mount
  useEffect(() => {
    let bc = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("auction_channel");
      } catch {
        bc = null;
      }
    }

    const handlePlaceBid = (payload) => {
      if (payload && payload.teamId !== undefined && payload.amount !== undefined) {
        placeBidRef.current(payload.teamId, payload.amount);
      }
    };

    const handleRequestSync = () => {
      broadcastSyncRef.current?.();
    };

    const handleConnect = () => {
      broadcastSyncRef.current?.();
    };

    if (bc) {
      bc.onmessage = (event) => {
        if (event.data?.type === "PLACE_BID") {
          handlePlaceBid(event.data.payload);
        }
      };
    }

    socket.on("PLACE_BID", handlePlaceBid);
    socket.on("REQUEST_SYNC", handleRequestSync);
    socket.on("connect", handleConnect);

    if (socket.connected) {
      broadcastSyncRef.current?.();
    }

    return () => {
      socket.off("PLACE_BID", handlePlaceBid);
      socket.off("REQUEST_SYNC", handleRequestSync);
      socket.off("connect", handleConnect);
      if (bc) {
        bc.close();
      }
    };
  }, []);

  useEffect(() => {
    broadcastSync();
  }, [broadcastSync]);

  if (auctionCompleted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
        <h1 className="text-6xl font-bold text-green-400">
          🎉 Auction Completed
        </h1>
        <p className="mt-6 text-2xl">
          All {auctionStudents.length} students have been auctioned.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AuctionHeader />

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Main Stage Grid: Student Card, Operator Dock & Timer */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-0.5">Auction Status</span>
                <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                  🏆 Round {auctionRound}
                </h2>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Stage Pool</span>
                <span className="text-lg font-extrabold text-blue-400">
                  {auctionStudents.length} Students Left
                </span>
              </div>
            </div>

            <StudentCard
              student={currentStudent}
              currentBid={auction.currentBid}
              nextStudent={nextStudent}
            />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Timer timeLeft={timeLeft} running={running} />
            <OperatorPanel
              currentBid={auction.currentBid}
              nextStudent={nextStudent}
              currentStudentIndex={currentStudentIndex}
              totalStudents={auctionStudents.length}
              roundEnded={roundEnded}
              endRound={endRound}
              resetBid={resetBid}
              continueBidding={continueBidding}
              unsoldStudent={unsoldStudent}
              highestBidder={auction.highestBidder}
              highestTeamName={auction.highestTeamName}
              sellStudent={sellStudent}
            />
          </div>
        </div>

        {/* 4 Team Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xl font-black uppercase tracking-wider text-white">
              🛡️ Team Bidding Dashboards
            </h3>
            <span className="text-xs font-semibold text-slate-400">4 Franchise Teams</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...teamData]
              .sort((a, b) => b.remainingPoints - a.remainingPoints)
              .map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  currentBid={auction.currentBid}
                  highestBidder={auction.highestBidder}
                  placeBid={placeBid}
                  sellStudent={sellStudent}
                  maxStudents={MAX_STUDENTS}
                  roundEnded={roundEnded}
                  roundCompleted={roundCompleted}
                  currentStudent={currentStudent}
                />
              ))}
          </div>
        </div>

        {/* Live Bid History Feed */}
        <BidHistory history={bidHistory} />

        {/* Unsold Students Section */}
        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span className="text-red-400">❌</span> Unsold Students Pool ({unsoldStudents.length})
            </h2>
            {unsoldStudents.length > 0 && (
              <button
                onClick={startReAuction}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer active:scale-95"
              >
                🔄 Re-Auction Unsold ({unsoldStudents.length})
              </button>
            )}
          </div>

          {unsoldStudents.length === 0 ? (
            <p className="text-slate-500 text-sm font-semibold py-4 text-center">
              No unsold students currently in pool.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {unsoldStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5"
                >
                  <div>
                    <p className="font-extrabold text-sm text-white">{student.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{student.category} • {student.place}</p>
                  </div>
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-xl border border-red-500/20">
                    Unsold
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <WinnerModal show={showWinner} winner={winner} />
    </div>
  );
}

export default Auction;

