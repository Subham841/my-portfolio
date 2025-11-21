import { SVGProps } from "react";

const DjangoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.12 1.43l-4.22 3.65c-1.39-1.2-3.04-2-4.8-2.19V1.43h-2v1.5c-3.79.4-6.88 3.5-6.88 7.29s3.09 6.88 6.88 7.29v4.06h2v-4.14c1.8-.18 3.46-.98 4.88-2.2l4.14 3.58 1.44-1.67-15.6-13.5L14.7 3.1l1.42-1.67zM9 14.22a4.22 4.22 0 110-8.44 4.22 4.22 0 010 8.44z" />
  </svg>
);

export default DjangoIcon;
