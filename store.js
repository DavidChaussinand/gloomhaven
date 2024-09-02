document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const itemsContainer = document.getElementById('itemsContainer');

    categorySelect.addEventListener('change', loadStoreItems);

    function loadStoreItems() {
        
        const items = window.storeItems;
        const category = categorySelect.value;
        const filteredItems = items.filter(item => item.category === category || category === "All");

        itemsContainer.innerHTML = '';
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'store-item';
            itemElement.innerHTML = `
                <img src="images/items/${item.image}" alt="${item.name}" class="item-image" onclick="toggleBuyButton(this)">
                <button class="buy-button" onclick="buyItem(${item.id})">Acheter</button>
            `;
            itemsContainer.appendChild(itemElement);
        });
    }

    window.buyItem = function(itemId) {
        const items = window.storeItems;
        const selectedCharacterName = localStorage.getItem('selectedCharacter');
        if (!selectedCharacterName) {
            alert('Aucun personnage sélectionné.');
            return;
        }
        const character = JSON.parse(localStorage.getItem(`characterData-${selectedCharacterName}`));
        const item = items.find(i => i.id === itemId);

        if (character.goldAmount >= item.cost) {
            character.goldAmount = parseInt(character.goldAmount) - item.cost;
            character.items.push(item);
            localStorage.setItem(`characterData-${selectedCharacterName}`, JSON.stringify(character));
            alert(`Vous avez acheté ${item.name} !`);
            const itemElement = document.querySelector(`.store-item img[alt="${item.name}"]`).parentElement;
            itemElement.querySelector('.buy-button').style.display = 'none';
            itemElement.querySelector('.item-image').classList.remove('blurred');
        } else {
            alert('Vous n\'avez pas assez d\'or.');
        }
    }

    window.toggleBuyButton = function(imgElement) {
        const itemElement = imgElement.parentElement;
        const buyButton = itemElement.querySelector('.buy-button');
        if (buyButton.style.display === 'block') {
            buyButton.style.display = 'none';
            imgElement.classList.remove('blurred');
        } else {
            buyButton.style.display = 'block';
            imgElement.classList.add('blurred');
        }
    }

    loadStoreItems();
});
