document.addEventListener('DOMContentLoaded', () => {
    const characterList = document.getElementById('character-list');

    function displayCharacterList() {
        characterList.innerHTML = '';
        const characters = [
            { name: 'Rabban', page: 'david.html', miniImg: 'images/perso/bruteMiniature.png', logoImg: 'images/perso/logoBrute.png' },
            { name: 'Nishital', page: 'jo.html', miniImg: 'images/perso/crapuleMiniature.jpeg', logoImg: 'images/perso/logoCrapule.PNG' },
            { name: 'Gelbin Mekkanivelle', page: 'damien.html', miniImg: 'images/perso/bricoleurMiniature.png', logoImg: 'images/perso/logoBricoleur.PNG' }
        ];

<<<<<<< HEAD
        characters.forEach(character => {
            const storedData = localStorage.getItem(`characterData-${character.name}`);
            const li = document.createElement('li');
            li.className = 'character-item';
=======
                if (characterName === 'Rabban') {
                    const miniImg = document.createElement('img');
                    miniImg.src = 'images/perso/bruteMiniature.png';
                    miniImg.alt = 'Miniature Rabban';
                    li.appendChild(miniImg);
>>>>>>> 13f19d5897319d33da26dd0f88caff09d811697e

            if (storedData) {
                // Afficher le personnage chargé
                const miniImg = document.createElement('img');
                miniImg.src = character.miniImg;
                miniImg.alt = `Miniature ${character.name}`;
                li.appendChild(miniImg);

<<<<<<< HEAD
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
=======
                    const logoImg = document.createElement('img');
                    logoImg.src = 'images/perso/logoBrute.png';
                    logoImg.alt = 'Logo Rabban';
                    li.appendChild(logoImg);
                } else if (characterName === 'Nishital') {
                    const miniImg = document.createElement('img');
                    miniImg.src = 'images/perso/crapuleMiniature.jpeg';
                    miniImg.alt = 'Miniature Nishital';
                    li.appendChild(miniImg);

                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'character-name';
                    nameSpan.textContent = characterName;
                    li.appendChild(nameSpan);

                    const logoImg = document.createElement('img');
                    logoImg.src = 'images/perso/logoCrapule.PNG';
                    logoImg.alt = 'Logo Nishital';
                    li.appendChild(logoImg);
                } else if (characterName === 'Gelbin Mekkanivelle') {
                    const miniImg = document.createElement('img');
                    miniImg.src = 'images/perso/bricoleurMiniature.png';
                    miniImg.alt = 'Miniature Gelbin Mekkanivelle';
                    li.appendChild(miniImg);

                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'character-name';
                    nameSpan.textContent = characterName;
                    li.appendChild(nameSpan);

                    const logoImg = document.createElement('img');
                    logoImg.src = 'images/perso/logoBricoleur.PNG';
                    logoImg.alt = 'Logo Gelbin Mekkanivelle';
                    li.appendChild(logoImg);
                } else {
                    li.textContent = characterName;
                }

                li.addEventListener('click', () => {
                    localStorage.setItem('selectedCharacter', characterName);
                    navigateToCharacterPage(characterName);
>>>>>>> 13f19d5897319d33da26dd0f88caff09d811697e
                });
            } else {
                // Afficher un lien pour charger le personnage si non chargé
                const link = document.createElement('a');
                link.href = character.page;
                link.textContent = `Charger ${character.name}`;
                li.appendChild(link);
            }

            characterList.appendChild(li);
        });
    }

<<<<<<< HEAD
    function navigateToCharacterPage(page) {
        window.location.href = page;
=======
    function navigateToCharacterPage(name) {
        if (name === 'Rabban') {
            window.location.href = 'david.html';
        } else if (name === 'Nishital') {
            window.location.href = 'jo.html';
        } else if (name === 'Gelbin Mekkanivelle') {
            window.location.href = 'damien.html';
        } else {
            alert(`Aucun personnage trouvé avec le nom ${name}.`);
        }
>>>>>>> 13f19d5897319d33da26dd0f88caff09d811697e
    }

    displayCharacterList();
});



// document.addEventListener('DOMContentLoaded', () => {
//     const characterList = document.getElementById('character-list');

//     // Affiche la liste des personnages disponibles
//     function displayCharacterList() {
//         characterList.innerHTML = '';
//         for (let i = 0; i < localStorage.length; i++) {
//             const key = localStorage.key(i);
//             if (key.startsWith('characterData-')) {
//                 const characterName = key.replace('characterData-', '');
//                 const li = document.createElement('li');
//                 li.className = 'character-item';

//                 // Ajoutez l'image de la miniature pour Rabban
//                 if (characterName === 'Rabban') {
//                     const miniImg = document.createElement('img');
//                     miniImg.src = 'images/perso/bruteMiniature.png';
//                     miniImg.alt = 'Miniature Rabban';
//                     li.appendChild(miniImg);

//                     const nameSpan = document.createElement('span');
//                     nameSpan.className = 'character-name';
//                     nameSpan.textContent = characterName;
//                     li.appendChild(nameSpan);

//                     const logoImg = document.createElement('img');
//                     logoImg.src = 'images/perso/logoBrute.png';
//                     logoImg.alt = 'Logo Rabban';
//                     li.appendChild(logoImg);
//                 } else {
//                     const nameSpan = document.createElement('span');
//                     nameSpan.className = 'character-name';
//                     nameSpan.textContent = characterName;
//                     li.appendChild(nameSpan);
//                 }

//                 // Ajoutez le bouton de suppression
//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Supprimer';
//                 deleteButton.className = 'delete-button';
//                 deleteButton.addEventListener('click', (event) => {
//                     event.stopPropagation(); // Empêche la navigation lors de la suppression
//                     deleteCharacter(characterName);
//                 });
//                 li.appendChild(deleteButton);

//                 li.addEventListener('click', () => {
//                     navigateToCharacterPage(characterName);
//                 });
//                 characterList.appendChild(li);
//             }
//         }
//     }

//     // Navigue vers la page du personnage
//     function navigateToCharacterPage(name) {
//         if (name === 'Rabban') {
//             window.location.href = 'characterDavid.html';
//         } else if (name === 'jo') {
//             window.location.href = 'characterJo.html';
//         } else {
//             alert(`Aucun personnage trouvé avec le nom ${name}.`);
//         }
//     }

//     // Supprime un personnage
//     function deleteCharacter(name) {
//         const key = `characterData-${name}`;
//         localStorage.removeItem(key);
//         displayCharacterList();
//     }

//     // Initialisation
//     displayCharacterList();
// });
