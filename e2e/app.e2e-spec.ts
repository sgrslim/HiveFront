import { HiveWebpagePage } from './app.po';

describe('hive-webpage App', () => {
  let page: HiveWebpagePage;

  beforeEach(() => {
    page = new HiveWebpagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
