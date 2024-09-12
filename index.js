document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');
    const uploadInput = document.getElementById('upload-json');
    const uploadButton = document.getElementById('upload-json-btn');

    // Fonction pour afficher la liste des personnages
    function displayCharacterList() {
        characterList.innerHTML = '';
        const characters = [
            { name: 'Rabban', page: 'david.html', miniImg: 'images/perso/bruteMiniature.png', logoImg: 'images/perso/logoBrute.png' },
            { name: 'Nishital', page: 'jo.html', miniImg: 'images/perso/crapuleMiniature.jpeg', logoImg: 'images/perso/logoCrapule.PNG' },
            { name: 'Gelbin Mekkanivelle', page: 'damien.html', miniImg: 'images/perso/bricoleurMiniature.png', logoImg: 'images/perso/logoBricoleur.PNG' }
        ];

        characters.forEach(character => {
            const storedData = localStorage.getItem(`characterData-${character.name}`);
            const li = document.createElement('li');
            li.className = 'character-item';

            if (storedData) {
                // Afficher le personnage chargé
                const miniImg = document.createElement('img');
                miniImg.src = character.miniImg;
                miniImg.alt = `Miniature ${character.name}`;
                li.appendChild(miniImg);

                const nameSpan = document.createElement('span');
                nameSpan.className = 'character-name';
                nameSpan.textContent = character.name;
                li.appendChild(nameSpan);

                const logoImg = document.createElement('img');
                logoImg.src = character.logoImg;
                logoImg.alt = `Logo ${character.name}`;
                li.appendChild(logoImg);

                li.addEventListener('click', () => {
                    localStorage.setItem('selectedCharacter', character.name);
                    navigateToCharacterPage(character.page);
                });
            } else {
                // Afficher un lien pour charger le personnage si non chargé
                const link = document.createElement('a');
                link.href = character.page;
                link.textContent = ` ${character.name}`;
                li.appendChild(link);
            }

            characterList.appendChild(li);
        });
    }

    // Charger les données depuis un fichier JSON
    uploadButton.addEventListener('click', () => {
        if (!uploadInput.files.length) {
            alert('Veuillez sélectionner un fichier JSON.');
            return;
        }

        const file = uploadInput.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const json = JSON.parse(event.target.result);
                const characterName = json.name;
                if (!characterName) {
                    alert('Le fichier JSON est invalide ou ne contient pas de données de personnage.');
                    return;
                }

                // Sauvegarder les données du personnage dans le localStorage
                localStorage.setItem(`characterData-${characterName}`, JSON.stringify(json));
                alert(`Données du personnage ${characterName} chargées avec succès.`);
                // Mettre à jour la liste des personnages après chargement
                displayCharacterList();
            } catch (e) {
                alert('Erreur lors du chargement du fichier JSON.');
            }
        };
        reader.readAsText(file);
    });

    function navigateToCharacterPage(page) {
        window.location.href = page;
    }

    // Afficher la liste des personnages
    displayCharacterList();
});
