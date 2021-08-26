import { extendTheme, withDefaultColorScheme, withDefaultProps } from "@chakra-ui/react"
// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,


}

const theme = extendTheme(
  withDefaultProps({

    defaultProps: {
      size: "sm",
      // colorScheme: "brand",
      color: "#fff",

    },
    components: ["Button", "TextArea", "Select"],
  }),
  {
    shadows: {
      outline: "0 0 0 3px #222222"
    },
    config,
    components: {
      Input: {
        sizes: {
          sm: {
            field: {
              borderRadius: 'md'
            },
            addon: {
              borderRadius: 'md'
            }
          },
          baseStyle: {

          }
        }
      },
      Button: {
        baseStyle: {
          color: "#fff",
        
        }
      },
      Skeleton: {
        baseStyle: {
          bg: (props) => props.colors.gray[600]
        }
      },

    },
    colors: {
      brand: {
       100:'#FD5750',
       200:'#FD5750',
       300:'#FD5750',
       400:'#FD5750',
       500:'#FD5750',
       600:'#FD5750',
       700:'#FD5750',
       800:'#FD5750',
       900:'#FD5750'
      },
      gray: {
        700: "#141414",
        600: '#1d1d1d'
      }
    },

    styles: {
      global: (props) => ({
        "body": {

          fontFamily: "body",
          // color: "#fff",
          bg: '#141414',
          // lineHeight: "base"
        },
        // button: {
        //   color: '#fff'
        // }

      })
    },

  }
  // ,withDefaultColorScheme({ colorScheme: "brand" })

)
export default theme