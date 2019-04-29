// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';


import fs from 'fs';

function getModuleExports (moduleId) {
  if (!/^(default|__)/.test(fs.readFileSync(require.resolve(moduleId)).toString())) {
    return  Object.keys(require(moduleId))
  } 
  return []
}

export default {
  input: 'src/app.js', 
  output: {
    esModule: false,
    exports: 'none',
    indent: false,
    preferConst: true,
    compact: true,
    file: 'dist/bundle.js',
    format: 'iife',
    sourceMap: false
  },
  plugins: [
    babel({
      exclude: ['./node_modules/**'],
      plugins: ['@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-object-rest-spread', {'useBuiltIns': true}],
      ],
      presets: ['@babel/preset-react'],
    }), 
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js'],
      preferBuiltIns: false
    }),
    cjs({
      include: './node_modules/**',
      sourceMap: false,
      namedExports: ['react', 'react-is', 'react-dom'].reduce((result, id) => {
        result[id] = getModuleExports(id);
        return result;
      }, {})
    }),
  ]
};