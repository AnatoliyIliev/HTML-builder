const path = require('path');
const { readdir, rm, readFile, writeFile } = require('fs/promises');
const { copyFile, mkdir } = require('node:fs/promises');

const builder = async () => {
  const projectDist = path.join(__dirname, 'project-dist');
  const assetsDist = path.join(__dirname, 'assets');
  const templateFile = path.join(__dirname, 'template.html');
  const components = path.join(__dirname, 'components');
  const stylesPath = path.join(__dirname, 'styles');
  const createHtml = path.join(projectDist, 'index.html');
  const newFolder = path.join(projectDist, 'assets');

  // Create folder - project-dist
  await mkdir(projectDist, { recursive: true });

  // Reading and saving in a template file variable
  const readTemplateFile = await fileReading(templateFile);
  let stringHtml = readTemplateFile;

  //Finding all tag names in a template file
  const readDir = await readdir(components, { withFileTypes: true });

  for (const file of readDir) {
    const pathFile = path.join(components, file.name);
    const parseFile = path.parse(pathFile);

    if (parseFile.ext === '.html') {
      const readFileWithComponents = await fileReading(pathFile);

      //Replacing template tags with the contents of component files
      stringHtml = stringHtml.replace(
        new RegExp(`{{${parseFile.name}}}`),
        readFileWithComponents,
      );
    }
  }

  // Writing from template.html to index.html
  await writeFile(createHtml, stringHtml, err => {
    if (err) console.log(err);
  });

  await mergeStyles(stylesPath, projectDist);

  await copyDir(newFolder, assetsDist);
};

builder();

const fileReading = async file => {
  return await readFile(file, 'utf-8', err => {
    if (err) console.log(err);
  });
};

const mergeStyles = async (folder, projectDist) => {
  const stylesPath = path.join(__dirname, 'styles');
  const createBundle = path.join(projectDist, 'style.css');
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

const copyDir = async (newFolder, folder) => {
  try {
    const readDir = await readdir(folder, { withFileTypes: true });

    await mkdir(newFolder, { recursive: true });

    await rm(newFolder, { recursive: true });

    await mkdir(newFolder, { recursive: true });

    for (const file of readDir) {
      if (file.isFile()) {
        const pathFile = path.join(folder, file.name);
        const pathNewFile = path.join(newFolder, file.name);
        await copyFile(pathFile, pathNewFile);
      } else {
        const readNewFolder = path.join(folder, file.name);
        const newProjectDist = path.join(newFolder, file.name);
        copyDir(newProjectDist, readNewFolder);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
