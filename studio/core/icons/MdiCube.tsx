import { Icon as AdobeIcon } from "@adobe/react-spectrum";
import { IconProps } from "./Icon";

export function MdiCube(props: IconProps) {
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
          d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.99.99 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88zM12 4.15L6.04 7.5L12 10.85l5.96-3.35zM5 15.91l6 3.38v-6.71L5 9.21zm14 0v-6.7l-6 3.37v6.71z"
        />
      </svg>
    </AdobeIcon>
  );
}
