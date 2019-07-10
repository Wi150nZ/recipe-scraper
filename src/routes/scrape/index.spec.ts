import { expect } from 'chai';
import { fake, stub } from 'sinon';
import { Scraper } from './index';
import * as puppeteer from 'puppeteer';

describe('Scraping router', () => {

  // beforeEach(() => {

  // });

  it('Initializes the headless Chromium browser', () => {
    const mockChromiumBrowser: any = {};
    const mockRequest: any = {
      body: {
        url: 'fake url'
      }
    };
    const mockResponse: any = {};
    const mockNext: any = fake();
    const mockChromiumLauncher = stub(puppeteer, 'launch').returns(mockChromiumBrowser);

    Scraper(mockRequest, mockResponse, mockNext);

    expect(mockChromiumLauncher.calledOnce).to.equal(true)
  });
});