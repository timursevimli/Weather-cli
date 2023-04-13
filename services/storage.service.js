import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';

const filePath = join(homedir(), '.weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

const deleteData = async () => {
  if (await isExist(filePath)) {
    await promises.unlink(filePath);
    return true;
  } else {
    return false;
  }
};

const saveCityValue = async (city, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[city] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

export {
  saveKeyValue,
  saveCityValue,
  getKeyValue,
  deleteData,
  TOKEN_DICTIONARY
};
