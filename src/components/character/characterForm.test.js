import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import CharacterForm from "./characterForm"

it("renders correctly", () => {
  render(<CharacterForm onSubmit={_ => {}} onClose={_ => {}} />)

  // form fields (label/input)
  // name
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument()
  // image
  expect(screen.getByLabelText(/image/i)).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: /image/i })).toBeInTheDocument()
  // status
  expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: /status/i })).toBeInTheDocument()
  // gender
  expect(screen.getByLabelText(/gender/i)).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: /gender/i })).toBeInTheDocument()
  // origin
  expect(screen.getByLabelText(/origin/i)).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: /origin/i })).toBeInTheDocument()
  // location
  expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: /location/i })).toBeInTheDocument()

  // submit/cancel buttons
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
})

it("runs callback on cancel", () => {
  const cb = jest.fn()
  render(<CharacterForm onSubmit={_ => {}} onClose={cb} />)

  // click cancel
  fireEvent.click(screen.getByRole("button", { name: /cancel/i }))
  expect(cb).toHaveBeenCalled()
})

it("runs callback on submit with filled fields", async () => {
  const cb = jest.fn()
  render(<CharacterForm onSubmit={cb} onClose={_ => {}} />)

  // fill all fields
  fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
    target: { value: " " },
  })
  fireEvent.change(screen.getByRole("textbox", { name: /image/i }), {
    target: { value: " " },
  })
  fireEvent.change(screen.getByRole("textbox", { name: /status/i }), {
    target: { value: " " },
  })
  fireEvent.change(screen.getByRole("textbox", { name: /gender/i }), {
    target: { value: " " },
  })
  fireEvent.change(screen.getByRole("textbox", { name: /origin/i }), {
    target: { value: " " },
  })
  fireEvent.change(screen.getByRole("textbox", { name: /location/i }), {
    target: { value: " " },
  })

  // click submit
  fireEvent.click(screen.getByRole("button", { name: /save/i }))
  // "We are using waitFor and find* method to detect submission feedback because handleSubmit method is executed asynchronously."
  // https://react-hook-form.com/advanced-usage/#TestingForm
  await waitFor(() => expect(cb).toHaveBeenCalled())
})

it("renders error messages on submit with empty fields", async () => {
  const cb = jest.fn()
  render(<CharacterForm onSubmit={cb} onClose={_ => {}} />)

  // click submit
  fireEvent.click(screen.getByRole("button", { name: /save/i }))
  expect(await screen.findAllByText(/required/i)).toHaveLength(6)
  expect(cb).not.toHaveBeenCalled()
})
