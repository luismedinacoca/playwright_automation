// Load Playwright module
const { test, expect, request } = require("@playwright/test");
import { stringFormat } from "../../../../utils/commons";

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

const bookingAPIrequestBody = require("../post_dynamic_request_body.json");

test("Create POST API Request using DYNAMIC JSON file", async ({ request }) => {
  /*
   * Use "stringify" function: (bookingAPIrequestBody): Json => string
   * Strings are needed in order to accept variables arguments/parameters
   * return a string
   */
  const dynamicRequestBody = stringFormat(
    JSON.stringify(bookingAPIrequestBody),
    "Testers talk Cypress",
    "Testers talk Playwright",
    "Aguante la Renga"
  );

  //Create POST API Request
  /*
   * JSON.parse function: (dynamicRequestBody): string => Json format
   */
  const post_API_response = await request.post(
    `https://restful-booker.herokuapp.com/booking`,
    {
      data: JSON.parse(dynamicRequestBody),
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

  const bookingId = postAPIresponseJson.bookingid;
  console.log("postAPIresponseJson.bookingid: ", bookingId);

  expect(postAPIresponseJson.booking).toHaveProperty(
    "firstname",
    "Testers talk Cypress"
  );
  console.log(
    "postAPIresponseJson.booking.firstname: ",
    postAPIresponseJson.booking.firstname
  );

  expect(postAPIresponseJson.booking).toHaveProperty(
    "lastname",
    "Testers talk Playwright"
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
    "Aguante la Renga"
  );
  console.log(
    "postAPIresponseJson.booking.additionalneeds: ",
    postAPIresponseJson.booking.additionalneeds
  );
});
