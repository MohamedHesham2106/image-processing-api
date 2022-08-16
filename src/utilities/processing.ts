import sharp from 'sharp';
const processing = async (
  width: number,
  height: number,
  output: string,
  input: string
): Promise<void | Error> => {
  //resizing
  try {
    await sharp(input).resize(width, height).toFile(output);
  } catch (error) {
    throw Error("Sorry Couldn't resize");
  }
};
export default processing;
