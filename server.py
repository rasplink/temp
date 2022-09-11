from http.server import HTTPServer, BaseHTTPRequestHandler
from mimes import mimesList
import re

def serve(root = "", PORT = 3000, wsPort = 8090):
    if root != "": root = root + "/"
    skippedRoutes = ["/favicon.ico", "/service-worker.js"]

    class reqHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            route = self.path
            file = ""
            self.send_response(200)

            if route == "/":
                self.send_header("content-type", "text/html")
                # get ws.js content and bind ws port
                jsStr = open("wsClient.js").read()
                jsStr = re.sub("{{port}}",  str(wsPort), jsStr)
                # get html content and bind ws logic
                htmlStr = open(root + "index.html").read()
                file = re.sub("</body>",  "<script>" + jsStr + "</script></body>", htmlStr)
            else:
                if route in skippedRoutes:
                    pass
                else: 
                    for item in mimesList:
                        try:
                            if route.index(item["ext"]) >= 0:
                                self.send_header("content-type", item["mime"])
                                break
                        except:
                            pass

                    file = open(root + route[1:]).read()
            
            self.end_headers()
            self.wfile.write(bytes(file, 'utf-8')) 

    server = HTTPServer(("", PORT), reqHandler)
    print("serving: http://localhost:" + str(PORT))
    server.serve_forever()
