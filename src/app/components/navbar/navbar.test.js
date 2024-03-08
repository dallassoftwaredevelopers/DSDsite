import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar", () => {
  test("renders navbar component", () => {
    render(
      <Navbar
        label={{
          lblHome: "Dallas Software Developers",
          lblCommunity: "Community Impact",
          lblContact: "Contact Us",
          lblMeetup: "Meetups",
        }}
      />,
    );
    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });

  test("renders navbar component with label", () => {
    render(
      <Navbar
        label={{
          lblHome: "Dallas Software Developers",
          lblCommunity: "Community Impact",
          lblContact: "Contact Us",
          lblMeetup: "Meetups",
        }}
      />,
    );
    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toHaveTextContent("Dallas Software Developers");
    expect(navbarElement).toHaveTextContent("Community Impact");
    expect(navbarElement).toHaveTextContent("Contact Us");
    expect(navbarElement).toHaveTextContent("Meetups");
  });
});
