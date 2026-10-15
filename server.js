import http from "node:http";
import express from "express";
import { bootstrap } from "@mercuryworkshop/proxy-bootstrap";

const PORT = process.env.PORT || 3030;

const { routeRequest, routeUpgrade } = await bootstrap();

const app = express();

app.use((req, res, next) => {
	if (routeRequest(req, res)) return;
	next();
});
app.use(express.static("public"));

const server = http.createServer(app);

server.on("upgrade", routeUpgrade);

server.listen(PORT, () => {
	console.log(`Canyon Lake Lab's Proxy running on port ${PORT}`);
});
