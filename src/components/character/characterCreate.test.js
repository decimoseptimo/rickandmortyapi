import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import { CharacterCreate } from "./characterCreate"

// Done with this principles
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

it("renders correctly", () => {
  render(<CharacterCreate onSubmit={_ => {}} onClose={_ => {}} />)

  // form title
  expect(
    screen.getByRole("heading", { name: /create character/i })
  ).toBeInTheDocument()

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

it("on cancel, run callback", () => {
  const cb = jest.fn()
  render(<CharacterCreate onSubmit={_ => {}} onClose={cb} />)

  // click cancel
  fireEvent.click(screen.getByRole("button", { name: /cancel/i }))
  expect(cb).toHaveBeenCalled()
})

it("on submit with empty fields, throw error message", async () => {
  const cb = jest.fn()
  render(<CharacterCreate onSubmit={cb} onClose={_ => {}} />)

  // click submit
  fireEvent.click(screen.getByRole("button", { name: /save/i }))
  expect(await screen.findAllByText(/required/i)).toHaveLength(6)
  expect(cb).not.toHaveBeenCalled()
})

it("on submit with all fields filled, run callback", async () => {
  const cb = jest.fn()
  render(<CharacterCreate onSubmit={cb} onClose={_ => {}} />)

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
  // expect(cb).toHaveBeenCalled()
})
