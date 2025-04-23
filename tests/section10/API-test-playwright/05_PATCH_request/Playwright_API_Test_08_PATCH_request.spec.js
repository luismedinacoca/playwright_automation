// Load Playwright module
const { test, expect, request } = require("@playwright/test");
import { stringFormat } from "../../../../utils/commons";

const bookingAPIrequestBody = require("../post_dynamic_request_body.json");
const tokenRequestBody = require("../token_request_body.json");
const putRequestBody = require("../put_request_body.json");
const patchRequestBody = require("../patch_request_body.json");

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

test("Create PATCH API request in Playwright", async ({ request }) => {
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

  console.log("====================== POST request ======================");
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

  const b_Id = postAPIresponseJson.bookingid;
  console.log("postAPIresponseJson.bookingid: ", b_Id);

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

  console.log(" ");
  console.log("====================== GET request ======================");
  console.log(" ");
  const getAPIresponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${b_Id}`,
    {
      params: {
        firstname: "Testers talk Cypress",
        lastname: "Testers talk Playwright",
      },
    }
  );
  // console.log("getAPIresponse: ", await getAPIresponse);
  console.log("getAPIresponse.json(): ", await getAPIresponse.json());
  console.log("");

  //Validate status code
  expect(getAPIresponse.ok()).toBeTruthy();
  console.log("expect(getAPIresponse.ok()).toBeTruthy()");
  console.log("getAPIresponse.ok(): ", getAPIresponse.ok());
  console.log("");

  expect(getAPIresponse.status()).toBe(200);
  console.log("expect(getAPIresponse.status()).toBe(200)");
  console.log("getAPIresponse.status(): ", getAPIresponse.status());

  console.log(" ");
  console.log("====================== Query request ======================");
  console.log(" ");

  const getAPIresponse02 = await request.get(
    `https://restful-booker.herokuapp.com/booking/`,
    {
      params: {
        firstname: "Testers talk Cypress",
      },
    }
  );

  console.log("🤬 getAPIresponse02.json():", await getAPIresponse02.json());

  console.log("");
  console.log("====================== PUT request ======================");
  console.log("");

  //Generate the Token: POST
  /*
   * "username": "admin",
   * "password": "password123",
   */
  const tokenResponse = await request.post(
    `https://restful-booker.herokuapp.com/auth`,
    {
      data: tokenRequestBody,
    }
  );

  //console.log("tokenResponse: ", tokenResponse)
  const tokenResponseJson = await tokenResponse.json();
  console.log("👍🏾 tokenResponse.json(): ", tokenResponseJson);
  const tokenNum = tokenResponseJson.token;
  console.log("👍🏾 tokenResponse.json().token: ", tokenNum);

  // PUT API request
  const putResponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${b_Id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${tokenNum}`,
      },
      data: putRequestBody,
    }
  );

  const putResponseJson = await putResponse.json();
  console.log("await putResponse.json(): ", putResponseJson);
  console.log("");

  //validate putResponse is ok:
  console.log("putResponse.ok(): ", putResponse.ok());
  expect(putResponse.ok()).toBeTruthy();
  console.log("expect(putResponse.ok()).toBeTruthy()");
  console.log("");

  //validate status code
  console.log("putResponse.status(): ", putResponse.status());
  expect(putResponse.status()).toBe(200);
  console.log("expect(putResponse.status()).toBe(200)");
  console.log("");

  const getAPIresponse03 = await request.get(
    `https://restful-booker.herokuapp.com/booking/`,
    {
      params: {
        firstname: "postman by testers talk",
      },
    }
  );

  console.log("🤬 getAPIresponse03.json():", await getAPIresponse03.json());

  console.log("");
  console.log("====================== PATCH request ======================");
  console.log("");

  console.log("tokenNum:", tokenNum);
  console.log("");

  const patchResponse = await request.patch(
    `https://restful-booker.herokuapp.com/booking/${b_Id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${tokenNum}`,
      },
      data: patchRequestBody,
    }
  );

  const patchResponseJson = await patchResponse.json();
  console.log("await patchResponse.json(): ", await patchResponseJson);
  console.log("");

  //validate patchResponse is ok:
  console.log("patchResponse.ok(): ", patchResponse.ok());
  expect(patchResponse.ok()).toBeTruthy();
  console.log("expect(patchResponse.ok()).toBeTruthy()");
  console.log("");

  //validate status code
  console.log("patchResponse.status(): ", patchResponse.status());
  expect(patchResponse.status()).toBe(200);
  console.log("expect(patchResponse.status()).toBe(200)");
  console.log("");
});
