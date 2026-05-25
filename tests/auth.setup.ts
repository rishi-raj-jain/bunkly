import { test as setup, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

setup('seed database and save sarah session', async ({ page }) => {
  execSync('npm run db:seed', {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
  });
  await page.goto('/login', { waitUntil: 'networkidle' });
  await page.getByTestId('login-email').fill('sarah@example.com');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();
  await page.waitForURL('/');
  await expect(page).not.toHaveURL('/login');
  await page.context().storageState({ path: authFile });
});
