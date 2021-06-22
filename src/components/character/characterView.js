import React from "react"
import { Link } from "gatsby-plugin-modal-routing-3"
import {
  Heading,
  Center,
  ButtonGroup,
  IconButton,
  Box,
  Text,
  Image,
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"

import StatusIcon from "../ui/statusIcon"

export default function CharacterView({ data }) {
  const { id, name, image, gender, status, origin, location } = data

  // TODO: use StaticImage
  return (
    <Box
      // maxW="sm"
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor="#fff"
    >
      <Image
        src={image}
        fallbackSrc="https://via.placeholder.com/400?text=Not%20found"
        width={`100%`}
        alt={name}
      />
      <Box p={2}>
        <Heading as="h2" size="sm">
          {name}
        </Heading>
        <Text
          textTransform="uppercase"
          fontSize="11px"
          color="gray"
          data-testid="x-from-y"
        >
          <Box margin="0 .3rem 0 .1rem" as="span">
            <StatusIcon status={status} />
          </Box>
          {`${status} ${gender?.toLowerCase()} from ${origin?.name}`}
        </Text>
        <Text my={2} textAlign={`center`} data-testid="last-seen">
          {`Last seen: ${location?.name}`}
        </Text>
        <Center>
          <ButtonGroup my={2} variant="outline" spacing="2" background="#fff">
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
    </Box>
  )
}
