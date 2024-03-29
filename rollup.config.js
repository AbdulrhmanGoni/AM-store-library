import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dotenv from "rollup-plugin-dotenv"
import image from '@rollup/plugin-image';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import svg from '@svgr/rollup'
import dts from 'rollup-plugin-dts'
import css from 'rollup-plugin-postcss'
import packageJson from './package.json'
import terser from '@rollup/plugin-terser'

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
      image(),
      svg(),
      css({ extract: 'global.css' }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'dist/cjs/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
]