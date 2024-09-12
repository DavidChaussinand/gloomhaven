document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-json');
    const uploadInput = document.getElementById('upload-json');
    const uploadButton = document.getElementById('upload-json-btn');

    // Télécharger les données du personnage en fichier JSON
    downloadButton.addEventListener('click', () => {
        const characterName = localStorage.getItem('selectedCharacter');
        if (!characterName) {
            alert('Aucun personnage sélectionné.');
            return;
        }

        const characterData = JSON.parse(localStorage.getItem(`characterData-${characterName}`));
        if (!characterData) {
            alert('Aucune donnée disponible pour ce personnage.');
            return;
        }

        // Charger la liste des items du store depuis window.storeItems si défini
        if (window.storeItems) {
            characterData.items.forEach(item => {
                const storeItem = window.storeItems.find(storeItem => storeItem.id == item.id);
                if (storeItem) {
                    item.cost = storeItem.cost; // Associer le coût
                }
            });
        }

        // Convertir en blob pour le téléchargement
        const blob = new Blob([JSON.stringify(characterData)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${characterName}-data.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

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
                alert(`Données du personnage ${characterName} chargées avec succès. Merci de rafraichir la page.`);
            } catch (e) {
                alert('Erreur lors du chargement du fichier JSON.');
            }
        };
        reader.readAsText(file);
    });
});
