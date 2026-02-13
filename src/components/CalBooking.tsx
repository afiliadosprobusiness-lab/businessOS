import { Button, type ButtonProps } from "@/components/ui/button";

const CAL_BOOKING_URL = "https://cal.com/afiliados-pro-business/meet-demo-businessos?layout=month_view";

const openBookingPopup = () => {
  const width = 980;
  const height = 780;
  const left = Math.max(0, Math.floor(window.screenX + (window.outerWidth - width) / 2));
  const top = Math.max(0, Math.floor(window.screenY + (window.outerHeight - height) / 2));
  const features = `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`;

  const popup = window.open(CAL_BOOKING_URL, "businessos-demo-booking", features);

  if (!popup) {
    window.location.href = CAL_BOOKING_URL;
    return;
  }

  popup.focus();
};

const CalBookingButton = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <Button
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        openBookingPopup();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export { CalBookingButton };
