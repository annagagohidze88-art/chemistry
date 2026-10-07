import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
    const data = await res.json();
    console.log('Fetched elements count:', data.elements.length);
    const map = {};
    for (const el of data.elements) {
      if (el.image) {
        map[el.number] = {
          title: el.image.title,
          url: el.image.url,
          attribution: el.image.attribution
        };
      }
    }
    console.log('Sample image 1 (H):', map[1]);
    console.log('Sample image 26 (Fe):', map[26]);
    console.log('Sample image 79 (Au):', map[79]);
    fs.writeFileSync('scripts/element_images.json', JSON.stringify(map, null, 2));
    console.log('Successfully saved scripts/element_images.json with', Object.keys(map).length, 'images!');
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

main();
