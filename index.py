from multiprocess import Process
from server import serve
from wsServer import ws
from ip import get_ip

wsPORT = 8090
PORT = 3000
raspiIP = str(get_ip())

p1 = Process(target=serve, args=("public", PORT , wsPORT, raspiIP, ))
p2 = Process(target=ws, args=(wsPORT, raspiIP, ))

p1.start()
p2.start()

p1.join()
p2.join()