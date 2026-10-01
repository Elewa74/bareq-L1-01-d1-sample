#!/usr/bin/env python3
"""serve.py — خادم محلّيّ لعيّنة درس بارق (بلا إنترنت) · مكتبة Python القياسية فقط.
- يدعم Range (206 + Content-Range) ليعمل تقديم المقاطع والتشغيل في Safari.
- أنواع MIME صريحة (.js .mjs .wasm .mp4 .webm .woff2 .json .mp3 .webp .svg .pck) لا تعتمد على سجلّ Windows.
- يجرّب المنفذ المطلوب ثم ما يليه إن كان مشغولاً، ويطبع العنوان، ويكتب المنفذ في server.port لملف البدء.
الاستعمال:  python serve.py [PORT]   (الافتراضيّ 8770)
"""
import http.server, os, re, socketserver, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
MIME = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.wasm': 'application/wasm',
    '.pck': 'application/octet-stream', '.gz': 'application/octet-stream', '.mp4': 'video/mp4', '.webm': 'video/webm',
    '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.woff2': 'font/woff2', '.woff': 'font/woff',
    '.ttf': 'font/ttf', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.webp': 'image/webp', '.vtt': 'text/vtt; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf',
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def guess_type(self, path):
        return MIME.get(os.path.splitext(path)[1].lower()) or super().guess_type(path)

    def log_message(self, fmt, *args):  # هادئ
        pass

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def send_head(self):
        rng = self.headers.get('Range')
        path = self.translate_path(self.path)
        if not rng or os.path.isdir(path) or not os.path.isfile(path):
            return super().send_head()
        m = re.match(r'bytes=(\d*)-(\d*)$', rng.strip())
        size = os.path.getsize(path)
        if not m or (m.group(1) == '' and m.group(2) == ''):
            return super().send_head()
        if m.group(1) == '':  # آخر N بايت
            start, end = max(0, size - int(m.group(2))), size - 1
        else:
            start = int(m.group(1)); end = int(m.group(2)) if m.group(2) else size - 1
        end = min(end, size - 1)
        if start >= size or start > end:
            self.send_response(416); self.send_header('Content-Range', 'bytes */%d' % size); self.end_headers(); return None
        f = open(path, 'rb'); f.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', 'bytes %d-%d/%d' % (start, end, size))
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        self._left = end - start + 1
        return f

    def copyfile(self, source, outputfile):
        left = getattr(self, '_left', None)
        if left is None:
            return super().copyfile(source, outputfile)
        try:
            while left > 0:
                buf = source.read(min(65536, left))
                if not buf: break
                outputfile.write(buf); left -= len(buf)
        except (BrokenPipeError, ConnectionResetError):
            pass
        finally:
            self._left = None


class Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = False


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8770
    for p in range(port, port + 20):
        try:
            srv = Server(('127.0.0.1', p), Handler)
        except OSError:
            continue
        try:
            open(os.path.join(ROOT, 'server.port'), 'w').write(str(p))
        except OSError:
            pass
        print('بارق · العيّنة تعمل على  http://127.0.0.1:%d/index.html   (أغلق النافذة للإيقاف)' % p, flush=True)
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            pass
        return
    print('لا منفذ متاح بين %d و%d' % (port, port + 19)); sys.exit(1)


if __name__ == '__main__':
    main()
