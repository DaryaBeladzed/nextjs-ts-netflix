import { render, screen } from "@testing-library/react"
import Player from "./Player"

test("shows volume off icon after click on volume btn", async () => {
    render(<Player />)
    // expect(screen.getByTestId('volume'))
    // user.click(screen.getByTestId('volume'))
})
