const suspects = [
  "Lucius Malfoy",
  "Peter Pettigrew",
  "Draco Malfoy",
  "Fenrir Greyback",
  "Bellatrix Lestrange",
  "Snatcher"
];

const items = [
  "Love Potion",
  "Poisoned Mead",
  "Jinxed Broomstick",
  "Stupefy",
  "Incendio",
  "Cursed Necklace"
];

const locations = [
  "Gringotts",
  "12 Grimmauld Place",
  "Ministry of Magic",
  "Malfoy Manor",
  "Shrieking Shack",
  "Hog's Head",
  "Forbidden Forest",
  "Hogwarts",
  "Weasleys' Wizard Wheezes"
];

const states = ["","✅","❌","❓"];

function makeGrid(list, id){
  const el = document.getElementById(id);
  list.forEach(name=>{
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.name = name;
    cell.dataset.state = 0;
    cell.textContent = name;
    cell.onclick = () => {
      let s = parseInt(cell.dataset.state);
      s = (s+1)%states.length;
      cell.dataset.state = s;
      cell.textContent = name + " " + states[s];
      save();
    };
    el.appendChild(cell);
  });
}

function save(){
  const data = {};
  document.querySelectorAll(".cell").forEach(c=>{
    data[c.dataset.name] = c.dataset.state;
  });
  localStorage.setItem("hpcluedo", JSON.stringify(data));
  localStorage.setItem("hpnotes", document.getElementById("notes").value);
}

function load(){
  const saved = JSON.parse(localStorage.getItem("hpcluedo")||"{}");
  document.querySelectorAll(".cell").forEach(c=>{
    const state = saved[c.dataset.name] || 0;
    c.dataset.state = state;
    c.textContent = c.dataset.name + " " + states[state];
  });
  document.getElementById("notes").value = localStorage.getItem("hpnotes")||"";
}

function resetAll(){
  localStorage.removeItem("hpcluedo");
  localStorage.removeItem("hpnotes");
  location.reload();
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

makeGrid(suspects,"suspects");
makeGrid(items,"items");
makeGrid(locations,"locations");
load();
document.getElementById("notes").addEventListener("input",save);
