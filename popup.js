const applyBtn = document.getElementById('applyBtn');

applyBtn.addEventListener('click', async () => {
  const bananas = parseInt(document.getElementById('bananaInput').value) || 0;
  const pumpkins = parseInt(document.getElementById('pumpkinInput').value) || 0;

  if (bananas <= 0 && pumpkins <= 0) {
    alert("Please enter a positive number of bananas or pumpkins.");
    return;
  }

  // Execute content script to add cheats
  await chrome.scripting.executeScript({
    target: { tabId: (await chrome.tabs.query({active: true, currentWindow: true}))[0].id },
    func: (bananas, pumpkins) => {
      if (typeof window.bananas === 'number' && typeof window.pumpkins === 'number') {
        window.bananas += bananas;
        window.pumpkins += pumpkins;
        if (typeof window.saveAndUpdate === 'function') {
          window.saveAndUpdate();
        }
        alert(`Added ${bananas} bananas and ${pumpkins} pumpkins.`);
      } else {
        alert('Game variables not found on this page.');
      }
    },
    args: [bananas, pumpkins],
  });
});
