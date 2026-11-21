/* RoBella local preview server — run:  node serve.js   then open http://localhost:8080 */
const http = require("http"), fs = require("fs"), path = require("path");
const port = +process.argv[2] || 8080, root = path.resolve(process.argv[3] || __dirname);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".json": "application/json" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); console.log("404", p); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store", "Content-Length": data.length });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => console.log("RoBella running at http://localhost:" + port));
