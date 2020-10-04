import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TitleComponentsPage, TitleDeleteDialog, TitleUpdatePage } from './title.page-object';

const expect = chai.expect;

describe('Title e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let titleComponentsPage: TitleComponentsPage;
  let titleUpdatePage: TitleUpdatePage;
  let titleDeleteDialog: TitleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Titles', async () => {
    await navBarPage.goToEntity('title');
    titleComponentsPage = new TitleComponentsPage();
    await browser.wait(ec.visibilityOf(titleComponentsPage.title), 5000);
    expect(await titleComponentsPage.getTitle()).to.eq('testDigLabApp.title.home.title');
    await browser.wait(ec.or(ec.visibilityOf(titleComponentsPage.entities), ec.visibilityOf(titleComponentsPage.noResult)), 1000);
  });

  it('should load create Title page', async () => {
    await titleComponentsPage.clickOnCreateButton();
    titleUpdatePage = new TitleUpdatePage();
    expect(await titleUpdatePage.getPageTitle()).to.eq('testDigLabApp.title.home.createOrEditLabel');
    await titleUpdatePage.cancel();
  });

  it('should create and save Titles', async () => {
    const nbButtonsBeforeCreate = await titleComponentsPage.countDeleteButtons();

    await titleComponentsPage.clickOnCreateButton();

    await promise.all([
      titleUpdatePage.setTitleInput('title'),
      titleUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      titleUpdatePage.setToDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      titleUpdatePage.employeeSelectLastOption(),
    ]);

    expect(await titleUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await titleUpdatePage.getFromDateInput()).to.contain('2001-01-01T02:30', 'Expected fromDate value to be equals to 2000-12-31');
    expect(await titleUpdatePage.getToDateInput()).to.contain('2001-01-01T02:30', 'Expected toDate value to be equals to 2000-12-31');

    await titleUpdatePage.save();
    expect(await titleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await titleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Title', async () => {
    const nbButtonsBeforeDelete = await titleComponentsPage.countDeleteButtons();
    await titleComponentsPage.clickOnLastDeleteButton();

    titleDeleteDialog = new TitleDeleteDialog();
    expect(await titleDeleteDialog.getDialogTitle()).to.eq('testDigLabApp.title.delete.question');
    await titleDeleteDialog.clickOnConfirmButton();

    expect(await titleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
