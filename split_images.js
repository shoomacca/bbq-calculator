const sharp = require('sharp');

async function splitGrid() {
  const imagePath = './public/images/grid.jpg';
  const meta = await sharp(imagePath).metadata();
  
  const w = Math.floor(meta.width / 4);
  const h = Math.floor(meta.height / 2);

  const files = [
    'ribs', 'pulled-pork', 'sausage', 'chicken',
    'corn', 'asparagus', 'peppers', 'mushrooms'
  ];

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const idx = row * 4 + col;
      await sharp(imagePath)
        .extract({ left: col * w, top: row * h, width: w, height: h })
        .toFile(`./public/images/${files[idx]}.jpg`);
      console.log(`Saved ${files[idx]}.jpg`);
    }
  }
}

splitGrid().catch(console.error);
