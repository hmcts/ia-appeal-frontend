const {expect} = require('test/chai-sinon');
const SinglePage = require('test/e2e/single-page');
const {helloWorld} = require('paths');

describe('@smoke tests', () => {
  /* eslint-disable init-declarations */
  let helloWorldPage;
  /* eslint-enable init-decalarations */

  before(async () => {
    helloWorldPage = new SinglePage(helloWorld);
    await helloWorldPage.open();
  });

  after(async () => {
    await helloWorldPage.close();
  });

  it('has Hello world heading', async () => {
    expect(await helloWorldPage.getHeading()).to.equal('Hello world');
  });
});
