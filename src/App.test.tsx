import { describe, expect, test, afterEach } from "vitest";
import { cleanup, render, screen } from "solid-testing-library";

import App from "./App";

// describe("App", () => {
//   afterEach(cleanup);

//   test("it displays the logo", () => {
//     render(() => <App />);
//     const logo = screen.getByTestId("logo");
//     expect(logo).toBeInTheDocument();
//     expect(logo).toHaveProperty("alt", "logo");
//   });

//   test("it has a link to the solidjs repo", () => {
//     render(() => <App />);
//     const anchor = screen.getByTestId("docs-link");
//     expect(anchor).toBeInTheDocument();
//     expect(anchor).toHaveProperty("href", "https://github.com/solidjs/solid");
//   });
// });
