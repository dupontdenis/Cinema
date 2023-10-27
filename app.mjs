const seance = [
  { place: 86, tarif: "reduit" },
  { place: 85, tarif: "plein" },
  { place: 1, tarif: "reduit" },
  { place: 12, tarif: "enfant" },
  { place: 23, tarif: "reduit" },
  { place: 6, tarif: "plein" },
];

const reduits = seance.filter(({ tarif }) => tarif == "reduit");
console.log(reduits);

const tarifs = seance.reduce((a, { tarif }) => {
  if (!a[tarif]) a[tarif] = 0;
  a[tarif] += 1;
  return a;
}, {});

for (let [tarif, nb] of Object.entries(tarifs)) {
  document
    .querySelector("h1")
    .insertAdjacentHTML(
      "afterend",
      `<p> ${tarif}: ${nb} ${nb > 1 ? "places" : "place"}</p>`
    );
}

const nums = seance.reduce((a, entry) => {
  if (!a[entry.cohorte]) a[entry.cohorte] = 0;
  a[entry.cohorte] += 1;
  entry.num = a[entry.cohorte];
  return a;
}, {});

console.log(seance);

const RANG = 10,
  COL = 10;

function transform(tab) {
  let fx = function ({ place }) {
    const lig = Math.ceil(place / RANG),
      col = place % COL;

    return {
      lig,
      col,
    };
  };

  return tab.map(fx);
}

const plan = transform(seance);
console.log(plan);

const map = new Map([
  [1, "A"],
  [2, "B"],
  [3, "C"],
  [4, "D"],
  [5, "E"],
  [6, "F"],
  [7, "G"],
  [8, "H"],
  [9, "I"],
  [10, "J"],
]);

const places = plan.reduce(
  (acc, item) =>
    acc +
    `<li style="grid-column:${item.col}; grid-row:${item.lig}">${map.get(
      item.lig
    )}${item.col}</li>`,
  ""
);

console.log(plan);

const view = document.querySelector("ul");

view.insertAdjacentHTML("afterbegin", places);
