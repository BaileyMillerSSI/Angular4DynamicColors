import { Angular4ColorDemoPage } from './app.po';

describe('angular4-color-demo App', () => {
  let page: Angular4ColorDemoPage;

  beforeEach(() => {
    page = new Angular4ColorDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
