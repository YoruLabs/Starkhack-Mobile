import http.server
import socketserver
import urllib.parse

PORT = 3000

class OAuthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_path.query)
        if 'code' in query_params:
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            code = query_params['code'][0]
            # self.wfile.write(f"Authorization Code: {code}".encode())
            redirect_url = f'zap-mobile://callback/monerium?code={code}&type=success'
            # Redirect to above url
            self.wfile.write(f"<script>window.location.href = '{redirect_url}';</script>".encode())

        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Error: No authorization code received.")
            redirect_url = 'zap-mobile://callback/monerium?type=cancel'
            # Redirect to above url
            self.wfile.write(f"<script>window.location.href = '{redirect_url}';</script>".encode())

with socketserver.TCPServer(("", PORT), OAuthHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
