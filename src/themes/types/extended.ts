import {
  type ButtonProps,
  type ChipProps,
  type IconButtonProps,
  type SliderProps,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

export type ButtonVariantProps =
  | "contained"
  | "light"
  | "outlined"
  | "dashed"
  | "text"
  | "shadow";
export type IconButtonShapeProps = "rounded" | "square";
type TooltipColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "default";
export type ColorProps =
  | ChipProps["color"]
  | ButtonProps["color"]
  | IconButtonProps["color"]
  | SliderProps["color"]
  | TooltipColor;
export type AvatarTypeProps = "filled" | "outlined" | "combined";
export type SizeProps = "badge" | "xs" | "sm" | "md" | "lg" | "xl";
export interface ExtendedStyleProps {
  color: ColorProps;
  theme: Theme;
}
