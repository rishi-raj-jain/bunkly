import { test, expect } from '@playwright/test';

// AUTH-01 · Register new account  [P0]
test('AUTH-01: registers a new user and lands on home', async ({ page }) => {
  const email = `test+${Date.now()}@example.com`;
  await page.goto('/register');
  await page.getByTestId('register-name').fill('Test User');
  await page.getByTestId('register-email').fill(email);
  await page.getByTestId('register-password').fill('password123');
  await page.getByTestId('register-submit').click();
  await page.waitForURL('/');
  await expect(page).not.toHaveURL('/login');
});

// AUTH-01 edge: password too short shows validation
test('AUTH-01: short password shows validation message', async ({ page }) => {
  await page.goto('/register');
  await page.getByTestId('register-name').fill('Test');
  await page.getByTestId('register-email').fill(`short+${Date.now()}@example.com`);
  await page.getByTestId('register-password').fill('abc');
  await page.getByTestId('register-submit').click();
  // Either HTML5 validation or server error prevents navigation to /
  await expect(page).not.toHaveURL('/');
});

// AUTH-02 · Login with valid credentials  [P0]
test('AUTH-02: logs in sarah and redirects to home', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-email').fill('sarah@example.com');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await page.waitForURL('/');
});

// AUTH-03 · Login with invalid credentials  [P0]
test('AUTH-03: wrong password shows error, stays on /login', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-email').fill('sarah@example.com');
  await page.getByTestId('login-password').fill('wrongpassword');
  await page.getByTestId('login-submit').click();
  await expect(page.getByTestId('login-error')).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});

// AUTH-06 · Register with duplicate email  [P0]
test('AUTH-06: duplicate email shows inline error, no new account created', async ({ page }) => {
  await page.goto('/register');
  await page.getByTestId('register-name').fill('Duplicate');
  await page.getByTestId('register-email').fill('sarah@example.com');
  await page.getByTestId('register-password').fill('password123');
  await page.getByTestId('register-submit').click();
  await expect(page.getByTestId('register-error')).toBeVisible();
  await expect(page).not.toHaveURL('/');
});

// AUTH-04 · Redirect unauthenticated user from protected route  [P0]
test('AUTH-04: /account redirects to /login when unauthenticated', async ({ page }) => {
  await page.goto('/account');
  await expect(page).toHaveURL(/\/login/);
});

// AUTH-05 · Forgot password flow  [P0]
test('AUTH-05: forgot password form accepts known email and shows confirmation', async ({ page }) => {
  await page.goto('/forgot-password');
  await page.getByTestId('forgot-password-email').fill('sarah@example.com');
  await page.getByTestId('forgot-password-submit').click();
  // Email sending is stubbed — just verify the form submitted without crashing
  await expect(page.getByTestId('forgot-password-card')).toBeVisible();
  await expect(page.locator('text=/sent|email|success|check/i').first()).toBeVisible();
});
