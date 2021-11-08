
export const environment = {
  production: false,
  appVersion: require('../../package.json').version + ' - dev -',
  appName: require('../../package.json').common_name,
  appYear: require('../../package.json').year_copyright,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
