// src/types/react-image-magnify.d.ts
declare module "react-image-magnify" {
  import * as React from "react";

  interface SmallImage {
    alt: string;
    isFluidWidth?: boolean;
    width?: number;
    height?: number;
    src: string;
  }

  interface LargeImage {
    src: string;
    width: number;
    height: number;
  }

  interface ReactImageMagnifyProps {
    smallImage: SmallImage;
    largeImage: LargeImage;
    enlargedImageContainerStyle?: React.CSSProperties;
    enlargedImagePosition?: "over" | "beside";
    isHintEnabled?: boolean;
    shouldUsePositiveSpaceLens?: boolean;
    [key: string]: any;
  }

  const ReactImageMagnify: React.FC<ReactImageMagnifyProps>;

  export default ReactImageMagnify;
}
