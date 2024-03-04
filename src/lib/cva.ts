
import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const variants = cva(
  ` relative flex  px-4 py-2    [--variant:--primary] transition-[transform_background-color] duration-300 duration-300  justify-center items-center tracking-wider text-neutral
    `,
  {
    variants: {
      variant: {
        fill: " bg-variant   ",
        outline:
          " ring-solid  duration-700  ring-2 ring-variant hover:bg-variant active:bg-variant     ",
        ghost:
          "  hover:bg-variant/80   active:bg-variant    ",
        none: "",
      },
      shape: {
        pill: "rounded-[50%]",
        circle: "rounded-full aspect-square",
        rect: "",
      },
      deActivated: {
        default:
          " disabled:text-gray-700  disabled:bg-gray-500 disabled:ring-gray-500 ",
        skelaton:
          "disabled:text-gray-400 disabled:ring-4 disabled:bg-gray-400 disabled:active:bg-transparent",
        link: "text-gray-400 ring-gray-400 active:bg-transparent hover:scale-100 cursor-auto",
      },
      hover: {
        flicker: "before:absolute before:inset-0 before:bg-neutral/20  before:opacity-0 before:transition-opacity hover:before:opacity-100"
      }
    },

    defaultVariants: {
      variant: "fill",
      shape: "rect",
      deActivated: "default",
      hover: "flicker"
    },
  }
);
export type variantsType = VariantProps<typeof variants>;
