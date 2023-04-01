import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
	let browser;
	let page;
	beforeAll(async () => {
		jest.setTimeout(40000);
		browser = await puppeteer
			.launch
			//   {
			// 	headless: false,
			// 	slowMo: 250,
			// 	ignoreDefaultArgs: ["--disable-extensions"],
			// }
			();
		page = await browser.newPage();
		await page.goto("http://localhost:3000/");
		await page.waitForSelector(".event");
	});

	afterAll(() => {
		browser.close();
	});

	test("An event element is collapsed by default", async () => {
		const eventDetails = await page.$(".event .event-details");
		expect(eventDetails).toBeNull();
	});

	test("User can expand an event to see its deatils", async () => {
		await page.click(".event .details-button");
		const eventDetails = await page.$(".event .event-details");
		expect(eventDetails).toBeDefined();
	});

	test("Used can collapse an event to hide it's details", async () => {
		await page.click(".event .details-button");
		const eventDetails = await page.$(".event .event-details");
		expect(eventDetails).toBeNull();
	});
});

describe("Filter events by city", () => {
	let browser;
	let page;
	beforeAll(async () => {
		jest.setTimeout(40000);
		browser = await puppeteer
			.launch
			//   {
			// 	headless: false,
			// 	slowMo: 250,
			// 	ignoreDefaultArgs: ["--disable-extensions"],
			// }
			();
		page = await browser.newPage();
		await page.goto("http://localhost:3000/");
		await page.waitForSelector(".event");
	});

	afterAll(() => {
		browser.close();
	});

	test("If no city selected, show upcoming events from all cities", async () => {
		const eventList = await page.$(".EventList");
		expect(eventList).toBeDefined();
	});

	test("User should see a list of suggestions when they search for a city", async () => {
		await page.type(".city", "Berlin", { delay: 100 });
		const suggestionList = await page.$(".suggestions li");
		expect(suggestionList).toBeDefined();
	});

	test("User can select a city from the suggested list", async () => {
		await page.click(".suggestions li");
		const eventLocation = await page.$(".event .event-location");
		const locationText = await page.evaluate((element) => element.textContent, eventLocation);
		expect(locationText).toContain("Berlin");
	});
});
