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
import PropTypes from "prop-types"

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
      backgroundColor="#efefef"
      textAlign="center"
      data-testid="characterCard"
    >
      <Image
        src={image}
        fallbackSrc="https://via.placeholder.com/400?text=Not%20found"
        width={`100%`}
        alt={name}
      />
      <Box p={2}>
        <Heading as="h2" size="sm" marginTop="var(--chakra-space-2)">
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
          {`${status} ${gender} from ${origin?.name}`}
        </Text>
        <Text
          my={2}
          textAlign="center"
          fontStyle="italic"
          data-testid="last-seen"
        >
          {`Last seen: ${location?.name}`}
        </Text>
        <Center>
          <ButtonGroup my={2} variant="outline" spacing="2">
            <Link to={`/update/?id=${id}`} asModal>
              <IconButton
                icon={<EditIcon />}
                colorScheme={"blue"}
                aria-label="update character"
                size="sm"
                borderRadius="var(--chakra-radii-md)"
              />
            </Link>
            <Link to={`/delete/?id=${id}`} asModal>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme={"red"}
                aria-label="delete character"
                size="sm"
                borderRadius="var(--chakra-radii-md)"
              />
            </Link>
          </ButtonGroup>
        </Center>
      </Box>
    </Box>
  )
}

CharacterView.propTypes = {
  data: PropTypes.object.isRequired,
}
