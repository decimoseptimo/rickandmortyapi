import React from "react"
import { Link } from "gatsby-plugin-modal-routing-3"
// import { StaticImage } from "gatsby-plugin-image"
import {
  Heading,
  Center,
  ButtonGroup,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"

import StatusIcon from "../statusIcon"

export default function CharacterView({ data }) {
  const { id, name, image, gender, status, origin, location } = data

  return (
    <>
      <img
        src={image}
        width={`100%`}
        // quality={95}
        // formats={["auto", "webp", "avif"]}
        alt={name}
      />
      <Box p={2}>
        <Heading as="h2" size="sm">
          {name}
        </Heading>
        <Text textTransform="uppercase" fontSize="11px" color="gray">
          <Box margin="0 .3rem 0 .1rem" as="span">
            <StatusIcon status={status} />
          </Box>
          {`${status} ${gender.toLowerCase()} from ${origin.name}`}
        </Text>
        <Text my={2} textAlign={`center`}>
          Last seen: {location.name}
        </Text>
        <Center>
          <ButtonGroup my={2} variant="outline" spacing="2">
            <Link to={`/update/?id=${id}`} asModal>
              <IconButton
                icon={<EditIcon />}
                colorScheme={"blue"}
                aria-label="update character"
                size="sm"
              />
            </Link>
            <Link to={`/delete/?id=${id}`} asModal>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme={"red"}
                aria-label="delete character"
                size="sm"
              />
            </Link>
          </ButtonGroup>
        </Center>
      </Box>
    </>
  )
}