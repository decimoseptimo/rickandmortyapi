import React from "react"
// import { StaticImage } from "gatsby-plugin-image"
import {
  Heading,
  Center,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"

import StatusIcon from "./statusIcon"

export default function Character({ data }) {
  const { name, image, gender, status, origin, location } = data

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
        {/* <h2>{name}</h2> */}
        <Heading as="h2" size="sm">
          {name}
        </Heading>
        <Text fontSize={`xs`}>
          <StatusIcon status={status} /> {status} {gender.toLowerCase()} from{" "}
          {origin.name}
        </Text>
        <Text my={2} textAlign={`center`}>
          Last seen: {location.name}
        </Text>
        <Center>
          <ButtonGroup my={2} variant="outline" spacing="2">
            <Button
              rightIcon={<EditIcon />}
              colorScheme={"blue"}
              aria-label="Edit character"
              size="sm"
            >
              Edit
            </Button>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme={"red"}
              aria-label="delete character"
              size="sm"
            />
          </ButtonGroup>
        </Center>
      </Box>
    </>
  )
}
