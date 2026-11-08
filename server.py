import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # In log gon gang, de doc
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    # Cho phep su dung lai port ngay lap tuc
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("   🚀 MYLIFE DASHBOARD - MÁY CHỦ LOCAL ĐANG CHẠY")
        print("=" * 60)
        print(f"👉 Địa chỉ truy cập: {url}")
        print("👉 Nhấn Ctrl + C để dừng máy chủ")
        print("=" * 60)
        
        # Tu dong mo trinh duyet
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Đã dừng máy chủ Local.")
            sys.exit(0)

