export const environment = {
  production: false,
  application:
  {
    appName: "webnoegest",
    common_name: "NoeGest by Matthania",
    version: "1.1.1",
    year_copyright: "2022",
  },
  apiUrl: 'http://localhost:4000',
  appVersion: require('../../package.json').version + ' - dev -',
  appName: require('../../package.json').common_name,
  appYear: require('../../package.json').year_copyright,
};