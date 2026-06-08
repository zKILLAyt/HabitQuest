function getHabits() {
  return JSON.parse(localStorage.getItem("habits")) || [];
}

function saveHabits(habits) {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function getUserData() {
  return JSON.parse(localStorage.getItem("userData")) || {
    xp: 0,
    level: 1,
    completed: 0,
    streak: 0,
    lastCompletedDate: null,
  };
}
function saveUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}