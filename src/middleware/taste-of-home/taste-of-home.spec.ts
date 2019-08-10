import { expect } from 'chai';
import { fake, stub, restore } from 'sinon';
import { TasteOfHome } from './taste-of-home';
import * as cheerio from 'cheerio';

// TODO
describe('TasteOfHome middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    mockRequest = {
      body: { url: 'https://tasteofhome.com' }
    };
    mockResponse = {
      locals: {
        html: fake()
      },
      send: fake()
    };
    mockNext = fake();
  });

  afterEach(() => {
    restore();
  });

  it('passes to the next middleware if the url does not match', () => {
    // override the mockRequest url with a bad url
    mockRequest.body.url = 'https://someotherwebsite.com';

    TasteOfHome(mockRequest, mockResponse, mockNext);

    expect(mockNext.calledOnce).to.be.true;
  });

  it('parses the html object from the scraper router and returns the result', () => {
    const fakeParsedData: any = () => {
      return {
        text: fake(),
        find: fake.returns({
          each: fake()
        })
      };
    };
    stub(cheerio, 'load').returns(fakeParsedData);

    TasteOfHome(mockRequest, mockResponse, mockNext);

    expect(mockResponse.send.calledOnce).to.be.true;
  });
});