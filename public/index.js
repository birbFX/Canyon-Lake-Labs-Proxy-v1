const app = document.getElementById("app");
const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const frameWrapper = document.getElementById("sj-frame-wrapper");
const frameElement = document.getElementById("sj-frame");
const frameUrl = document.getElementById("sj-frame-url");
const homeButton = document.getElementById("sj-home");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");

let controller;
let frame;
let initialized = false;

function normalizeAddress(value) {
	let url = (value || "").trim();
	if (!url) return null;
	if (/^https?:\/\//i.test(url)) return url;
	if (url.includes(".") && !url.startsWith(" ")) return "https://" + url;
	return searchEngine.value.replace("%s", encodeURIComponent(url));
}

async function init() {
	if (initialized) return;
	controller = await initBootstrap();

	const cachePlugin = new $scramjetUtils.HttpCachePlugin();
	const urlWatcher = new $scramjetUtils.UrlWatcherPlugin((url) => {
		frameUrl.textContent = url;
	});
	const catchEscapedLinks = new $scramjetUtils.CatchEscapedLinksPlugin(
		(url) => new URL(`/?goto=${encodeURIComponent(url.href)}`, location.origin)
	);

	frame = controller.createFrame(frameElement, {
		plugins: [cachePlugin, urlWatcher, catchEscapedLinks],
	});
	initialized = true;
}

function showError(message, details) {
	frameWrapper.classList.remove("active");
	app.style.display = "";
	error.textContent = message;
	errorCode.textContent = details || "";
}

async function navigate(value) {
	const url = normalizeAddress(value);
	if (!url) return;
	try {
		if (!frame) await init();
		await frame.go(url);
		app.style.display = "none";
		frameWrapper.classList.add("active");
	} catch (e) {
		showError(e.message, e.stack);
	}
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	navigate(address.value);
});

homeButton.addEventListener("click", () => {
	frameWrapper.classList.remove("active");
	app.style.display = "";
});

const goto = new URL(location.href).searchParams.get("goto");
if (goto) {
	history.replaceState(null, "", location.pathname);
	address.value = goto;
	navigate(goto);
}
