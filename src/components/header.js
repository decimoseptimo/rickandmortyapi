import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Flex, Box } from "@chakra-ui/react"
import About from "./about"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <Flex align={`center`} justifyContent="center">
      <Box py="4" px="1">
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </Box>
      <Box py="4" px="1">
        <About />
      </Box>
    </Flex>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
