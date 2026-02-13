import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button, type ButtonProps } from "@/components/ui/button";

const CAL_NAMESPACE = "meet-demo-businessos";
const CAL_LINK = "afiliados-pro-business/meet-demo-businessos";
const CAL_CONFIG = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: true,
  iframeAttrs: {
    sandbox:
      "allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation",
  },
};

const CAL_CONFIG_JSON = JSON.stringify(CAL_CONFIG);

const CalBookingProvider = () => {
  useEffect(() => {
    let isMounted = true;

    const initCal = async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });

      if (!isMounted) {
        return;
      }

      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      cal("on", {
        action: "routed",
        callback: (event) => {
          const routeData = event.detail.data;

          if (routeData.actionType !== "externalRedirectUrl") {
            return;
          }

          window.open(routeData.actionValue, "_blank", "noopener,noreferrer");
        },
      });
    };

    void initCal();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
};

const CalBookingButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config={CAL_CONFIG_JSON}
      {...props}
    >
      {children}
    </Button>
  );
};

export { CalBookingButton, CalBookingProvider };
