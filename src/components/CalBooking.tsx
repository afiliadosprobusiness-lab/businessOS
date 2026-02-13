import { Button, type ButtonProps } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DEMO_BOOKING_ROUTE } from "@/lib/routes";

const CalBookingButton = ({ children, onClick, ...props }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        navigate(DEMO_BOOKING_ROUTE);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export { CalBookingButton };
