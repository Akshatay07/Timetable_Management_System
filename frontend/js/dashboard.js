document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const resultsDiv = document.getElementById("results");

  searchBtn.addEventListener("click", async () => {
    const semester = document.getElementById("semester").value.trim();
    const section = document.getElementById("section").value;
    const day = document.getElementById("day").value;
    const timeSlot = document.getElementById("time-slot").value.trim();

    if (!semester || !section || !day || !timeSlot) {
      resultsDiv.innerHTML = `<div class="timetable-table">⚠️ Please enter semester and time slot, and select section and day.</div>`;
      return;
    }

    try {
      // Fetch entries that match semester, section, and day
      const response = await fetch(`http://localhost:5000/api/timetable?semester=${semester}&section=${section}&day=${day}`);
      const data = await response.json();

      // Filter further by timeSlot (exact match)
      const filtered = data.filter(entry => entry.timeSlot === timeSlot);

      if (filtered.length === 0) {
        resultsDiv.innerHTML = `<div class="timetable-table">⚠️ No classes found for the selected filters.</div>`;
        return;
      }

      let html = `<table>
        <tr><th>Semester</th><th>Section</th><th>Day</th><th>Time Slot</th><th>Subject</th><th>Teacher</th></tr>`;
      
      filtered.forEach(entry => {
        html += `<tr>
          <td>${entry.semester}</td>
          <td>${entry.section}</td>
          <td>${entry.day}</td>
          <td>${entry.timeSlot}</td>
          <td>${entry.subject}</td>
          <td>${entry.teacher}</td>
        </tr>`;
      });

      html += "</table>";
      resultsDiv.innerHTML = html;
    } catch (err) {
      console.error("Fetch error:", err);
      resultsDiv.innerHTML = `<div class="timetable-table">❌ Error fetching timetable data.</div>`;
    }
  });
});
