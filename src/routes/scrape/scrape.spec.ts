// import { expect } from 'chai';
// import { fake, stub, restore, SinonStub } from 'sinon';
// import * as puppeteer from 'puppeteer';
// import { Scraper } from './scrape';

// describe('Scraping router', () => {
//   let mockRequest: any;
//   let mockResponse: any;
//   let mockNext: any;

//   beforeEach(() => {
//     mockRequest = {
//       body: { url: 'fake url' }
//     };
//     mockResponse = { locals: {} };
//     mockNext = fake();
//   });

//   afterEach(() => {
//     restore();
//   })

//   it('Loads the requested webpage onto the page', async () => {
//     const mockChromiumPage: any = {
//       setRequestInterception: fake(),
//       on: fake(),
//       goto: fake()
//     };
//     const mockChromiumBrowser: any = {
//       newPage: fake.returns(mockChromiumPage)
//     };
//     stub(puppeteer, 'launch').returns(mockChromiumBrowser);

//     await Scraper(mockRequest, mockResponse, mockNext);

//     expect(mockChromiumPage.goto.calledOnce).to.be.true;
//   });

//   it('Obtains the HTML of the webpage', async () => {
//     const mockChromiumPage: any = {
//       setRequestInterception: fake(),
//       on: fake(),
//       goto: fake(),
//       evaluate: fake.resolves('some html')
//     };
//     const mockChromiumBrowser: any = {
//       newPage: fake.returns(mockChromiumPage)
//     };
//     stub(puppeteer, 'launch').returns(mockChromiumBrowser);

//     await Scraper(mockRequest, mockResponse, mockNext);

//     expect(mockChromiumPage.evaluate.calledOnce).to.be.true;
//   });

//   it('Closes the Chromium browser', async () => {
//     const mockChromiumPage: any = {
//       setRequestInterception: fake(),
//       on: fake(),
//       goto: fake(),
//       evaluate: fake.resolves('some html')
//     };
//     const mockChromiumBrowser: any = {
//       newPage: fake.returns(mockChromiumPage),
//       close: fake()
//     };
//     stub(puppeteer, 'launch').returns(mockChromiumBrowser);

//     await Scraper(mockRequest, mockResponse, mockNext);

//     expect(mockChromiumBrowser.close.calledOnce).to.be.true;
//   });

//   it('Fetched HTML is passed to the next middleware', async () => {
//     const mockChromiumPage: any = {
//       setRequestInterception: fake(),
//       on: fake(),
//       goto: fake(),
//       evaluate: fake.resolves('some html')
//     };
//     const mockChromiumBrowser: any = {
//       newPage: fake.returns(mockChromiumPage),
//       close: fake()
//     };
//     stub(puppeteer, 'launch').returns(mockChromiumBrowser);

//     await Scraper(mockRequest, mockResponse, mockNext);

//     expect(mockResponse.locals.html).to.be.equal('some html');
//     expect(mockNext.calledOnce).to.be.true;
//   });
// });