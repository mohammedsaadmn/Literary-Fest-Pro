import { useState, useEffect } from "react";
import socket from "../services/socket";
import teams from "../data/teams.json";
import students from "../data/studentData";

const defaultTeams = teams.map((t) => ({
  ...t,
  budget: 150000,
  remainingPoints: 150000,
  studentsWon: [],
}));

export default function useAuctionSync() {
  const [syncedState, setSyncedState] = useState(() => {
    const savedState = localStorage.getItem("auction_state");
    const savedTeams = localStorage.getItem("auction_teamData");
    const savedIndex = localStorage.getItem("auction_studentIndex");
    const savedStudent = localStorage.getItem("auction_currentStudent");
    const savedHistory = localStorage.getItem("auction_bidHistory");
    const savedTimer = localStorage.getItem("auction_timer");
    const savedRound = localStorage.getItem("auction_round");
    const savedTotal = localStorage.getItem("auction_totalStudents");
    const savedUnsold = localStorage.getItem("auction_unsoldStudentsCount");
    const savedCompleted = localStorage.getItem("auction_completed");

    let parsedAuction = { currentBid: 0, highestBidder: null, highestTeamName: "" };
    let parsedTeams = defaultTeams;
    let parsedStudent = null;
    let parsedHistory = [];

    if (savedState) {
      try { parsedAuction = JSON.parse(savedState); } catch { /* ignore */ }
    }
    if (savedTeams) {
      try { parsedTeams = JSON.parse(savedTeams); } catch { /* ignore */ }
    }
    if (savedStudent) {
      try { parsedStudent = JSON.parse(savedStudent); } catch { /* ignore */ }
    }
    if (savedHistory) {
      try { parsedHistory = JSON.parse(savedHistory); } catch { /* ignore */ }
    }

    const idx = savedIndex ? parseInt(savedIndex, 10) : 0;

    return {
      auction: parsedAuction,
      teamData: parsedTeams,
      currentStudentIndex: idx,
      currentStudent: parsedStudent || students[idx] || students[0],
      bidHistory: parsedHistory,
      timer: savedTimer !== null ? parseInt(savedTimer, 10) : 20,
      auctionRound: savedRound ? parseInt(savedRound, 10) : 1,
      totalStudents: savedTotal ? parseInt(savedTotal, 10) : 53,
      unsoldStudentsCount: savedUnsold !== null ? parseInt(savedUnsold, 10) : 0,
      auctionCompleted: savedCompleted === "true",
      isConnected: socket.connected,
    };
  });

  useEffect(() => {
    let bc = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        bc = new BroadcastChannel("auction_channel");
      } catch {
        bc = null;
      }
    }

    const applyUpdate = (payload) => {
      if (!payload) return;

      setSyncedState((prev) => {
        const nextAuction = payload.auction || (
          payload.currentBid !== undefined
            ? {
                currentBid: payload.currentBid,
                highestBidder: payload.highestBidder,
                highestTeamName: payload.highestTeamName !== undefined ? payload.highestTeamName : prev.auction.highestTeamName,
              }
            : prev.auction
        );

        const nextTeamData = payload.teamData || prev.teamData;
        const nextIndex = payload.currentStudentIndex !== undefined ? payload.currentStudentIndex : prev.currentStudentIndex;
        const nextStudent = payload.currentStudent !== undefined ? payload.currentStudent : prev.currentStudent;
        const nextHistory = payload.bidHistory || prev.bidHistory;
        const nextTimer = payload.timer !== undefined ? payload.timer : prev.timer;
        const nextRound = payload.auctionRound !== undefined ? payload.auctionRound : prev.auctionRound;
        const nextTotal = payload.totalStudents !== undefined ? payload.totalStudents : prev.totalStudents;
        const nextUnsold = payload.unsoldStudentsCount !== undefined ? payload.unsoldStudentsCount : prev.unsoldStudentsCount;
        const nextCompleted = payload.auctionCompleted !== undefined ? payload.auctionCompleted : prev.auctionCompleted;

        return {
          ...prev,
          auction: nextAuction,
          teamData: nextTeamData,
          currentStudentIndex: nextIndex,
          currentStudent: nextStudent,
          bidHistory: nextHistory,
          timer: nextTimer,
          auctionRound: nextRound,
          totalStudents: nextTotal,
          unsoldStudentsCount: nextUnsold,
          auctionCompleted: nextCompleted,
          isConnected: true,
        };
      });
    };

    const handleSyncState = (payload) => {
      applyUpdate(payload);
    };

    const handleConnect = () => {
      setSyncedState((prev) => ({ ...prev, isConnected: true }));
      socket.emit("REQUEST_SYNC");
    };

    const handleDisconnect = () => {
      setSyncedState((prev) => ({ ...prev, isConnected: false }));
    };

    if (bc) {
      bc.onmessage = (event) => {
        if (event.data?.type === "SYNC_STATE") {
          applyUpdate(event.data.payload);
        }
      };
    }

    const handleStorage = () => {
      const savedState = localStorage.getItem("auction_state");
      const savedTeams = localStorage.getItem("auction_teamData");
      const savedIndex = localStorage.getItem("auction_studentIndex");
      const savedHistory = localStorage.getItem("auction_bidHistory");
      const savedStudent = localStorage.getItem("auction_currentStudent");
      const savedRound = localStorage.getItem("auction_round");
      const savedTotal = localStorage.getItem("auction_totalStudents");
      const savedTimer = localStorage.getItem("auction_timer");
      const savedUnsold = localStorage.getItem("auction_unsoldStudentsCount");
      const savedCompleted = localStorage.getItem("auction_completed");

      const payload = {};
      if (savedState) {
        try { payload.auction = JSON.parse(savedState); } catch { /* ignore */ }
      }
      if (savedTeams) {
        try { payload.teamData = JSON.parse(savedTeams); } catch { /* ignore */ }
      }
      if (savedIndex) payload.currentStudentIndex = parseInt(savedIndex, 10);
      if (savedHistory) {
        try { payload.bidHistory = JSON.parse(savedHistory); } catch { /* ignore */ }
      }
      if (savedStudent) {
        try { payload.currentStudent = JSON.parse(savedStudent); } catch { /* ignore */ }
      }
      if (savedRound) payload.auctionRound = parseInt(savedRound, 10);
      if (savedTotal) payload.totalStudents = parseInt(savedTotal, 10);
      if (savedTimer !== null) payload.timer = parseInt(savedTimer, 10);
      if (savedUnsold !== null) payload.unsoldStudentsCount = parseInt(savedUnsold, 10);
      if (savedCompleted !== null) payload.auctionCompleted = savedCompleted === "true";

      applyUpdate(payload);
    };

    socket.on("SYNC_STATE", handleSyncState);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleDisconnect);

    if (socket.connected) {
      socket.emit("REQUEST_SYNC");
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      socket.off("SYNC_STATE", handleSyncState);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleDisconnect);
      window.removeEventListener("storage", handleStorage);
      if (bc) {
        bc.close();
      }
    };
  }, []);

  const placeBid = (teamId, amount) => {
    socket.emit("PLACE_BID", { teamId, amount });
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        const bc = new BroadcastChannel("auction_channel");
        bc.postMessage({ type: "PLACE_BID", payload: { teamId, amount } });
        bc.close();
      } catch { /* ignore */ }
    }
  };

  return {
    ...syncedState,
    placeBid,
  };
}
