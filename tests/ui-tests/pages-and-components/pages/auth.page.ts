import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { PageRoutes } from '../../pageRoutes';
import { WorkspacePage } from './workspace.page';

export class AuthPage extends BasePage {
  page: Page;
  route: Exclude<keyof typeof PageRoutes, 'prototype'>;
  emailInput: Locator;
  passwordInput: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.route = 'auth';
    this.emailInput = this.page.locator('input[id="loginForm_email"]');
    this.passwordInput = this.page.locator('input[id="loginForm_password"]');
    this.loginBtn = this.page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    // @ts-ignore
    await super.goToPageURL(PageRoutes[this.route]);
  }

  async loadedPage() {
    await super.loadedElementOfPage(this.loginBtn);
  }

  async loginAndGoToWorkspace(user, userPage) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    const workspacePage = new WorkspacePage(userPage);
    await this.loginBtn.click();
    await workspacePage.fullyLoadedPage();
    return workspacePage;
  }
}
