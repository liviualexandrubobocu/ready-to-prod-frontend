import { test, chromium, expect } from '@playwright/test';

test.describe("Users Test Suite", () => {
    test('should go to /users page when selecting user from the menu', async () => {
        const context = await chromium.launchPersistentContext('', {
            headless: true,
            ignoreHTTPSErrors: true
        });
    
        const page = await context.newPage();

        await page.goto("http://localhost:5173");
        await page.click('a.users-link');
        await expect(page).toHaveURL('http://localhost:5173/users');
    })

    test('should go to create users page when clicking Create', async () => {
        const context = await chromium.launchPersistentContext('', {
            headless: true,
            ignoreHTTPSErrors: true
        });
    
        const page = await context.newPage();
        
        await page.goto("http://localhost:5173");
        await page.click('a.users-link');
        await expect(page).toHaveURL('http://localhost:5173/users');
    })
    
});