// Load Playwright module
const { test, expect, request } = require("@playwright/test");

/*
 * Install:
 * $ npm install @faker-js/faker --save-dev
 * $ npm install --save luxon
 */

import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

//Write a Test
test("Create POST API Request using DYNAMIC request body", async ({
  request,
}) => {
  const firstname = faker.person.firstName();
  console.log(firstname);
  const lastname = faker.person.lastName();
  const totalPrice = faker.number.int(1000);

  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ day: 20 }).toFormat("yyyy-MM-dd");

  console.log(lastname);
  console.log(totalPrice);
  console.log(checkInDate);
  console.log(checkOutDate);

  //Create POST API Request
  const post_API_response = await request.post(
    `https://restful-booker.herokuapp.com/booking`,
    {
      data: {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalPrice,
        depositpaid: true,
        bookingdates: {
          checkin: checkInDate,
          checkout: checkOutDate,
        },
        additionalneeds: "super bowls",
      },
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

  expect(postAPIresponseJson.booking).toHaveProperty("firstname", firstname);
  console.log(
    "postAPIresponseJson.booking.firstname: ",
    postAPIresponseJson.booking.firstname
  );

  expect(postAPIresponseJson.booking).toHaveProperty("lastname", lastname);
  console.log(
    "postAPIresponseJson.booking.lastname: ",
    postAPIresponseJson.booking.lastname
  );

  expect(postAPIresponseJson.booking).toHaveProperty("totalprice", totalPrice);
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
    checkInDate
  );
  console.log(
    "postAPIresponseJson.booking.bookingdates.checkin: ",
    postAPIresponseJson.booking.bookingdates.checkin
  );

  expect(postAPIresponseJson.booking.bookingdates).toHaveProperty(
    "checkout",
    checkOutDate
  );
  console.log(
    "postAPIresponseJson.booking.bookingdates.checkout: ",
    postAPIresponseJson.booking.bookingdates.checkout
  );
  console.log("...");

  expect(postAPIresponseJson.booking).toHaveProperty(
    "additionalneeds",
    "super bowls"
  );
  console.log(
    "postAPIresponseJson.booking.additionalneeds: ",
    postAPIresponseJson.booking.additionalneeds
  );
});
