import React from "react";
import { render, screen } from "@testing-library/react";
import BannerSection from "./bannersection";

describe("BannerSection", () => {
  const label = {
    lblHome: "Dallas Software Developers",
    lblCommunity: "Community Impact",
    lblContact: "Contact Us",
    lblMeetup: "Meetups",
    lblBanner: "This website is made BY the community FOR the community",
  };

  test("renders banner section component", () => {
    render(<BannerSection label={label} />);
    const bannerSectionElement = screen.getByTestId("bannerSection");
    expect(bannerSectionElement).toBeInTheDocument();
  });

  test("renders banner section component with label", () => {
    render(<BannerSection label={label} />);
    const bannerSectionElement = screen.getByTestId("bannerSection");
    expect(bannerSectionElement).toHaveTextContent(
      "This website is made BY the community FOR the community"
    );
  });
});
