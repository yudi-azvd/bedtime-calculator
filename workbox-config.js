module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{webmanifest,js,png,html,css}'
  ],
  skipWaiting: true,
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ]
};