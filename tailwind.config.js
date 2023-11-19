/** @type {import('tailwindcss').Config} */
module.exports = {
  
    content: [
      "./src/**/*.{html,js}",
      "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js",
      "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],

  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '20px',
    },    
    screens: {
      'sm': '100px',
      // => @media (min-width: 576px) { ... }

      'md': '200px',
      // => @media (min-width: 960px) { ... }

      'lg': '1680px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      spacing: {
        '8.6m': '8.6rem',
        '0.5m': '0.5rem',
      },
      width: {
        'w-87%': '87%',
      },
      backgroundColor: {
        'primary': '#E5E9E2', // Custom primary background color
        'button-dark': '#2C2C2C', // Custom secondary background color
        'input-field': '#D9D9D9', // Custom secondary background color
        'sidebar': '#2C2C2C',
        'selectsidebar': '#404040',
        'navbar': '#D9D9D9',
        'CharlestonGreenColor': '#2C2C2C', 
        'LightSilverColor': '#D9D9D9',
        'PlatinumColor': '#E5E9E2',
        'TerraCotta' : '#E26D5C' ,
        'PlatinumColorCalendar' : '#DADED7',       
      },    
      borderColor: {
        'TerraCotta' : '#E26D5C',     
      },
      colors: {
        'PlatinumColorText': '#E5E9E2', 
        'CharlestonGreenText': '#2C2C2C',  
        'TerraCotta' : '#E26D5C' ,

      },
        // fontFamily: {
        //   'Opensans': ['Open Sans', sans-serif],
        // },

        
    },
    fontFamily:{
      poppins: ["Poppins", "sans-serif"],
    }


    
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('flowbite/plugin')
  ],
}
