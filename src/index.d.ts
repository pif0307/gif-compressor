declare module "@gumlet/gif-resize" {
  function gifResize(options: {
    /**
     * Resize GIF to given width in pixels. It maintains aspect ratio.
     */
    width?: number;
    /**
     * Resize GIF to given height in pixels. It maintains aspect ratio.
     */
    height?: number;
    /**
     * If this is set, and width and height both are provided, the GIF will be resized such that it exactly matches the dimensions provided. It won't match the aspect ratio.
     */
    stretch?: boolean;
    /**
     * Resize GIF to given width in pixels. It maintains aspect ratio.
     */
    timeout?: number;
    /**
     * Select an optimization level between 1 and 3.
     *
     * The optimization level determines how much optimization is done; higher levels take longer, but may have better results.
     *
     * 1- Stores only the changed portion of each image.
     * 2- Also uses transparency to shrink the file further.
     * 3- Try several optimization methods (usually slower, sometimes better results)
     */
    max_frame?: number;
  }): (
    /**
     * Buffer to optimize / resize.
     */
    buffer: Buffer
  ) => Promise<Buffer>;
  export = gifResize;
}
