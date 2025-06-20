import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    fontSize: {
      xs: [
        "var(--font-size-xs)",
        {
          lineHeight: "var(--line-height-xs)",
          letterSpacing: "var(--letter-spacing-xs)",
        },
      ],
      sm: [
        "var(--font-size-sm)",
        {
          lineHeight: "var(--line-height-sm)",
          letterSpacing: "var(--letter-spacing-sm)",
        },
      ],
      md: [
        "var(--font-size-md)",
        {
          lineHeight: "var(--line-height-md)",
          letterSpacing: "var(--letter-spacing-md)",
        },
      ],
      base: [
        "var(--font-size-base)",
        {
          lineHeight: "var(--line-height-base)",
          letterSpacing: "var(--letter-spacing-base)",
        },
      ],
      lg: [
        "var(--font-size-lg)",
        {
          lineHeight: "var(--line-height-lg)",
          letterSpacing: "var(--letter-spacing-lg)",
        },
      ],
      xl: [
        "var(--font-size-xl)",
        {
          lineHeight: "var(--line-height-xl)",
          letterSpacing: "var(--letter-spacing-xl)",
        },
      ],
      "2xl": [
        "var(--font-size-2xl)",
        {
          lineHeight: "var(--line-height-2xl)",
          letterSpacing: "var(--letter-spacing-2xl)",
        },
      ],
      "3xl": [
        "var(--font-size-3xl)",
        {
          lineHeight: "var(--line-height-3xl)",
          letterSpacing: "var(--letter-spacing-3xl)",
        },
      ],
      "4xl": [
        "var(--font-size-4xl)",
        {
          lineHeight: "var(--line-height-4xl)",
          letterSpacing: "var(--letter-spacing-4xl)",
        },
      ],
      "5xl": [
        "var(--font-size-5xl)",
        {
          lineHeight: "var(--line-height-5xl)",
          letterSpacing: "var(--letter-spacing-5xl)",
        },
      ],
    },
    colors: {
      white: "var(--white)",
      dark: {
        DEFAULT: "rgb(var(--dark-primary-rgb) / <alpha-value>)",
        black: "var(--dark-black)",
        primary: "var(--dark-primary)",
        secondary: "var(--dark-secondary)",
        tertiary: "var(--dark-tertiary)",
        disabled: "var(--dark-disabled)",
        background: "var(--dark-background)",
      },
      light: {
        DEFAULT: "rgb(var(--light-primary-rgb) / <alpha-value>)",
        white: "var(--light-white)",
        primary: "var(--light-primary)",
        secondary: "var(--light-secondary)",
        tertiary: "var(--light-tertiary)",
        disabled: "var(--light-disabled)",
        background: "var(--light-background)",
      },
      accent: {
        DEFAULT: "rgb(var(--accent-primary-rgb) / <alpha-value>)",
        primary: "var(--accent-primary)",
        hover: "var(--accent-hover)",
        pressed: "var(--accent-pressed)",
        opacity_0: {
          1: "var(--accent-opacity-0-1)",
          15: "var(--accent-opacity-0-15)",
          20: "var(--accent-opacity-0-20)",
        },
      },
      special: {
        info: "var(--special-info)",
        success: "var(--special-success)",
        warning: "var(--special-warning)",
        danger: "var(--special-danger)",
      },
      aplazo: {
        deportes: "var(--aplazo-deportes)",
        hogar: "var(--aplazo-hogar)",
        tech: "var(--aplazo-tech)",
        moda: "var(--aplazo-moda)",
        food: "var(--aplazo-food)",
        fav: "var(--aplazo-fav)",
        pres: "var(--aplazo-pres)",
        peso: "var(--aplazo-peso)",
        detono: "var(--aplazo-detono)",
        aplazo: "var(--aplazo-aplazo)",
        bg: "var(--aplazo-bg)",
      },
      alert: {
        default: {
          icon: "var(--alert-default-icon)",
          background: "var(--alert-default-background)",
          stroke: "var(--alert-default-stroke)",
        },
        critical: {
          icon: "var(--alert-critical-icon)",
          background: "var(--alert-critical-background)",
          stroke: "var(--alert-critical-stroke)",
        },
        information: {
          icon: "var(--alert-information-icon)",
          background: "var(--alert-information-background)",
          stroke: "var(--alert-information-stroke)",
        },
        warning: {
          icon: "var(--alert-warning-icon)",
          background: "var(--alert-warning-background)",
          stroke: "var(--alert-warning-stroke)",
        },
        succes: {
          icon: "var(--alert-succes-icon)",
          background: "var(--alert-succes-background)",
          stroke: "var(--alert-succes-stroke)",
        },
      },
      ordenes: {
        pagado: "var(--ordenes-pagado)",
        pendienteDePago: "var(--ordenes-pendiente-de-pago)",
        vencido: "var(--ordenes-vencido)",
        cancelado: "var(--ordenes-cancelado)",
        devolucionEjecutada: "var(--ordenes-devolucion-ejecutada)",
      },
      accesdirect: {
        blueColor: "var(--accesdirect-blue-color)",
      },
      transparent: "transparent",
      current: "currentColor",
    },
    screens: {
      xs: "375px",
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      "2xl": "1320px",
      "3xl": "1440px",
      "4xl": "1680px",
      "5xl": "1920px",
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-families-manrope)", ...fontFamily.sans],
        spirit: ["var(--font-families-spirit)", ...fontFamily.sans],
      },
      gridTemplateColumns: {
        "auto-fit-xs-1": "repeat(auto-fit, minmax(375px, 1fr))",
        "auto-fill-xs-1": "repeat(auto-fill, minmax(375px, 1fr))",
      },
      keyframes: {
        autofillStart: {
          "0%": {
            /*!*/
          },
          "100%": {
            background: "transparent",
          },
        },
        autofillCancel: {
          "0%": {
            /*!*/
          },
          "100%": {
            background: "transparent",
          },
        },
        growth: {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        growthY: {
          "0%": {
            transform: "scaleY(0)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        pulse: {
          "0%": {
            transform: "scale(0.97)",
            "box-shadow": "0 0 0 0 rgba(0, 0, 0, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            "box-shadow": "0 0 0 10px rgba(0, 0, 0, 0)",
          },
          "100%": {
            transform: "scale(0.97)",
            "box-shadow": "0 0 0 0 rgba(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        autofillStart: "autofillStart 0s 1ms",
        autofillCancel: "autofillCancel 0s 1ms",
        growth: "growth 100ms ease-in-out 1",
        growthY: "growthY 150ms ease-in-out 1",
        appearDisappear: "appearDisappear 20s ease-in-out infinite",
        bounceOnce: "bounceOnce 200ms ease-in-out 1",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
      transitionProperty: {
        autofill: "background-color",
      },
      backgroundImage: {
        dropdownArrow:
          "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
      },
    },
  },
};
