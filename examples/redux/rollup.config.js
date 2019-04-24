// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  // inlineDynamicImports: true,
  input: 'src/main.js', output: {
    esModule: false,
    exports: 'none',
    indent: false,
    preferConst: true,
    compact: true,
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'reduxTraining'
  },
  
  plugins: [babel({
    exclude: 'node_modules/**',
  }), resolve()]
};