class FabricPart {
  constructor(id, measures) {
    this.id = id.trim();
    this.startLeft = parseInt(measures.startLeft);
    this.startTop = parseInt(measures.startTop);
    this.width =  parseInt(measures.width);
    this.height = parseInt(measures.height);

    this.points = this.calculatePoints();
  }

  calculatePoints() {
    const startLeft = 1 + this.startLeft; 
    const endLeft = startLeft + this.width - 1; 

    const startTop = 1 + this.startTop; 
    const endTop = startTop + this.height - 1;
    const points = [];

    for(let width = startLeft; width <= endLeft; width++) {
      for(let height = startTop; height <= endTop; height++) {
        const point = width.toString() + "x" + height.toString();
        points.push(point);
      }
    }

    return points;
  }
}

class FabricGrid {
  constructor(parts = []) {
    this.width = 1000;
    this.height = 1000;
    this.parts = parts;
    this.used = this.calculateUsage();
    this.overlapping = this.getOverlapping();
  }

  calculateUsage() {
    const used = {};

    this.parts.forEach(part => {
      part.points.forEach(point => {
        used[point] = (used[point] || 0) + 1;
      })
    }) 
    return used;
  }

  getOverlapping() {
    const points = Object.keys(this.used);
    const overlapping = [];

    points.forEach(point => {
      if(this.used[point] > 1) {
        overlapping.push(point);
      }
    });

    return overlapping;
  }

  getNoneOnverlapping() {

  }

  saveToFile(file) {
    const fs = require('fs');
    fs.writeFileSync(file, this.used.slice().sort());
  }
}

module.exports = function(part, input) {
  const lines = input.split('\n');
  const fabricParts = lines.map(line => {
    line = line.split('@');
    return new FabricPart(line[0], {
        startLeft: line[1].split(':')[0].split(',')[0],
        startTop: line[1].split(':')[0].split(',')[1],
        width: line[1].split(':')[1].split('x')[0],
        height: line[1].split(':')[1].split('x')[1],
      }
    );
  });

  const fabricGrid = new FabricGrid(fabricParts);

  if(part === 1) {
    console.log(fabricGrid.overlapping.length);
  } 
  else {
    fabricGrid.parts.forEach(part => {
      let isFree = true;
      for(point of part.points) {
        if(!isFree) continue;
        isFree = !fabricGrid.overlapping.includes(point)
        // console.log(fabricGrid.overlapping.includes(point));
      }

      if(isFree) {
        console.log(part.id);
        return;
      }
    })
  }
}