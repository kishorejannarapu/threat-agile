import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const TooltipNoWrap = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

export default TooltipNoWrap;
