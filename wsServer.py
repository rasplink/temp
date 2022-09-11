import asyncio
import websockets

import time
import random
import json

tempList = [10, 20, 30, 40, 50,60,70,80,90,100]
humidityList = [10, 20, 30, 40, 50,60,70,80,90,100]

def ws(PORT):
    print("ws listening on Port " + str(PORT))

    async def echo(ws):
        async for msg in ws:
            if msg == "connected":
                print("A client just connected")
                while True:
                    dic = {"msg": "sensor", "data": {"temp": random.choice(tempList), "humidity": random.choice(humidityList)}}
                    print(dic)
                    await ws.send(json.dumps(dic))
                    time.sleep(3)

    start_server = websockets.serve(echo, "localhost", PORT)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
