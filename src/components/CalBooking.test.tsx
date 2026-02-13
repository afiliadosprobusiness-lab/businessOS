import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalBookingButton } from "@/components/CalBooking";
import { DEMO_BOOKING_ROUTE } from "@/lib/routes";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

describe("CalBookingButton", () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  it("navigates to the internal booking route", () => {
    render(<CalBookingButton>Agendar demo</CalBookingButton>);

    fireEvent.click(screen.getByRole("button", { name: "Agendar demo" }));

    expect(navigateMock).toHaveBeenCalledWith(DEMO_BOOKING_ROUTE);
  });

  it("does not navigate when parent onClick prevents default", () => {
    render(
      <CalBookingButton
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Agendar demo
      </CalBookingButton>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Agendar demo" }));

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
