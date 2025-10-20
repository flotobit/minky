document.getElementById('applyBtn').addEventListener('click', async () => {
  const bananasToAdd = parseInt(document.getElementById('bananaInput').value) || 0;
  const pumpkinsToAdd = parseInt(document.getElementById('pumpkinInput').value) || 0;

  if (bananasToAdd <= 0 && pumpkinsToAdd <= 0) {
    alert('Please enter a positive number for bananas or pumpkins.');
    return;
  }

  const cheatCode = `
    (function() {
      if (typeof bananas === 'number') bananas += ${bananasToAdd};
      if (typeof pumpkins === 'number') pumpkins += ${pumpkinsToAdd};
      if (typeof bananasPerClick === 'number') bananasPerClick += ${bananasToAdd};
      if (typeof pumpkinsPerClick === 'number') pumpkinsPerClick += ${pumpkinsToAdd};
      if (typeof saveAndUpdate === 'function') saveAndUpdate();
      alert('Added ${bananasToAdd} bananas and ${pumpkinsToAdd} pumpkins!');
    })();
  `;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (code) => {
      const script = document.createElement('script');
      script.textContent = code;
      (document.head || document.documentElement).appendChild(script);
      script.remove();
    },
    args: [cheatCode],
  });
});
