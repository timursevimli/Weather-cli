import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (success) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + success);
};

const printHelp = () => {
  const helpParameters = `
    -h For get help window
    -s [CITY] for configure city
    -t [API_KEY] for save your api_key
    -c Clear weather-data.json file
  `;

  console.log(dedent(`
    ${chalk.bgCyan(' HELP ')}
    ${helpParameters}    
  `));
};

const printWeather = async (data, icon) => {
  console.log(dedent(`
    ${chalk.bgCyan(' WEATHER ')}

    ${chalk.magenta('Forecast Details For ' + chalk.bgCyan(data.name))}
    ${chalk.magenta('Forecast: ' + data.weather[0].main + ' ' + icon)}
    ${chalk.magenta(
      'Temperature: ' + data.main.temp +
      ' ( Min: ' + data.main.temp_min +
      ' | Max: ' + data.main.temp_max +
      ' | Feels like: ' + data.main.feels_like +
      ' )'
    )}
    ${chalk.magenta(
      'Humidity: ' + data.main.humidity +
      ' | Wind Speed: ' + data.wind.speed
    )}
  `));
};

export {
  printSuccess,
  printError,
  printHelp,
  printWeather
};
