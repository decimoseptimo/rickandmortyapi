import React from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export default function CharacterForm({
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
    <form name="characterForm" /* onSubmit={handleSubmit(onSubmit2)} */>
      <VStack spacing={2} align="stretch">
        <FormControl isInvalid={errors.name} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Name"
            defaultValue={name}
            {...register("name", { required: true })}
          />
          <FormErrorMessage>
            {errors.name && <span>This field is required</span>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.image} isRequired>
          <FormLabel htmlFor="image">Image</FormLabel>
          <Input
            id="image"
            placeholder="Image"
            defaultValue={image}
            {...register("image", { required: true })}
          />
          <FormErrorMessage>
            {errors.image && <span>This field is required</span>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.status} isRequired>
          <FormLabel htmlFor="status">Status</FormLabel>
          <Input
            id="status"
            placeholder="Status"
            defaultValue={status}
            {...register("status", { required: true })}
          />
          <FormErrorMessage>
            {errors.status && <span>This field is required</span>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.gender} isRequired>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Input
            id="gender"
            placeholder="Gender"
            defaultValue={gender}
            {...register("gender", { required: true })}
          />
          <FormErrorMessage>
            {errors.gender && <span>This field is required</span>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.origin} isRequired>
          <FormLabel htmlFor="origin">Origin</FormLabel>
          <Input
            id="origin"
            placeholder="Origin"
            defaultValue={originName}
            {...register("origin", { required: true })}
          />
          <FormErrorMessage>
            {errors.origin && <span>This field is required</span>}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.location} isRequired>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            placeholder="Location"
            defaultValue={locationName}
            {...register("location", { required: true })}
          />
          <FormErrorMessage>
            {errors.location && <span>This field is required</span>}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <HStack pt={4} spacing={3} justifyContent="flex-end">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          // type="submit"
          onClick={handleSubmit(onSubmit2)}
          colorScheme="blue"
        >
          Save
        </Button>
      </HStack>
    </form>
  )
}
