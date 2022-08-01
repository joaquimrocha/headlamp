// You need to install wix tool set first
// Reference https://ourcodeworld.com/articles/read/927/how-to-create-a-msi-installer-in-windows-for-an-electron-framework-application
const { MSICreator } = require('electron-wix-msi');
const path = require('path');
const info = require('../../package.json');

const APP_DIR = path.resolve(__dirname, '../../dist/win-unpacked');
const OUT_DIR = path.resolve(__dirname, '../../dist');

const nameOptions = {
  productName: info.productName,
  version: info.version,
  os: 'win',
  arch: 'x86',
};

// Generate the exe name from electron-builder's artifactName
let exeName = info.build.artifactName.split('.')[0];
Object.entries(nameOptions).forEach(([key, value]) => {
  exeName = exeName.replace(`\${${key}}`, value);
});

const msiOptions = {
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,
  description: info.description,
  exe: exeName,
  name: nameOptions.productName,
  manufacturer: info.author.name,
  version: process.env.npm_package_version,
  appIconPath: path.resolve(__dirname, '../../build/icons/icon.ico'),
  ui: {
    chooseDirectory: true,
  },
};

console.info('Generating MSI with the following options:', msiOptions);

const msiCreator = new MSICreator(msiOptions);

msiCreator.create().then(function () {
  msiCreator.compile();
});
