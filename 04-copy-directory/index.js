const path = require('path');
const { readdir, rm } = require('fs/promises');
const { copyFile, mkdir } = require('node:fs/promises');

const currentFolder = path.join(__dirname, 'files');

const copyDir = async folder => {
  const newFolder = path.join(__dirname, 'file-copy');
  try {
    const readDir = await readdir(folder, { withFileTypes: true });

    await mkdir(newFolder, { recursive: true });

    await rm(newFolder, { recursive: true });

    await mkdir(newFolder, { recursive: true });

    for (const file of readDir) {
      const pathFile = path.join(folder, file.name);
      const pathNewFile = path.join(newFolder, file.name);
      await copyFile(pathFile, pathNewFile);
    }
  } catch (err) {
    console.log(err);
  }
};

copyDir(currentFolder);
