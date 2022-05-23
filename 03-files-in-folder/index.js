const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');

const pathFolder = path.join(__dirname, 'secret-folder');
const readFolder = async folder => {
  try {
    const readDir = await readdir(folder, { withFileTypes: true });
    for (const file of readDir) {
      const pathFile = path.join(folder, file.name);
      if (file.isFile()) {
        stat(pathFile, (err, stats) => {
          if (err) console.log(err);
          else {
            const parseFile = path.parse(pathFile);
            console.log(
              `${parseFile.name} - ${parseFile.ext.slice(1)} - ${stats.size}b`,
            );
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

readFolder(pathFolder);
