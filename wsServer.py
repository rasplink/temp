import asyncio
import websockets
import Adafruit_DHT
import json

def ws(PORT):
    print("ws listening on Port " + str(PORT))

    async def echo(ws):
        async for msg in ws:
            if msg == "connected":
                print("A client just connected")
                while True:
                    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
                    if humidity is not None and temperature is not None:
                        # print("Temp={0:0.1f}*C  Humidity={1:0.1f}%".format(temperature, humidity))
                        dic = {"msg": "sensor", "data": {"temp": temperature, "humidity": humidity}}
                        print(dic)
                        await ws.send(json.dumps(dic))
                    else:
                        dic = {"msg": "sensor", "data": {"error": "Failed to fetch data from sensor"}}
                        print(dic)
                        await ws.send(json.dumps(dic))

    start_server = websockets.serve(echo, "localhost", PORT)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
