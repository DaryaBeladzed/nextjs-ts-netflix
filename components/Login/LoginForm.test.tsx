import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import user from "@testing-library/user-event"
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from "@testing-library/dom"
import React from "react"

describe("Login form", () => {
    const onSubmit = jest.fn((email, password) => {
        return Promise.resolve();
    });

    beforeEach(() => {
        // onSubmit.mockClear();
        render(<LoginForm signIn={onSubmit} signUp={onSubmit} />)
    })

    test("onSubmit is called when all fields pass validation and Sign In button click", async () => {
        await user.type(getEmail(), "test@gmail.com")
        await user.type(getPassword(), "123456")
        await clickSignInButton()

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith("test@gmail.com", "123456")
        })

        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    test("has 2 required fields", async () => {
        await clickSignInButton()

        await waitFor(() => {
            expect(getEmail()).toHaveErrorMessage(/Email is a required field./i)
            expect(getPassword()).toHaveErrorMessage(/Your password must contain between 6 and 60 characters./i)
        })
    })

    describe("email field", () => {
        test("shows pattern error", async () => {
            // await user.type(getEmail(), "qwerty")
            // await user.tab()
            // expect(screen.findByText(/entered value does not match email format/i))

            fireEvent.change(getEmail(), { target: { value: "qwerty" } })
            await clickSignInButton()
            await waitFor(() => {
                expect(getEmail()).toHaveErrorMessage(
                    /entered value does not match email format/i
                );
            });
        })
    })

    describe("password field", () => {
        test("shows 'less than 6' error", async () => {
            // await user.type(getPassword(), "{selectall}qwert")
            // user.tab()
            // expect(screen.findByText(/password min length is 6/i))

            fireEvent.change(getPassword(), { target: { value: "qwert" } })
            await clickSignInButton()
            await waitFor(() => {
                expect(getPassword()).toHaveErrorMessage(
                    /password min length is 6/i
                );
            });
        })

        test("shows 'more than 60' error", async () => {
            // await user.type(getPassword(), "{selectall}You want to write maintainable tests that give you high confidence")
            // await user.tab()
            // expect(screen.findByText(/password max length is 60/i))

            fireEvent.change(getPassword(), { target: { value: "You want to write maintainable tests that give you high confidence" } })
            await clickSignInButton()
            await waitFor(() => {
                expect(getPassword()).toHaveErrorMessage(
                    /password max length is 60/i
                );
            });
        })
    })
})

const getEmail = () => screen.getByPlaceholderText(/email/i)

const getPassword = () => screen.getByPlaceholderText(/password/i)

const clickSignInButton = () => user.click(screen.getByRole('button', {
    name: /sign in/i
}))
