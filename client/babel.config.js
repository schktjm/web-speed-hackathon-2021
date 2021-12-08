const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs',
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: isDev,
      },
    ],
  ],
};
