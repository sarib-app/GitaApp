module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: [
    //   ['module:react-native-google-mobile-ads', {
    //     android_app_id: 'ca-app-pub-6119482859365304~4838938646',
    //     ios_app_id: 'ca-app-pub-6119482859365304~4075880684',
    //   }],
    // ],
  };
};
