export const BASE_BID = 500;
export const DEFAULT_STARTING_BUDGET = 150000;
export const DEFAULT_MAX_STUDENTS = 53;

/**
 * Calculates budget protection metrics for an auction team.
 *
 * Requirements:
 * - Every team starts with ₹150,000.
 * - Base price per student is ₹500.
 * - Every team must always reserve enough money to buy all remaining required students at the base price.
 * - Calculate the maximum allowed bid dynamically using:
 *     remaining budget
 *     current squad size
 *     maximum squad size
 *     base bid (₹500)
 * - Prevent negative calculations and handle edge cases when the squad is already full.
 */
export function calculateBudgetProtection({
  remainingPoints = DEFAULT_STARTING_BUDGET,
  totalBudget = DEFAULT_STARTING_BUDGET,
  squadCount = 0,
  maxStudents = DEFAULT_MAX_STUDENTS,
  baseBid = BASE_BID,
} = {}) {
  const remainingBudget = Math.max(0, Number(remainingPoints) || 0);
  const total = Math.max(remainingBudget, Number(totalBudget) || DEFAULT_STARTING_BUDGET);
  const spentPoints = Math.max(0, total - remainingBudget);
  const currentSquadSize = Math.max(0, Number(squadCount) || 0);
  const maxSquadSize = Math.max(0, Number(maxStudents) || DEFAULT_MAX_STUDENTS);

  // Players remaining to reach maximum squad size
  const playersRemaining = Math.max(0, maxSquadSize - currentSquadSize);

  // If playersRemaining is 0 (squad is already full), no budget needs to be reserved.
  // Otherwise, winning the current student leaves (playersRemaining - 1) players to buy in the future.
  const playersToReserveFor = Math.max(0, playersRemaining - 1);
  const minimumBudgetReserved = playersToReserveFor * baseBid;

  // Maximum allowed bid for the current student without violating the minimum budget reservation.
  // Guarded against negative values.
  const maximumAllowedBid = Math.max(0, remainingBudget - minimumBudgetReserved);

  const squadFull = currentSquadSize >= maxSquadSize;

  return {
    remainingBudget,
    spentPoints,
    currentSquadSize,
    maxSquadSize,
    playersRemaining,
    minimumBudgetReserved,
    maximumAllowedBid,
    squadFull,
  };
}

/**
 * Helper to compute all auction stats for a team including category counts.
 */
export function calculateTeamAuctionStats(
  team = {},
  currentStudent = null,
  maxStudents = DEFAULT_MAX_STUDENTS,
  baseBid = BASE_BID
) {
  const remainingPoints = team.remainingPoints ?? DEFAULT_STARTING_BUDGET;
  const totalBudget = team.budget ?? DEFAULT_STARTING_BUDGET;
  const studentsWon = team.studentsWon ?? [];
  const squadCount = studentsWon.length;

  const budgetStats = calculateBudgetProtection({
    remainingPoints,
    totalBudget,
    squadCount,
    maxStudents,
    baseBid,
  });

  const seniorCount = studentsWon.filter((s) => s.category === "Senior").length;
  const juniorCount = studentsWon.filter((s) => s.category === "Junior").length;
  const subJuniorCount = studentsWon.filter((s) => s.category === "Sub Junior").length;

  const categoryFull = Boolean(
    currentStudent && (
      (currentStudent.category === "Senior" && seniorCount >= 16) ||
      (currentStudent.category === "Junior" && juniorCount >= 16) ||
      (currentStudent.category === "Sub Junior" && subJuniorCount >= 21)
    )
  );

  return {
    ...budgetStats,
    seniorCount,
    juniorCount,
    subJuniorCount,
    categoryFull,
  };
}
