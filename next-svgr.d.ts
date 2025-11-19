declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

declare module "next-svgr" {
  import type { NextConfig } from "next";
  const withSVGR: (config?: NextConfig) => NextConfig;
  export default withSVGR;
}
