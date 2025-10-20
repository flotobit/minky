const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '10px';
panel.style.right = '10px';
panel.style.backgroundColor = 'rgba(0,0,0,0.8)';
panel.style.color = 'white';
panel.style.padding = '10px';
panel.style.zIndex = '9999';
panel.innerHTML = `
  <input id="bananasInput" type="number" placeholder="Bananas" />
  <button id="addBananasBtn">Add Bananas</button>
  <input id="pumpkinsInput" type="number" placeholder="Pumpkins" />
  <button id="addPumpkinsBtn">Add Pumpkins</button>
`;
document.body.appendChild(panel);

document.getElementById('addBananasBtn').onclick = () => {
  const amt = parseInt(document.getElementById('bananasInput').value);
  if (!isNaN(amt)) {
    window.bananas += amt;
    window.saveAndUpdate && window.saveAndUpdate();
    alert('Added ' + amt + ' bananas');
  }
};

document.getElementById('addPumpkinsBtn').onclick = () => {
  const amt = parseInt(document.getElementById('pumpkinsInput').value);
  if (!isNaN(amt)) {
    window.pumpkins += amt;
    window.saveAndUpdate && window.saveAndUpdate();
    alert('Added ' + amt + ' pumpkins');
  }
};
