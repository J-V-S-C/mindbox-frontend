import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Header } from "@/app/components/Header";

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => ({ value: undefined })), // Not logged in
  })),
}));

vi.mock("@/app/lib/auth/logout", () => ({
  logout: vi.fn(),
}));

test("renders Header for unauthenticated users", async () => {
  const jsx = await Header();
  render(jsx);

  expect(screen.getByText("MindBox")).toBeTruthy();
  expect(screen.getByText("Log in")).toBeTruthy();
  expect(screen.getByText("Sign up")).toBeTruthy();
});
