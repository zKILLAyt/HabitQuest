function getXpToNextLevel(level) {
  return level * 100;
}

function createHabit(name, description, category) {
  const habits = getHabits();

  const newHabit = {
    id: Date.now(),
    name,
    description,
    category,
    completed: false,
  };

  habits.push(newHabit);
  saveHabits(habits);
}

function deleteHabit(id) {
  const habits = getHabits().filter((habit) => habit.id !== id);
  saveHabits(habits);
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toISOString().split("T")[0];
}

function updateStreak(userData) {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();

  if (userData.lastCompletedDate === today) {
    return;
  }

  if (userData.lastCompletedDate === yesterday) {
    userData.streak += 1;
  } else {
    userData.streak = 1;
  }

  userData.lastCompletedDate = today;
}

function completeHabit(id) {
  const habits = getHabits();
  const habit = habits.find((habit) => habit.id === id);

  if (!habit || habit.completed) return;

  habit.completed = true;

  const userData = getUserData();

  userData.xp += 10;
  updateStreak(userData);

  let xpNeeded = getXpToNextLevel(userData.level);

  while (userData.xp >= xpNeeded) {
    userData.xp -= xpNeeded;
    updateStreak(userData);
    xpNeeded = getXpToNextLevel(userData.level);
  }

  saveHabits(habits);
  saveUserData(userData);
}