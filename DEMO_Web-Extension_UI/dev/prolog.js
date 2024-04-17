document.getElementById("configForm").addEventListener("submit", function(event){
    event.preventDefault();
    let port = document.getElementById("port").value;
    fetch(`http://localhost:${port}/configure`, {
      method: "POST",
      body: JSON.stringify({ port: port }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  