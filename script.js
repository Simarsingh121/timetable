const form = document.getElementById("classForm");
const timetable = document.getElementById("timetable");

let classes = JSON.parse(localStorage.getItem("timetableData")) || {};

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const day = document.getElementById("day").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  const entry = {
    subject,
    start,
    end
  };

  if (!classes[day]) {
    classes[day] = [];
  }
  classes[day].push(entry);

  localStorage.setItem("timetableData", JSON.stringify(classes));
  updateTimetable();
  form.reset();
});

function updateTimetable() {
  timetable.innerHTML = '';
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  days.forEach(day => {
    const dayBlock = document.createElement("div");
    dayBlock.className = "timetable-day";
    dayBlock.innerHTML = `<strong>${day}</strong><br>`;

    if (classes[day]) {
      classes[day].forEach((cls, index) => {
        const classDiv = document.createElement("div");
        classDiv.className = "class-entry";
        classDiv.innerHTML = `
          ${cls.subject} <br>${cls.start} - ${cls.end}
          <span class="delete-btn" onclick="deleteClass('${day}', ${index})">✖</span>
        `;
        dayBlock.appendChild(classDiv);
      });
    } else {
      dayBlock.innerHTML += `<em>No classes</em>`;
    }

    timetable.appendChild(dayBlock);
  });
}

function deleteClass(day, index) {
  classes[day].splice(index, 1);
  if (classes[day].length === 0) {
    delete classes[day];
  }
  localStorage.setItem("timetableData", JSON.stringify(classes));
  updateTimetable();
}

updateTimetable(); // Load on page load
