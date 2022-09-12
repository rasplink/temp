(() => {
  if ("WebSocket" in window) {
    const interval = 500;
    const maxAttempts = 30;
    let attempts = 0;
    const socketUrl = "{{url}}";
    let socket = new WebSocket(socketUrl);

    socket.onopen = function () {
      console.log("client connected");
      socket.send("connected");
    }
    
    socket.onmessage = function (res) {
      const obj = JSON.parse(res.data);
      if (obj.msg && obj.msg === "sensor") window.dispatchEvent(new CustomEvent("sensor", { detail: obj.data }));
    };

    socket.addEventListener("close", () => {
      const reloadIfCanConnect = () => {
        attempts++;
        if (attempts > maxAttempts) return console.error("Could not reconnect to dev server.");
        socket = new WebSocket(socketUrl);
        socket.addEventListener("error", () => setTimeout(reloadIfCanConnect, interval));
      };
      reloadIfCanConnect();
    });
  } else {
    console.error("Upgrade your browser. This Browser is doesn't support WebSocket for Live-Reloading.");
  }
})();
