//needs npm start o terminal to run
import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, //turn off headless to watch tests within the browser
      slowMo: 250, // slow down by 250ms
    });//sets var browser
    page = await browser.newPage();//sets var page
    await page.goto('http://localhost:3000/');//set destination
    await page.waitForSelector('.event');//set selector to be watched
  });

  afterAll(() => {
    browser.close();
  });
  test("An event element is collapsed by default", async () => {
    
    const extra = await page.$(".event .eventDetails--description");
    expect(extra).toBeNull();//expects selector to be null
  });
  test("User can expand an event to see its details", async () => {

    await page.click(".event .button");//simulate the user clicking
    const extra = await page.$(".event .eventDetails--description");//async
    expect(extra).toBeDefined();//expects selector to exist
  });

    test("User can collapse an event to hide its details", async () => {
      await page.click(".event .button");

      const extra = await page.$(".event .extra");
      expect(extra).toBeNull();
    });
});