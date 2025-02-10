import { test, expect } from '@playwright/test';

test('Purchase an Item', async ( { page } ) => {
    await page.goto('https://saucedemo.com');

    await page.getByRole('textbox', {name:'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name:'Login'}).click();

    //await page.pause();
})