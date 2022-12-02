#! /usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import {
	saveKeyValue,
	saveCityValue,
	TOKEN_DICTIONARY,
	getKeyValue,
	deleteData,
} from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

async function saveToken(token) {
	if (!token.length) {
		printError('Token not entered');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token Successfuly Saved');
	} catch (e) {
		printError(e.message);
	}
}

async function saveCity(city) {
	if (!city.length) {
		printError('City not entered');
		return;
	}
	try {
		await saveCityValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City Successfuly Saved');
	} catch (e) {
		printError(e.message);
	}
}

async function getForcast() {
	try {
		const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('City is not found');
		} else if (e?.response?.status == 401) {
			printError('Token is not true');
		} else {
			printError(e.message);
		}
	}
}

async function deleteJsonData() {
	if (await deleteData()) {
		return printSuccess('JSON data deleted');
	}
	printError('JSON data not found');
}

async function initCLI() {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.s && args.t) {
		await saveCity(args.s);
		await saveToken(args.t);
		return;
	}

	if (args.s) {
		return await saveCity(args.s);
	}

	if (args.t) {
		return await saveToken(args.t);
	}

	if (args.c) {
		return await deleteJsonData();
	}

	return getForcast();
}

initCLI();
