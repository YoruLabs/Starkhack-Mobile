const alias = {
  '@api': './src/api',
  '@assets': './src/assets',
  '@components': './src/components',
  '@config': './src/config',
  '@hooks': './src/hooks',
  '@navigation': './src/navigation',
  '@screens': './src/screens',
  '@state': './src/state',
  '@utils': './src/utils',
  '@services': './src/services',
  'types': './src/types',
}

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: alias,
        },
      ],
    ],
  };
};
