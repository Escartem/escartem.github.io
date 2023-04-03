// script for projects section

view = "cats";

catsDiv = document.getElementById("cats");
projDiv = document.getElementById("proj");
cardDiv = document.getElementById("card");

function createLine(title, id, func, parent, img=null, right="▲", color=null) {
	lineDiv = document.createElement("div");
	lineDiv.classList.add("line");
	lineDiv.id = id;
	lineDiv.onclick = func;

	if (color != null) {
		lineDiv.style.backgroundColor = "var(--"+color+")";
	}

	if (img != null) {
		lineImg = document.createElement("img");
		lineImg.src = `${base_url}/${icon_path}/${id}.png`;
		lineImg.draggable = false;
		lineDiv.appendChild(lineImg);
	}

	lineTitle = document.createElement("span");
	if (right == "") {
		backTriangle = document.createElement("span");
		backTriangle.style.transform = "rotate(-90deg)";
		backTriangle.style.display = "inline-block";
		backTriangle.innerHTML = "▲";
		lineTitle.appendChild(backTriangle);
		lineTitle.innerHTML += " Go back";
	} else {
		lineTitle.innerHTML = title;
	}
	lineTitle.id = "line-text";
	lineDiv.appendChild(lineTitle);

	titleEnd = document.createElement("span");
	titleEnd.innerHTML = right;
	titleEnd.id = "line-end";
	lineDiv.appendChild(titleEnd);

	parent.appendChild(lineDiv);
}

function setTransform(value) {
	vars = [[0,5,5], [-105,-100,-95], [-205,-205,-200]];
	selected = vars[value];

	catsDiv.style.transform = "translateX("+selected[0]+"%)";
	projDiv.style.transform = "translateX("+selected[1]+"%)";
	cardDiv.style.transform = "translateX("+selected[2]+"%)";
}

function setupCats() {
	for (const [key, value] of Object.entries(edata["categories"])) {
		createLine(value["name"], key, function() {setView("proj" ,key)}, catsDiv);
	}
}

function setupProj(id) {
	projDiv.innerHTML = "";
	createLine("▲ Go back", "back", function() {setView("cats")}, projDiv, null, "", "purple");
	for (const [key, value] of Object.entries(edata["categories"][id]["proj"])) {
		createLine(edata["projects"][value]["name"], value, function() {setView("card" ,value)}, projDiv, "1");
	}
}

function setupCard(data, id) {
	cardLeft = document.getElementById("card-left");
	cardLeft.innerHTML = "";

	// back btn
	backBtn = document.createElement("div");
	backBtn.id = "quit-wrapper";
	backBtn.onclick = function() {setView("proj")};

	backSpan = document.createElement("span");
	backTriangle = document.createElement("span");
	backTriangle.style.transform = "rotate(-90deg)";
	backTriangle.style.display = "inline-block";
	backTriangle.innerHTML = "▲";
	backSpan.appendChild(backTriangle);
	backSpan.innerHTML += " Go back";
	backSpan.id = "quit-card";

	backBtn.appendChild(backSpan);

	cardLeft.appendChild(backBtn);

	// left wrap
	leftWrap = document.createElement("div");
	leftWrap.id = "left-wrapper";

	//img
	cardImg = document.createElement("img");
	cardImg.id = "card-img";
	cardImg.src = `${base_url}/${card_path}/${id}.png`;
	cardImg.draggable = false;
	cardImg.onclick = function() {window.open(cardImg.src, "_blank")};
	cardImg.style.cursor = "pointer";

	leftWrap.appendChild(cardImg);

	// btns
	btnWrap = document.createElement("div");
	btnWrap.id = "button-wrapper";

	btnText = data["btn"]["title"];

	btnDiv = document.createElement("div");
	btnDiv.id = "card-button";
	if (data["btn"]["url"] != "") {
		btnDiv.onclick = function() {window.open(data["btn"]["url"], "_blank")};
	} else {
		btnDiv.style.backgroundColor = "var(--red)";
		btnDiv.style.cursor = "not-allowed";
		btnText = "No link";
	}

	btnSpan = document.createElement("span");

	btnIcon = document.createElement("i");
	btnIcon.classList = "fa-solid fa-arrow-up-right-from-square";

	btnSpan.appendChild(btnIcon);

	btnSpan.innerHTML += " " + btnText;
	btnSpan.id = "btn-text";

	btnDiv.appendChild(btnSpan);
	btnWrap.appendChild(btnDiv);
	leftWrap.appendChild(btnWrap);

	cardLeft.appendChild(leftWrap);

	// right
	descWrap = document.getElementById("desc-wrapper");
	descWrap.innerHTML = "";

	cardDesc = document.createElement("span");
	cardDesc.id = "card-desc";
	cardDesc.innerHTML = data["desc"];

	descWrap.appendChild(cardDesc);
	descWrap.scrollTop = 0;
}

function setView(newView, id=null) {
	if (view == "cats") {
		// cats to proj (with setup)

		setupProj(id);

		setTransform("1");

		view = "proj";

	} else if (view == "card") {
		// card to proj (no setup)

		setTransform("1");

		view = "proj";

	} else if (view == "proj" && newView == "cats") {
		// proj to cats (no setup)

		setTransform("0");

		view = "cats";
		
	} else if (view == "proj" && newView == "card") {
		// proj to card (with setup)

		setupCard(edata["projects"][id], id);

		setTransform("2");

		view = "card";
	}
}

window.addEventListener("load", () => {
	fetch("https://ena.escartem.eu.org/egio/edata.json").then(response => response.json()).then(json => {
		edata = json;
		base_url = edata["path"]["base_url"];
		icon_path = edata["path"]["icon_path"];
		card_path = edata["path"]["card_path"];
		document.getElementById("loadingProjects").style.visibility = "hidden";
		document.getElementById("projects-list").style.filter = "brightness(1)";
		setupCats();

		Particles.init({
			selector: ".background",
			connectParticles: true,
			color: "#ffffff",
			speed: 0.3
		});
	});
});
