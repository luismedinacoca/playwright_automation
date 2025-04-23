// Load Playwright module
const { test, expect, request } = require("@playwright/test");
const bookingAPIrequestBody = require("../post_request_body.json");

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

test("Create POST API Request using STATIC JSON file", async ({ request }) => {
  //Create POST API Request
  const post_API_response = await request.post(
    `https://restful-booker.herokuapp.com/booking`,
    {
      data: bookingAPIrequestBody,
    }
  );

  //Validate status code
  console.log("post_API_response.ok(): ", post_API_response.ok());
  expect(post_API_response.ok()).toBeTruthy();
  console.log("post_API_response.status():", post_API_response.status());
  expect(post_API_response.status()).toBe(200);

  // Validate Json API response
  const postAPIresponseJson = await post_API_response.json();
  console.log("postAPIresponseJson: ", postAPIresponseJson);

  expect(postAPIresponseJson.booking).toHaveProperty("firstname", "Tester API");
  console.log(
    "postAPIresponseJson.booking.firstname: ",
    postAPIresponseJson.booking.firstname
  );

  expect(postAPIresponseJson.booking).toHaveProperty(
    "lastname",
    "Using Playwright"
  );
  console.log(
    "postAPIresponseJson.booking.lastname: ",
    postAPIresponseJson.booking.lastname
  );

  expect(postAPIresponseJson.booking).toHaveProperty("totalprice", 1000);
  console.log(
    "postAPIresponseJson.booking.totalprice: ",
    postAPIresponseJson.booking.totalprice
  );

  expect(postAPIresponseJson.booking).toHaveProperty("depositpaid", true);
  console.log(
    "postAPIresponseJson.booking.depositpaid: ",
    postAPIresponseJson.booking.depositpaid
  );
  console.log("...");

  console.log(
    "postAPIresponseJson.booking.bookingdates: ",
    postAPIresponseJson.booking.bookingdates
  );

  expect(postAPIresponseJson.booking.bookingdates).toHaveProperty(
    "checkin",
    "2025-04-12"
  );
  console.log(
    "postAPIresponseJson.booking.bookingdates.checkin: ",
    postAPIresponseJson.booking.bookingdates.checkin
  );

  expect(postAPIresponseJson.booking.bookingdates).toHaveProperty(
    "checkout",
    "2025-04-30"
  );
  console.log(
    "postAPIresponseJson.booking.bookingdates.checkout: ",
    postAPIresponseJson.booking.bookingdates.checkout
  );
  console.log("...");

  expect(postAPIresponseJson.booking).toHaveProperty(
    "additionalneeds",
    "super Shakira"
  );
  console.log(
    "postAPIresponseJson.booking.additionalneeds: ",
    postAPIresponseJson.booking.additionalneeds
  );

  // Validate nested Json objects
});
