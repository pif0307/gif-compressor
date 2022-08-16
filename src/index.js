"use strict";
const execa = require("execa");
const path = require("path");
const gifsicle = require("gifsicle");
const isGif = require("is-gif");

module.exports = (opts) => async (buf) => {
  opts = Object.assign(
    {
      timeout: 0,
    },
    opts
  );

  if (!isGif(buf)) {
    return buf;
  }

  const args = ["--no-warnings", "--no-app-extensions"];

  if (opts.max_frame) {
    args.push("--unoptimize");

    const frameCount = (
      await execa(
        path.resolve(__filename, "../get_frame_count.sh"),
        [gifsicle],
        {
          encoding: "utf8",
          input: buf,
          timeout: opts.timeout,
        }
      )
    ).stdout;

    const frameCycle = Math.ceil(frameCount / opts.max_frame);

    if (frameCycle == 0) {
      frameCycle = 1;
    }

    const delaySecond = (
      await execa(
        path.resolve(__filename, "../get_delay_second.sh"),
        [gifsicle],
        {
          encoding: "utf8",
          input: buf,
          timeout: opts.timeout,
        }
      )
    ).stdout;

    args.push("--delay");

    if (opts.max_delay && delaySecond * frameCycle > opts.max_delay) {
      args.push(opts.max_delay);
    } else if (opts.min_delay && delaySecond * frameCycle < opts.min_delay) {
      args.push(opts.min_delay);
    } else {
      args.push(delaySecond * frameCycle);
    }

    for (var i = 0; i < frameCount - 1; i++) {
      if (i % frameCycle == 0) {
        args.push(`#${i}`);
      }
    }
  }

  if (opts.width) {
    if (!opts.stretch) {
      args.push(`--resize-fit-width=${opts.width}`);
    } else {
      args.push(`--resize-width=${opts.width}`);
    }
  }

  if (opts.height) {
    if (!opts.stretch) {
      args.push(`--resize-fit-height=${opts.height}`);
    } else {
      args.push(`--resize-height=${opts.height}`);
    }
  }

  args.push("--output", "-");

  try {
    const process = await execa(gifsicle, args, {
      encoding: null,
      input: buf,
      timeout: opts.timeout,
    });

    return process.stdout;
  } catch (error) {
    error.message = error.stderr || error.message;
    throw error;
  }
};
