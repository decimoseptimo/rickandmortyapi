import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Center, Flex, Spacer, Box, IconButton } from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <Center>
      <Flex align={`center`}>
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
          <IconButton
            color={`white`}
            rightIcon={<InfoIcon />}
            // colorScheme={"green"}
            position="relative"
            top="-2px"
            isRound={true}
            aria-label="About"
            size="xs"
            variant="link"
          />
        </Box>
      </Flex>
    </Center>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
