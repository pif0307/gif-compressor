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
    interlaced?: boolean;
    /**
     * Interlace gif for progressive rendering.
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
    optimizationLevel?: number;
    /**
     * Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.
     */
    colors?: number;
    /**
     * Default: lanczos3
     *
     * Set the method used to resize images. The sample method runs very quickly, but when shrinking images, it produces noisy results. The mix method is somewhat slower, but produces better-looking results. The default method is currently mix.
     *
     * Gifsicle also supports more complex resamplers, including Catmull-Rom cubic resampling (catrom), the Mitchell-Netravali filter (mitchell), a 2-lobed Lanczos filter (lanczos2), and a 3-lobed Lanczos filter (lanczos3). These filters are slower still, but can give sharper, better results.
     */
    resize_method?: string;
    /**
     * Set the gamma correction to gamma, which can be a real number or ‘srgb’.
     */
    gamma?: number;
    /**
     * Crop box in format [left, top, width, height].
     */
    crop?: [number, number, number, number];
    /**
     * Flips GIF horizontally.
     */
    flip_h?: boolean;
    /**
     * Flips GIF vertically.
     */
    flip_v?: boolean;
    /**
     * Resize GIF to given width in pixels. It maintains aspect ratio.
     */
    rotate?: number;
  }): (
    /**
     * Buffer to optimize / resize.
     */
    buffer: Buffer
  ) => Promise<Buffer>;
  export = gifResize;
}
