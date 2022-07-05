import Adafruit_DHT

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

def success(temp, humidity):
    with open("data.json", "w") as file:
        file.write('{ "temp": '+str(temp)+', "humidity": '+str(humidity)+'}')

def error(msg):
    with open("data.json", "w") as file:
        file.write('{ "error": "'+msg+'" }')

while True:
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    if humidity is not None and temperature is not None:
        print(temperature, humidity)
        print("Temp={0:0.1f}*C  Humidity={1:0.1f}%".format(temperature, humidity))
        success(temperature, humidity)
    else:
        msg = "Failed to retrieve data from humidity sensor"
        print(msg)
        error(msg)
