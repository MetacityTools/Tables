import { Icon as AdobeIcon } from "@adobe/react-spectrum";
import { IconProps } from "./Icon";

export function MdiArrowSplitVertical(props: IconProps) {
  const { transform, ...rest } = props;
  return (
    <AdobeIcon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        transform={transform}
      >
        <path
          fill="currentColor"
          d="M18 16v-3h-3v9h-2V2h2v9h3V8l4 4zM2 12l4 4v-3h3v9h2V2H9v9H6V8z"
        />
      </svg>
    </AdobeIcon>
  );
}
