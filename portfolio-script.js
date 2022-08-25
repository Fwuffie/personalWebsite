let slideIndex = {};

window.addEventListener('DOMContentLoaded', (event) => {
	let params = (new URL(document.location)).searchParams
	if (params.has("autoload")) {
		closeWindows()
		document.getElementById(params.get("autoload")).className = 'info animateShow'
	}
	loadDoc()
});

function closeWindows(){
	windows = Array.from(document.getElementsByClassName('info'));
	windows.forEach(function (window) {
		window.className = "info"
	})
}

function loadBackground() {
	document.getElementById('background').style.backgroundImage = "url(assets/background.gif)";
}

function loadDoc() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		const projects = JSON.parse(this.responseText);
		projects.forEach(formatProjects);
		// displayGalleryImages()
	}
	xhttp.open("GET", "projects.json", true);
	return xhttp.send();
}

function formatProjects(project) {
	slideIndex[project.id] = 1

	let projectDom = document.getElementById('cloned-card').cloneNode(true)
	projectDom.id = project.id
	projectDom.querySelector('.project-title').textContent = project.title
	projectDom.querySelector('.project-content').textContent = project.description
	projectDom.querySelector('.project-icon').src = 'assets/projects/' + project.icon
	if (project.images.length) {
		project.images.forEach(function(val) {
			projectDom.querySelector('.project-gallery').innerHTML =
				`<img src="assets/projects/${val}">` +
				projectDom.querySelector('.project-gallery').innerHTML
		})
	} else {
		projectDom.querySelector('.project-gallery').remove()
	}


	document.getElementById('Projects').append(projectDom)
}

function plusDivs(n, e) {
	const projectId = (e.currentTarget.closest('.project-card').id)
	showDivs(slideIndex[projectId] += n, projectId);
}

function showDivs(n, projectId) {
	var x = document.querySelectorAll(`#${projectId} .project-gallery img`);
	console.log(projectId, slideIndex[projectId])
	console.log(n)
	if (n > x.length) {slideIndex[projectId] = 1}
	if (n < 1) {slideIndex[projectId] = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	x[slideIndex[projectId]-1].style.display = "block";
}