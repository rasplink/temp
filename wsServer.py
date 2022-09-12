import asyncio
import websockets
import json
import time
import board
import adafruit_dht

def ws(PORT, ip):
    print("ws listening on Port " + str(PORT))

    async def echo(ws):
        async for msg in ws:
            if msg == "connected":
                print("A client just connected")

                # read from gpio pin 4, pin 7 as physical
                dhtDevice = adafruit_dht.DHT22(board.D4, use_pulseio=False) 

                while True:
                    try:
                        temperature_c = dhtDevice.temperature
                        humidity = dhtDevice.humidity
                        dic = {"msg": "sensor", "data": {"temp": temperature_c, "humidity": humidity}}
                        print(dic)
                        await ws.send(json.dumps(dic))
                    except RuntimeError as error:
                        print("RuntimeError: ", error.args[0])
                        time.sleep(2)
                        continue
                    except Exception as error:
                        dic = {"msg": "sensor", "data": {"error": "Failed to fetch data from sensor"}}
                        print(dic)
                        await ws.send(json.dumps(dic))
                        dhtDevice.exit()
                        raise error

                    time.sleep(2)

    start_server = websockets.serve(echo, ip, PORT)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
