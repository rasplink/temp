(() => {
  if ("WebSocket" in window) {
    const parse = str => str.replace(/>/g, "&gt;").replace(/</g, "&lt;");
    const interval = 500;
    const maxAttempts = 30;
    let attempts = 0;
    const socketUrl = "{{socketUrl}}";
    let socket = new WebSocket(socketUrl);

    socket.onmessage = function (res) {
      const obj = JSON.parse(res.data);
      if (obj.msg === "connected") enabled();
      if (obj.msg === "reload") window.location.reload();
      if (obj.msg === "update") update(obj);
    };


    function update(res) {
      const temp = document.getElementById("temp");
      const humidity = document.getElementById("humidity");
      const error = document.getElementById("error");
      console.log(res);
      if (error && res.data.error) {
        error.innerHTML = res.data.error;
        if (temp && humidity) {
          temp.innerHTML = "... c";
          humidity.innerHTML = "... %";
        }
        return 
      }
      else if (error && !res.data.error) error.innerHTML = "";
      
      if (temp && humidity) {
        temp.innerHTML = res.data.temp.toFixed(1) + " c";
        humidity.innerHTML = res.data.humidity.toFixed(1) + " %";
      }
    }

    function enabled() {
      let key = "IS_FIRST_TIME_OLUM_HOT_RELOAD";
      if (sessionStorage && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, true);
        console.log("Olum hot-reload enabled.");
      }
    }

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
