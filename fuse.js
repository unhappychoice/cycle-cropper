const { CSSPlugin, FuseBox } = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  package: {
    name: "cycle-cropper",
    main: "index.ts"
  },
  cache: false,
  globals: { "cycle-cropper": "*" },
  output: 'dist/$name.js',
  target: "browser",
  sourceMaps: { project: true, vendor: true },
  plugins: [
    CSSPlugin({
      outFile: (file) => `dist/css/${file.split('/').pop()}`,
      inject: false
    })
  ]
});

fuse.bundle('index').instructions('^!index.ts');
fuse.run();
