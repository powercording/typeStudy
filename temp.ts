interface Axis {
  x: number;
  y: number;
  z: number;
}

// interface Axis {
//   [key: string]: number;
// }

const axis: Axis = {
  x: 1,
  y: 2,
  z: 3,
};

for (const index of Object.keys(axis)) {
  console.log(axis[index]);
}
