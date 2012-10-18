var items = [
	{"text" : "first item"},
	{"text" : "second item"},
]

export function index(req, res) {
	res.render("index", { title: "TypeScript - Express", items:items});
}

export function form(req, res) {
	res.render("form", { title: "New Entry" });
}

export function create(req, res) {
	items.push({"text" : req.body.text});
	res.redirect("/");
}