const path = require('path');
const { readdir, readFile, writeFile } = require('fs/promises');

const stylesPath = path.join(__dirname, 'styles');

const mergeStyles = async folder => {
  const createBundle = path.join(__dirname, 'project-dist', 'bundle.css');
  const readFolderStyles = await readdir(folder, { withFileTypes: true });
  let allStyles = [];

  for (const file of readFolderStyles) {
    const pathFile = path.join(stylesPath, file.name);
    const parseFile = path.parse(pathFile);

    if (parseFile.ext === '.css') {
      const read = await readFile(pathFile, 'utf-8', err => {
        if (err) console.log(err);
      });
      allStyles.push(read);
    }
  }
  await writeFile(createBundle, allStyles, err => {
    if (err) console.log(err);
  });
};

mergeStyles(stylesPath);
