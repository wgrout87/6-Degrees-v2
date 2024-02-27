import { ReactNode, useState, MouseEvent } from "react";
import classNames from "classnames";

type Props = {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: (
    e: MouseEvent<HTMLButtonElement>
  ) =>
    | Promise<unknown>
    | ((e: MouseEvent<HTMLButtonElement>) => unknown)
    | (() => void);
  disabled?: boolean;
  loading?: boolean;
  style?: "default" | "secondary" | "tertiary";
  className?: string;
};
const styles = {
  default: "bg-sky-500 hover:bg-sky-600 text-white disabled:bg-sky-300",
  secondary: "bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300",
  tertiary:
    "bg-white hover:bg-sky-50 text-neutral-800 disabled:bg-neutral-300 hover:border-sky-600 border-sky-500 border",
};

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  style = "default",
  className,
}: Props) {
  const [internalLoading, setInternalLoading] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!onClick) return { error: new Error("no onClick provided") };
    const result: Promise<unknown> | unknown = onClick(e);
    if (result instanceof Promise) {
      setInternalLoading(true);
      result
        .catch((e: Error) => {
          setInternalLoading(false);
          throw e;
        })
        .then((res: unknown) => {
          setInternalLoading(false);
          return res;
        });
    }
    return result;
  };

  return (
    <button
      className={classNames(
        "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all disabled:cursor-not-allowed box-border",
        styles[style],
        className
      )}
      onClick={type === "submit" ? undefined : handleClick}
      disabled={disabled || internalLoading}
      type={type}
    >
      {loading ? loading : children}
    </button>
  );
}
