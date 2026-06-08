const habitForm = document.getElementById("habitForm");
const habitName = document.getElementById("habitName");
const habitDescription = document.getElementById("habitDescription");
const habitCategory = document.getElementById("habitCategory");
const habitsList = document.getElementById("habitsList");

const levelElement = document.getElementById("level");
const xpElement = document.getElementById("xp");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const totalHabits = document.getElementById("totalHabits");
const completedHabits = document.getElementById("completedHabits");
const streakElement = document.getElementById("streak");

function renderHabits() {
  const habits = getHabits();
  habitsList.innerHTML = "";

  if (habits.length === 0) {
    habitsList.innerHTML = `
      <p class="empty-message">
        Nenhum hábito criado ainda. Comece sua jornada!
      </p>
    `;
    return;
  }

  habits.forEach((habit) => {
    const card = document.createElement("div");
    card.classList.add("habit-card");

    card.innerHTML = `
      <h3>${habit.name}</h3>
      <span class="category">${habit.category}</span>
      <p>${habit.description || "Sem descrição."}</p>

      <div class="habit-actions">
        <button 
          class="complete-btn" 
          onclick="handleCompleteHabit(${habit.id})"
          ${habit.completed ? "disabled" : ""}
        >
          ${habit.completed ? "Concluído" : "Concluir +10 XP"}
        </button>

        <button 
          class="delete-btn" 
          onclick="handleDeleteHabit(${habit.id})"
        >
          Excluir
        </button>
      </div>
    `;

    habitsList.appendChild(card);
  });
}

function renderDashboard() {
  const habits = getHabits();
  const userData = getUserData();

  const xpNeeded = getXpToNextLevel(userData.level);
  const progressPercentage = Math.round((userData.xp / xpNeeded) * 100);

  levelElement.textContent = userData.level;
  xpElement.textContent = `${userData.xp}/${xpNeeded}`;
  progressText.textContent = `${progressPercentage}%`;
  progressFill.style.width = `${progressPercentage}%`;

  totalHabits.textContent = habits.length;
  completedHabits.textContent = userData.completed;
  streakElement.textContent = userData.streak;
}

function handleDeleteHabit(id) {
  deleteHabit(id);
  renderHabits();
  renderDashboard();
}

function handleCompleteHabit(id) {
  completeHabit(id);
  renderHabits();
  renderDashboard();
}

habitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  createHabit(habitName.value, habitDescription.value, habitCategory.value);

  habitForm.reset();
  renderHabits();
  renderDashboard();
});

renderHabits();
renderDashboard();
