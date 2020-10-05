import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DepartmentManagerComponentsPage,
  /* DepartmentManagerDeleteDialog, */
  DepartmentManagerUpdatePage,
} from './department-manager.page-object';

const expect = chai.expect;

describe('DepartmentManager e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departmentManagerComponentsPage: DepartmentManagerComponentsPage;
  let departmentManagerUpdatePage: DepartmentManagerUpdatePage;
  /* let departmentManagerDeleteDialog: DepartmentManagerDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DepartmentManagers', async () => {
    await navBarPage.goToEntity('department-manager');
    departmentManagerComponentsPage = new DepartmentManagerComponentsPage();
    await browser.wait(ec.visibilityOf(departmentManagerComponentsPage.title), 5000);
    expect(await departmentManagerComponentsPage.getTitle()).to.eq('testDigLabApp.departmentManager.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(departmentManagerComponentsPage.entities), ec.visibilityOf(departmentManagerComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DepartmentManager page', async () => {
    await departmentManagerComponentsPage.clickOnCreateButton();
    departmentManagerUpdatePage = new DepartmentManagerUpdatePage();
    expect(await departmentManagerUpdatePage.getPageTitle()).to.eq('testDigLabApp.departmentManager.home.createOrEditLabel');
    await departmentManagerUpdatePage.cancel();
  });

  /* it('should create and save DepartmentManagers', async () => {
        const nbButtonsBeforeCreate = await departmentManagerComponentsPage.countDeleteButtons();

        await departmentManagerComponentsPage.clickOnCreateButton();

        await promise.all([
            departmentManagerUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            departmentManagerUpdatePage.setToDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            departmentManagerUpdatePage.employeeSelectLastOption(),
            departmentManagerUpdatePage.departmentSelectLastOption(),
        ]);

        expect(await departmentManagerUpdatePage.getFromDateInput()).to.contain('2001-01-01T02:30', 'Expected fromDate value to be equals to 2000-12-31');
        expect(await departmentManagerUpdatePage.getToDateInput()).to.contain('2001-01-01T02:30', 'Expected toDate value to be equals to 2000-12-31');

        await departmentManagerUpdatePage.save();
        expect(await departmentManagerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await departmentManagerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last DepartmentManager', async () => {
        const nbButtonsBeforeDelete = await departmentManagerComponentsPage.countDeleteButtons();
        await departmentManagerComponentsPage.clickOnLastDeleteButton();

        departmentManagerDeleteDialog = new DepartmentManagerDeleteDialog();
        expect(await departmentManagerDeleteDialog.getDialogTitle())
            .to.eq('testDigLabApp.departmentManager.delete.question');
        await departmentManagerDeleteDialog.clickOnConfirmButton();

        expect(await departmentManagerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
