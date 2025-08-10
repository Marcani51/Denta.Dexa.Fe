module.exports = {
  important: true,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2a3593',
        warning: 'FAAB0514',
        success: 'rgba(28, 172, 120, 1)',
        muted: '#999999'
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      }
    },
    plugins: [],
    important: true
  }
}