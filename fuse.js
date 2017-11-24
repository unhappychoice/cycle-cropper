const { CSSPlugin, FuseBox } = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  package: {
    name: "cycle-cropper",
    main: "src/index.ts"
  },
  globals: {"cycle-cropper": "*"},
  output: 'dist/$name.js',
  target: "browser",
  sourceMaps: { project: true, vendor: false },
  plugins: [
    CSSPlugin({
      outFile: (file) => `dist/css/${file.split('/').pop()}`,
      inject: false
    })
  ]
});

fuse.bundle('index').instructions('> index.ts');
fuse.run();
