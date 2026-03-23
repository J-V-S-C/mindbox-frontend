import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Breadcrumbs } from "@/app/components/ui/Breadcrumbs";

test("renders Breadcrumbs with given items", () => {
  render(
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "Current" },
      ]}
    />
  );

  // Check if all labels are rendered
  expect(screen.getByText("Home")).toBeTruthy();
  expect(screen.getByText("Roadmaps")).toBeTruthy();
  expect(screen.getByText("Current")).toBeTruthy();

  // Check if separators (/) are rendered
  const separators = screen.getAllByText("/");
  expect(separators.length).toBe(2);

  // Check links
  const homeLink = screen.getByText("Home");
  expect(homeLink.getAttribute("href")).toBe("/");

  const roadmapsLink = screen.getByText("Roadmaps");
  expect(roadmapsLink.getAttribute("href")).toBe("/roadmaps");

  // Current node shouldn't be a link
  const currentText = screen.getByText("Current");
  expect(currentText.tagName).toBe("SPAN"); // No href
});
