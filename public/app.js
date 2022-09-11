var opts = {
  angle: -0.2,
  lineWidth: 0.2,
  radiusScale: 1.1,
  pointer: {
    length: 0.25,
    strokeWidth: 0.035,
    color: "#fff",
  },
  limitMax: true,
  limitMin: true,
  strokeColor: "#232f4e",
  generateGradient: true,
  highDpiSupport: true,
  percentColors: [
    [0.0, "#29ca42"],
    [0.5, "#fbc32f"],
    [1.0, "#fc6159"],
  ],
  //   staticLabels: {
  //     font: "15px sans-serif",
  //     labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  //     color: "#9193a8",
  //     fractionDigits: 0,
  //   },
};

// temp
var target = document.getElementById("temp");
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 100;
gauge.setMinValue(0);
gauge.animationSpeed = 50;
gauge.set(0);

// humidity
var opts2 = opts;
opts2.percentColors = [
  [0.0, "#427ff5"],
  [0.5, "#427ff5"],
  [1.0, "#427ff5"],
];
var target2 = document.getElementById("humidity");
var gauge2 = new Gauge(target2).setOptions(opts2);
gauge2.maxValue = 100;
gauge2.setMinValue(0);
gauge2.animationSpeed = 32;
gauge2.set(0);

// update
const humidityNum = document.getElementById("humidityNum");
const tempNum = document.getElementById("tempNum");
const error = document.getElementById("error");
window.addEventListener("sensor", (e) => {
  const obj = e.detail;
  if (obj.error) return error.textContent = obj.error;
  else error.textContent = "";
  
  gauge.set(obj.temp);
  tempNum.textContent = obj.temp;

  gauge2.set(obj.humidity);
  humidityNum.textContent = obj.humidity;
});
