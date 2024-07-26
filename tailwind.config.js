/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./docs/**/*.{js,ts,jsx,tsx,vue,md,html}",
  ],
  theme: {
    extend: {
      // reference —— `` 自定义样式
      colors: {
        'reference': 'var(--vp-code-color)',
      },
      borderRadius: {
        'reference': '4px',
      },
      padding: {
        'reference': '3px 6px',
      },
      backgroundColor: {
        'reference': 'var(--vp-code-bg)',
      },
      fontSize: {
        'reference': 'var(--vp-code-font-size)',
      }
    },
  },
  plugins: [],
}

