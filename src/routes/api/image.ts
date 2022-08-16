import express, { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';
import processing from '../../utilities/processing';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<unknown> => {
  const file = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  let cache: boolean;

  console.log(file);
  //Directories
  let input = path.normalize(`${__dirname}../../../../assets/full/${file}.jpg`);
  let output = path.normalize(
    `${__dirname}../../../../assets/thumb/${file}_${width}_${height}.png`
  );

  //Check if Directory exist
  let exist = await fs.pathExists(input);
  //Check filename query value
  if (file == '') {
    return res.status(404).send('Please Enter Image name');
  }
  //Check Image existance
  if (!exist) {
    return res.status(404).send('Image not found');
  }

  cache = await fs.pathExists(output);
  //Check if width and height exists in query
  if (width === undefined && height === undefined) {
    return res.sendFile(input);
  }
  //Check if not empty string
  if (width === '' || height === '') {
    return res.status(404).send("Please don't leave width or height empty");
  }
  //Check if it is a number not string
  if (isNaN(+width) || isNaN(+height)) {
    return res.status(404).send('Width and Height Must be numbers');
  }
  //Check if they are a positive number
  if (+width <= 0 || +height <= 0) {
    return res.status(404).send('Width and Height Must be positive Integer');
  }

  if (cache) {
    res.status(200).sendFile(output);
    console.log('Cached');
  } else {
    console.log('not Cached');
    await processing(+width, +height, output, input);
    res.status(200).sendFile(output);
  }
});

export default images;
