import { Icon as AdobeIcon } from "@adobe/react-spectrum";
import { IconProps } from "./Icon";

export function MdiSelectAll(props: IconProps) {
  const { transform, ...rest } = props;
  return (
    <AdobeIcon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M9 9h6v6H9m-2 2h10V7H7m8-2h2V3h-2m0 18h2v-2h-2m4-2h2v-2h-2m0-6h2V7h-2m0 14a2 2 0 0 0 2-2h-2m0-6h2v-2h-2m-8 10h2v-2h-2M9 3H7v2h2M3 17h2v-2H3m2 6v-2H3a2 2 0 0 0 2 2M19 3v2h2a2 2 0 0 0-2-2m-6 0h-2v2h2M3 9h2V7H3m4 14h2v-2H7m-4-6h2v-2H3m0-6h2V3a2 2 0 0 0-2 2"
        />
      </svg>
    </AdobeIcon>
  );
}
