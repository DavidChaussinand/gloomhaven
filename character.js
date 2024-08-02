document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name');
    const goldAmountElement = document.getElementById('gold-amount');
    const goldAmountInput = document.getElementById('gold-amount-input');
    const goldAmountInputContainer = document.getElementById('gold-amount-input-container');
    const xpActuelElement = document.getElementById('xp-actuel');
    const xpActuelInput = document.getElementById('xp-actuel-input');
    const xpActuelInputContainer = document.getElementById('xp-actuel-input-container');
    const itemsList = document.getElementById('items-list');
    const newItemInput = document.getElementById('new-item-input');
    const itemsInputContainer = document.getElementById('items-input-container');
    const addItemButton = document.getElementById('add-item-button');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const backButton = document.getElementById('back-button');
    const levelCheckboxes = document.querySelectorAll('.level-checkbox');
    const benefitCheckboxes = document.querySelectorAll('.benefit-checkbox');
    const noteCheckboxes = document.querySelectorAll('.note-checkbox'); // Ajoutez ceci pour gérer les note-checkboxes

    // Charge les données du personnage courant
    function loadCurrentCharacter() {
        const name = nameElement.textContent;
        const storedData = localStorage.getItem(`characterData-${name}`);
        if (storedData) {
            const characterData = JSON.parse(storedData);
            goldAmountElement.textContent = characterData.goldAmount || 0;
            xpActuelElement.textContent = characterData.xpActuel || 0;
            xpActuelInput.value = characterData.xpActuel || 0;
            goldAmountInput.value = characterData.goldAmount || 0;
            itemsList.innerHTML = '';
            if (characterData.items) {
                characterData.items.forEach(item => {
                    addItemToList(item);
                });
            }
            levelCheckboxes.forEach(checkbox => {
                checkbox.checked = characterData.skillLevel.includes(checkbox.value);
                checkbox.disabled = true; // Garder les cases à cocher désactivées au début
            });
            benefitCheckboxes.forEach(checkbox => {
                checkbox.checked = characterData.benefits && characterData.benefits.includes(checkbox.value);
                checkbox.disabled = true; // Garder les cases à cocher désactivées au début
            });
            noteCheckboxes.forEach(checkbox => {
                checkbox.checked = characterData.notes && characterData.notes.includes(checkbox.value);
                checkbox.disabled = true; // Garder les cases à cocher désactivées au début
            });
        }
    }

    function addItemToList(item, editable = false) {
        const li = document.createElement('li');
        li.textContent = item;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-button');
        deleteButton.style.display = editable ? 'inline' : 'none';
        deleteButton.addEventListener('click', () => {
            li.remove();
        });
        li.appendChild(deleteButton);
        itemsList.appendChild(li);
    }

    editButton.addEventListener('click', () => {
        xpActuelInputContainer.style.display = 'block';
        goldAmountInputContainer.style.display = 'block';
        itemsInputContainer.style.display = 'block';
        saveButton.style.display = 'inline';
        editButton.style.display = 'none';
        levelCheckboxes.forEach(checkbox => {
            checkbox.disabled = false; // Activer les cases à cocher lors de la modification
        });
        benefitCheckboxes.forEach(checkbox => {
            checkbox.disabled = false; // Activer les cases à cocher lors de la modification
        });
        noteCheckboxes.forEach(checkbox => {
            checkbox.disabled = false; // Activer les cases à cocher lors de la modification
        });
        // Montrer les boutons de suppression
        document.querySelectorAll('#items-list button').forEach(button => {
            button.style.display = 'inline';
        });
    });

    addItemButton.addEventListener('click', () => {
        const newItem = newItemInput.value.trim();
        if (newItem) {
            addItemToList(newItem, true);
            newItemInput.value = '';
        }
    });

    saveButton.addEventListener('click', () => {
        const name = nameElement.textContent;
        const items = Array.from(itemsList.children).map(li => li.firstChild.textContent);
        const benefits = Array.from(benefitCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        const notes = Array.from(noteCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value); // Ajoutez ceci pour sauvegarder les notes
        const characterData = {
            name: name,
            skillLevel: Array.from(levelCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value),
            goldAmount: goldAmountInput.value,
            xpActuel: xpActuelInput.value,
            items: items,
            benefits: benefits,
            notes: notes // Ajoutez ceci pour sauvegarder les notes
        };

        localStorage.setItem(`characterData-${name}`, JSON.stringify(characterData));
        alert(`Personnage ${name} sauvegardé !`);

        xpActuelElement.textContent = characterData.xpActuel;
        goldAmountElement.textContent = characterData.goldAmount;
        xpActuelInputContainer.style.display = 'none';
        goldAmountInputContainer.style.display = 'none';
        itemsInputContainer.style.display = 'none';
        saveButton.style.display = 'none';
        editButton.style.display = 'inline';
        levelCheckboxes.forEach(checkbox => {
            checkbox.disabled = true; // Désactiver les cases à cocher après la sauvegarde
        });
        benefitCheckboxes.forEach(checkbox => {
            checkbox.disabled = true; // Désactiver les cases à cocher après la sauvegarde
        });
        noteCheckboxes.forEach(checkbox => {
            checkbox.disabled = true; // Désactiver les cases à cocher après la sauvegarde
        });
        // Cacher les boutons de suppression
        document.querySelectorAll('#items-list button').forEach(button => {
            button.style.display = 'none';
        });
    });

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Initialisation
    loadCurrentCharacter();
});
