import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "@/components/ThemeToggle";

const setThemeMock = vi.fn();
let resolvedThemeMock: "light" | "dark" = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: resolvedThemeMock,
    setTheme: setThemeMock,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    resolvedThemeMock = "light";
    setThemeMock.mockReset();
  });

  it("sets dark theme when switched on", () => {
    render(<ThemeToggle compact />);

    fireEvent.click(screen.getByRole("switch", { name: "Cambiar a modo oscuro" }));

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("sets light theme when switched off from dark", () => {
    resolvedThemeMock = "dark";
    render(<ThemeToggle compact />);

    fireEvent.click(screen.getByRole("switch", { name: "Cambiar a modo oscuro" }));

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
