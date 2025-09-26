// Utility to generate auto-incrementing estimate numbers
export function getNextEstimateNo(): string {
  // Get last number from localStorage
  const last = localStorage.getItem("lastEstimateNo");

  let nextNum = 1;
  if (last) {
    nextNum = parseInt(last, 10) + 1;
  }

  // Save updated number
  localStorage.setItem("lastEstimateNo", nextNum.toString());

  // Return in format: EST-0001
  return `EST-${nextNum.toString().padStart(4, "0")}`;
}
