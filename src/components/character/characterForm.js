import React from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import { InvalidCharacterAlert } from "./alerts/invalidCharacterAlert"

export default function CharacterForm({
  title,
  error=false,
  data = null,
  onSubmit,
  onClose,
}) {
  const { id, name, image, status, gender, origin, location } = data || {}
  const { name: originName } = origin || {}
  const { name: locationName } = location || {}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit2 = formData => {
    onSubmit({ id, ...formData })
    onClose()
  }

  return (
    <Box>
      <Heading size="md" pb={2}>
        {title}
      </Heading>
      {error ? (
        <InvalidCharacterAlert />
      ) : (
        <FormControl id="CharacterForm" isRequired spacing={4}>
          <form onSubmit={handleSubmit(onSubmit2)}>
            <VStack spacing={2} align="stretch">
              <Box>
                <FormLabel>Name</FormLabel>
                <Input
                  id="Name"
                  placeholder="Name"
                  defaultValue={name}
                  {...register("name", { required: true })}
                />
                {errors.name && <span>This field is required</span>}
              </Box>
              <Box>
                <FormLabel>Image</FormLabel>
                <Input
                  id="Image"
                  placeholder="Image"
                  defaultValue={image}
                  {...register("image", { required: true })}
                />
                {errors.image && <span>This field is required</span>}
              </Box>
              <Box>
                <FormLabel>Status</FormLabel>
                <Input
                  id="Status"
                  placeholder="Status"
                  defaultValue={status}
                  {...register("status", { required: true })}
                />
                {errors.status && <span>This field is required</span>}
              </Box>
              <Box>
                <FormLabel>Gender</FormLabel>
                <Input
                  id="Gender"
                  placeholder="Gender"
                  defaultValue={gender}
                  {...register("gender", { required: true })}
                />
                {errors.gender && <span>This field is required</span>}
              </Box>
              <Box>
                <FormLabel>Origin</FormLabel>
                <Input
                  id="Origin"
                  placeholder="Origin"
                  defaultValue={originName}
                  {...register("origin", { required: true })}
                />
                {errors.origin && <span>This field is required</span>}
              </Box>
              <Box>
                <FormLabel>Location</FormLabel>
                <Input
                  id="Location"
                  placeholder="Location"
                  defaultValue={locationName}
                  {...register("location", { required: true })}
                />
                {errors.location && <span>This field is required</span>}
              </Box>
            </VStack>
            <HStack pt={4} spacing={3} justifyContent="flex-end">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </HStack>
          </form>
        </FormControl>
      )}
    </Box>
  )
}
