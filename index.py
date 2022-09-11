from multiprocess import Process
from server import serve
from wsServer import ws

wsPORT = 8090
PORT = 3000

p1 = Process(target=serve, args=("public", PORT , wsPORT,))
p2 = Process(target=ws, args=(wsPORT,))

p1.start()
p2.start()

p1.join()
p2.join()