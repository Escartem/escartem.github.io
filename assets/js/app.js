// aeugh
setupEMS({"RCB": true, "DVT": false, "BSC": true, "SRC": false});

//////////////////////
// --- FEATURED --- //
//////////////////////

featured = document.getElementById("f-content-wrapper");

function setupFeatured() {
	// i don't know why, but this section just doesn't want to render properly on some mobile devices no matter the browser, so just hide it and yeah good enough
	if (isMobile.any == true) {
		// hide featured section
		document.getElementsByClassName("featured-transition")[0].classList.add("hidden")
		document.getElementById("featured").classList.add("hidden")
		// update heights
		document.getElementsByClassName("background")[0].style.top = "calc(100% + 10vw)"
		document.getElementById("footer-background").style.top = "calc(200% + 20vw)"
	} else {
		for (const [key, value] of Object.entries(edata["featured"])) {
			temp = edata["projects"][value];
			addFeaturedCard(temp["name"], temp["short"], temp["btn"]["title"], temp["btn"]["url"], `${base_url}/${icon_path}/${value}.png`, value);
		}
	}
}

// TODO : add colors sets for buttons ?

function addFeaturedCard(title, desc, btn, link, img, id) {
	card = document.createElement("div");
	card.classList.add("f-card");

	if (window.mobileAndTabletCheck() == false) {
		card.setAttribute("zEnabled", "");

		VanillaTilt.init(card, {
			// glare doesn't seem to always work, and that's very cringe
			glare: true,
			"max-glare": 0.8,
			reverse: true,
		})
	}

	// top
	topDiv = document.createElement("div");
	topDiv.classList.add("f-card-top");

	icon = document.createElement("img");
	icon.draggable = false;
	icon.classList.add("f-card-icon");
	icon.alt = `${title} project icon`;
	icon.src = img;

	cardTitle = document.createElement("span");
	cardTitle.classList.add("f-card-title");
	cardTitle.innerHTML = title;

	topDiv.appendChild(icon);
	topDiv.appendChild(cardTitle);

	// middle
	middleDiv = document.createElement("div");
	middleDiv.classList.add("f-card-middle");

	cardDesc = document.createElement("span");
	cardDesc.classList.add("f-card-desc");
	cardDesc.innerHTML = desc;

	middleDiv.appendChild(cardDesc);

	// bottom
	bottomDiv = document.createElement("div");
	bottomDiv.classList.add("f-card-bottom");

	btnWrapper = document.createElement("div");
	btnWrapper.classList.add("f-btn-wrapper");

	cardBtn = document.createElement("button");
	cardBtn.classList = "f-card-btn s-green";
	cardBtn.innerHTML = `${btn} +`;
	cardBtn.onclick = function() {window.open(link, "_blank")};

	moreBtn = document.createElement("button");
	moreBtn.classList = "f-card-btn s-red";
	moreBtn.innerHTML = "Read more +";
	moreBtn.onclick = function() {setView("proj", "active"); setView("card", id); document.getElementById("projects").scrollIntoView({"behavior": "smooth"})};

	btnWrapper.appendChild(moreBtn);
	btnWrapper.appendChild(cardBtn);
	bottomDiv.appendChild(btnWrapper);

	// add to page
	card.appendChild(topDiv);
	card.appendChild(middleDiv);
	card.appendChild(bottomDiv);

	featured.appendChild(card);
}

//////////////////////
// --- PROJECTS --- //
//////////////////////

view = "cats";

catsDiv = document.getElementById("cats");
projDiv = document.getElementById("proj");
cardDiv = document.getElementById("card");

function createLine(title, id, func, parent, img=null, right="▲", color=null) {
	lineDiv = document.createElement("div");
	lineDiv.classList.add("line");
	lineDiv.id = `P-${id}`;
	lineDiv.onclick = func;

	if (color != null) {
		lineDiv.style.backgroundColor = "var(--"+color+")";
	}

	if (img != null) {
		lineImg = document.createElement("img");
		lineImg.src = `${base_url}/${icon_path}/${id}.png`;
		lineImg.draggable = false;
		lineImg.alt = `${lineTitle} project icon`;
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
	cardImg.alt = "project image";
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

/////////////////////
// --- SOCIALS --- //
/////////////////////

links = [
	{
		"id": "github",
		"url": "https://github.com/Escartem"
	},
	{
		"id": "youtube",
		"url": "https://youtube.com/@Escartem"
	},
	{
		"id": "discord",
		"url": "https://discord.gg/fzRdtVh"
	}
]

wrapper = document.getElementById("links-wrapper");
splashes = ["microwave-proof", "why tho", "hi :)", "random splash text", "I like trains", "me go brrr", "*angry sounds*", "who reads this", "lost in thoughts", "always late", "oops, wrong button", "chaos reigns", "how.", "hey there :D", "unexpected text", "zoom zoom", "*frustrated noises*", "lost in translation", "cats are awesome", "beep bop", "*screaming internally*", "seriously though", "surprise attack !", "uwu", "ekusupuroshon >:D", "mina gambate ne", "aaaaaaa", "am I bulletproof ?", "why not though", "how intriguing", "*screaming internally* but in a cute way", "turtle", "ow.", "I ate bread yesterday", "how is this entertaining", "stop refreshing", "chaos is just organised messiness", "squish that cat", "beckeh", "lumine supremacy", "late as usual"];

function setupSocials() {
	for (const [key, value] of Object.entries(links)) {
		containerDiv = document.createElement("div");
		containerDiv.classList.add("icon-placeholder");
		containerDiv.onclick = function() {window.open(value["url"], "_blank")};

		icon = document.createElement("i");
		icon.classList = `bottom-icon fa-brands fa-${value["id"]}`;

		containerDiv.appendChild(icon);
		wrapper.appendChild(containerDiv);
	}

	// random splash text at bottom
	document.getElementById("footer-text").innerHTML = `${splashes[Math.floor(Math.random()*splashes.length)]} | Escartem 2024`;
}

////////////////////////
// --- INITIALIZE --- //
////////////////////////

window.mobileAndTabletCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

window.addEventListener("load", () => {
	fetch("https://ena.escartem.moe/egio/edata.json").then(response => response.json()).then(json => {
		// global
		edata = json;
		base_url = edata["path"]["base_url"];
		icon_path = edata["path"]["icon_path"];
		card_path = edata["path"]["card_path"];

		// featured
		setupFeatured();
		
		// projects
		document.getElementById("loadingProjects").style.visibility = "hidden";
		document.getElementById("projects-list").style.filter = "brightness(1)";
		setupCats();

		// socials
		setupSocials();

		// other
		Particles.init({
			selector: ".background",
			connectParticles: true,
			color: "#ffffff",
			speed: 0.3
		});
	});
});
