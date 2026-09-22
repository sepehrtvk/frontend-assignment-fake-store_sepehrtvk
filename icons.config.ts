import svgLoader from 'vite-svg-loader'

export const iconLoader = () =>
  svgLoader({
    svgoConfig: {
      plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
    },
  })
