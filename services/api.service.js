import https from 'https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {

	const weatherIcons = {
		'01': '☀️',
		'02': '🌤️',
		'03': '☁️',
		'04': '🌧️',
		'09': '🌧️',
		'10': '🌦️',
		'11': '🌩️',
		'13': '❄️',
		'50': '🌫️'
	}

	return weatherIcons[icon.slice(0,-1)]
};

const getWeather = async (city) => {

	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Not found api key, create api key with "-t [API_KEY]" command')
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'en',
			units: 'metric'
		}
	});
	return data;
}

export { getWeather, getIcon };