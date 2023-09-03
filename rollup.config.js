import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dotenv from "rollup-plugin-dotenv"
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
// import terser from '@rollup/plugin-terser'

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      dotenv.default(),
      typescript(),
      peerDepsExternal(),
      resolve(),
      importMetaAssets({ warnOnError: true }),
      commonjs(),
      // terser(),
    ],
  },
  {
    input: 'dist/cjs/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()]
  },
]