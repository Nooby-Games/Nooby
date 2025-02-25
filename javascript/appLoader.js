document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const appFrame = document.getElementById('appFrame');
    const appTitle = document.getElementById('appTitle');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const appInfo = document.getElementById('appInfo');

    if (appContainer) {
        // This is the app list page
        generateAppElements(appContainer);
        setupSearch();
    } else if (appFrame) {
        // This is the individual app page
        loadApp();
    }

    function generateAppElements(container) {
        if (typeof apps !== 'undefined') {
            const sortedApps = Object.entries(apps).sort((a, b) =>
                a[1].title.toLowerCase().localeCompare(b[1].title.toLowerCase())
            );

            sortedApps.forEach(([id, app]) => {
                const appElement = document.createElement('div');
                appElement.className = 'content';
                appElement.innerHTML = `
                    <a href="app-template.html?id=${id}">
                        <h3>${app.title}</h3>
                        <img src="${app.image}" class='img' alt="${app.title}" />
                        <p>${app.description}</p>
                    </a>
                `;
                container.appendChild(appElement);
            });
        } else {
            console.error('App data not found');
        }
    }

    function setupSearch() {
        const searchInput = document.getElementById('query');
        const resultsContainer = document.getElementById('search-results');

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchText = searchInput.value.toLowerCase();
                const appElements = document.querySelectorAll('.content'); // Corrected variable name
                let hasResults = false;

                appElements.forEach(appElement => { // Corrected variable name
                    const appTitleText = appElement.querySelector('h3').textContent.toLowerCase(); // Corrected variable name
                    if (appTitleText.includes(searchText)) {
                        appElement.style.display = '';
                        hasResults = true;
                    } else {
                        appElement.style.display = 'none';
                    }
                });

                if (resultsContainer) {
                    resultsContainer.innerHTML = hasResults ? '' : '<div class="no-results">No results found</div>';
                }
            });
        }
    }

    function loadApp() {
        const urlParams = new URLSearchParams(window.location.search);
        const appId = urlParams.get('id');

        if (appId && apps[appId]) {
            const app = apps[appId];
            document.title = app.title;
            appTitle.textContent = app.title;

            appFrame.src = app.originalUrl;
            appFrame.style.display = 'block';

            // Adjust frame size
            appFrame.style.width = '100%';
            appFrame.style.height = '80vh'; // 80% of the viewport height

            if (fullscreenButton) {
                fullscreenButton.addEventListener('click', () => {
                    if (appFrame.requestFullscreen) {
                        appFrame.requestFullscreen();
                    } else if (appFrame.mozRequestFullScreen) {
                        appFrame.mozRequestFullScreen();
                    } else if (appFrame.webkitRequestFullscreen) {
                        appFrame.webkitRequestFullscreen();
                    } else if (appFrame.msRequestFullscreen) {
                        appFrame.msRequestFullscreen();
                    }
                });
            }

            let appInfoHTML = '';
            if (app.controls) {
                appInfoHTML += `<div class="controls"><h3>Controls:</h3>${app.controls}</div>`;
            }
            if (app.credits) {
                appInfoHTML += `<div class="credits"><h3>Credits:</h3>${app.credits}</div>`;
            }
            appInfo.innerHTML = appInfoHTML || '';
            appInfo.style.display = appInfoHTML ? 'block' : 'none';

        } else {
            console.error('App not found');
            appTitle.textContent = 'App Not Found';
            appFrame.style.display = 'none';
        }
    }
});