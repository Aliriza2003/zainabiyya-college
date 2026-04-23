const https = require('https');
const fs = require('fs');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  try {
    await download('https://cdn.tailwindcss.com', 'tailwindcss.js');
    await download('https://unpkg.com/dexie/dist/dexie.js', 'dexie.js');
    await download('https://cdn.jsdelivr.net/npm/chart.js', 'chart.js');
    console.log('Done downloading dependencies.');
  } catch (err) {
    console.error(err);
  }
}

main();
