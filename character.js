document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name');
    const goldAmountElement = document.getElementById('gold-amount');
    const goldAmountInput = document.getElementById('gold-amount-input');
    const goldAmountInputContainer = document.getElementById('gold-amount-input-container');
    const xpActuelElement = document.getElementById('xp-actuel');
    const xpActuelInput = document.getElementById('xp-actuel-input');
    const xpActuelInputContainer = document.getElementById('xp-actuel-input-container');
    const itemsList = document.getElementById('items-list');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const backButton = document.getElementById('back-button');
    const levelCheckboxes = document.querySelectorAll('.level-checkbox');
    const benefitCheckboxes = document.querySelectorAll('.benefit-checkbox');
    const noteCheckboxes = document.querySelectorAll('.note-checkbox');
    const storeButton = document.getElementById('store-button');

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
                    addItemToList(item, false, characterData);
                });
            }
            levelCheckboxes.forEach(checkbox => {
                checkbox.checked = characterData.skillLevel.includes(checkbox.value);
                checkbox.disabled = true;
            });
            benefitCheckboxes.forEach(checkbox => {
                checkbox.checked = characterData.benefits && characterData.benefits.includes(checkbox.value);
                checkbox.disabled = true;
            });
            noteCheckboxes.forEach(checkbox => {
                checkbox.checked = characterData.notes && characterData.notes.includes(checkbox.value);
                checkbox.disabled = true;
            });
        }
    }

    function addItemToList(item, editable = false, characterData = null) {
        const li = document.createElement('li');
        li.dataset.itemId = item.id;
        const itemImage = document.createElement('img');
        itemImage.src = `images/items/${item.image}`;
        itemImage.alt = item.name;
        itemImage.className = 'character-item-image';
    
        li.appendChild(itemImage);
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-button');
        deleteButton.style.display = editable ? 'inline' : 'none';
        deleteButton.addEventListener('click', () => {
            const character = characterData || JSON.parse(localStorage.getItem(`characterData-${nameElement.textContent}`));
            const itemCost = item.cost / 2;
            character.goldAmount = parseInt(character.goldAmount) + itemCost;
<<<<<<< HEAD
            goldAmountInput.value = character.goldAmount;
=======
>>>>>>> 13f19d5897319d33da26dd0f88caff09d811697e
            localStorage.setItem(`characterData-${nameElement.textContent}`, JSON.stringify(character));
            goldAmountElement.textContent = character.goldAmount;

            // Supprimer l'item de la liste et des données du personnage
            li.remove();
            const itemIndex = character.items.findIndex(i => i.id === item.id);
            if (itemIndex !== -1) {
                character.items.splice(itemIndex, 1);
            }
        });
    
        li.appendChild(deleteButton);
        itemsList.appendChild(li);
    }

    editButton.addEventListener('click', () => {
        xpActuelInputContainer.style.display = 'block';
        goldAmountInputContainer.style.display = 'block';
        saveButton.style.display = 'inline';
        editButton.style.display = 'none';
        levelCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
        benefitCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
        noteCheckboxes.forEach(checkbox => {
            checkbox.disabled = false;
        });
        document.querySelectorAll('#items-list button').forEach(button => {
            button.style.display = 'inline';
        });
    });

    saveButton.addEventListener('click', () => {
        const name = nameElement.textContent;
        const items = Array.from(itemsList.children).map(li => {
            return {
                id: li.dataset.itemId,
                image: li.querySelector('img').src.split('/').pop(),
                name: li.querySelector('img').alt,
                cost: parseInt(li.dataset.itemCost)
            };
        });
    
        const benefits = Array.from(benefitCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        const notes = Array.from(noteCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        const characterData = {
            name: name,
            skillLevel: Array.from(levelCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value),
            goldAmount: goldAmountInput.value,
            xpActuel: xpActuelInput.value,
            items: items, // Directement sauvegarder les items tels quels
            benefits: benefits,
            notes: notes
        };
    
        localStorage.setItem(`characterData-${name}`, JSON.stringify(characterData));
        alert(`Personnage ${name} sauvegardé !`);
    
        xpActuelElement.textContent = characterData.xpActuel;
        goldAmountElement.textContent = characterData.goldAmount;
        xpActuelInputContainer.style.display = 'none';
        goldAmountInputContainer.style.display = 'none';
        saveButton.style.display = 'none';
        editButton.style.display = 'inline';
        levelCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
        });
        benefitCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
        });
        noteCheckboxes.forEach(checkbox => {
            checkbox.disabled = true;
        });
        document.querySelectorAll('#items-list button').forEach(button => {
            button.style.display = 'none';
        });
    });

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    storeButton.addEventListener('click', () => {
        window.location.href = 'store.html';
    });

    loadCurrentCharacter();
});
