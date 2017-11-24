const { FuseBox } = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  package: {
    name: "cycle-cropper",
    main: "src/index.ts"
  },
  globals: {"cycle-cropper": "*"},
  output: 'dist/$name.js',
  target: "browser",
  plugins: []
});

fuse.bundle('index').instructions('> index.ts');
fuse.run();
