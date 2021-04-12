import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  UnorderedList,
  ListItem,
  Text,
  HStack,
} from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"

export default function About() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        color={`white`}
        rightIcon={<InfoIcon />}
        position="relative"
        top="-2px"
        isRound={true}
        aria-label="About"
        size="xs"
        variant="link"
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        returnFocusOnClose={false}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent top={6}>
          <ModalHeader pt={4} px={6} pb={1}>
            About
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            Created with:
            <UnorderedList>
              <HStack spacing={8}>
                <ListItem mb={0}>Gatsby v3</ListItem>
                <ListItem>Chackra-UI</ListItem>
              </HStack>
            </UnorderedList>
            <Text mt={3} color={`gray`} fontSize={`sm`}>
              data pulled from rickandmortyapi.com
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
