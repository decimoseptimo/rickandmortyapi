import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Flex, Box, Button } from "@chakra-ui/react"
import About from "./about"

import { getRandomInt } from "../utils"

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
      <Button
        colorScheme="teal"
        size="xs"
        variant="link"
        css={{
          position: "absolute",
          right: "1rem",
          color: "#471c71",
          textTransform: "uppercase",
        }}
        onClick={() => console.log(getRandomInt(0, 9))}
      >
        Reload
      </Button>
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
