const suspects = [
  "Harry Potter","Hermione Granger","Ron Weasley","Draco Malfoy",
  "Ginny Weasley","Luna Lovegood","Neville Longbottom","Bellatrix Lestrange"
];
const weapons = [
  "Wand","Cursed Necklace","Poisoned Chalice","Vanishing Cabinet",
  "Dark Spell","Flying Broomstick","Dagger","Time-Turner"
];
const rooms = [
  "Great Hall","Gryffindor Common Room","Slytherin Dungeon","Library",
  "Potions Classroom","Forbidden Forest","Owlery","Room of Requirement","Hagrid’s Hut"
];

const states = ["","✅","❌","❓"];

function makeGrid(list, id){
  const el = document.getElementById(id);
  list.forEach((name,i)=>{
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
  document.body.style.background =
    document.body.style.background === "black" ? "#f5f2e7" : "black";
  document.body.style.color =
    document.body.style.color === "white" ? "#222" : "white";
}

makeGrid(suspects,"suspects");
makeGrid(weapons,"weapons");
makeGrid(rooms,"rooms");
load();
document.getElementById("notes").addEventListener("input",save);
