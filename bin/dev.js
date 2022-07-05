const serve = require("./server");
const WebSocket = require("ws");
const path = require("path");
const spawn = require("cross-spawn");
const fs = require("fs");

const src = path.resolve(__dirname, "../public");
serve(src).then(({ server, wsPort, PORT, log }) => {
  server.listen(PORT, () => console.log(log));

  
  const wss = new WebSocket.Server({ port: wsPort });
  wss.on("connection", ws => {
    ws.send(JSON.stringify({ msg: "connected" }));
    // humidity();

    // fetch sensor data each 1s
    const interval = setInterval(() => {
      const data = getSensorData();
      console.log(data);
      if (!data) return clearInterval(interval);
      ws.send(JSON.stringify({ msg: "update", data }));
    }, 1000);

  });

});

function getSensorData() {
  const file = path.resolve(__dirname, "../data.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file).toString());
  } else {
    return null;
  }
}


function humidity() {
  const result = spawn.sync("python3", [path.resolve(__dirname, "../humidity.py")], { stdio: "inherit" });
  if (result.signal) {
    if (result.signal === "SIGKILL" || result.signal === "SIGTERM") console.log("Failed to run humidity.py script!");
    process.exit(1);
  }
  process.exit(result.status);
}
