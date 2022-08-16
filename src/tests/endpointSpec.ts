import supertest from 'supertest';
import app from '../index';
import path from 'path';
import processing from '../utilities/processing';
const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the api endpoint main route', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('tests presence of image', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
  });
  it('tests resizing of an image', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toEqual(200);
  });
  it('tests processing image function', async () => {
    expect(async () => {
      await processing(
        200,
        200,
        path.normalize(
          `${__dirname}../../../../assets/thumb/fjord_200_200.png`
        ),
        path.normalize(`${__dirname}../../../assets/full/fjord.jpg`)
      );
    }).not.toThrow();
  });
});
