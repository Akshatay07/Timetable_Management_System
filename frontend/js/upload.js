document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById("csvFile");
    const statusMessage = document.getElementById("uploadStatus");
  
    const file = fileInput.files[0];
  
    if (!file) {
      statusMessage.textContent = "Please select a CSV file.";
      statusMessage.style.color = "red";
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async () => {
      const lines = reader.result.trim().split("\n");
      const headers = lines[0].split(",");
      const entries = lines.slice(1).map(line => {
        const values = line.split(",");
        const entry = {};
        headers.forEach((header, idx) => {
          entry[header.trim()] = values[idx].trim();
        });
        return entry;
      });
  
      try {
        const response = await fetch("http://localhost:5000/api/timetable/add-bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entries),
        });
  
        const data = await response.json();
        if (response.ok) {
          statusMessage.textContent = `${data.message}`;
          statusMessage.style.color = "green";
        } else {
          statusMessage.textContent = data.error || "Upload failed.";
          statusMessage.style.color = "red";
        }
      } catch (err) {
        statusMessage.textContent = "Error sending data to server.";
        statusMessage.style.color = "red";
      }
    };
  
    reader.readAsText(file);
  });
  