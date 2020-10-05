import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DepartmentEmployeeComponentsPage,
  /* DepartmentEmployeeDeleteDialog, */
  DepartmentEmployeeUpdatePage,
} from './department-employee.page-object';

const expect = chai.expect;

describe('DepartmentEmployee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departmentEmployeeComponentsPage: DepartmentEmployeeComponentsPage;
  let departmentEmployeeUpdatePage: DepartmentEmployeeUpdatePage;
  /* let departmentEmployeeDeleteDialog: DepartmentEmployeeDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DepartmentEmployees', async () => {
    await navBarPage.goToEntity('department-employee');
    departmentEmployeeComponentsPage = new DepartmentEmployeeComponentsPage();
    await browser.wait(ec.visibilityOf(departmentEmployeeComponentsPage.title), 5000);
    expect(await departmentEmployeeComponentsPage.getTitle()).to.eq('testDigLabApp.departmentEmployee.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(departmentEmployeeComponentsPage.entities), ec.visibilityOf(departmentEmployeeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DepartmentEmployee page', async () => {
    await departmentEmployeeComponentsPage.clickOnCreateButton();
    departmentEmployeeUpdatePage = new DepartmentEmployeeUpdatePage();
    expect(await departmentEmployeeUpdatePage.getPageTitle()).to.eq('testDigLabApp.departmentEmployee.home.createOrEditLabel');
    await departmentEmployeeUpdatePage.cancel();
  });

  /* it('should create and save DepartmentEmployees', async () => {
        const nbButtonsBeforeCreate = await departmentEmployeeComponentsPage.countDeleteButtons();

        await departmentEmployeeComponentsPage.clickOnCreateButton();

        await promise.all([
            departmentEmployeeUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            departmentEmployeeUpdatePage.setToDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            departmentEmployeeUpdatePage.employeeSelectLastOption(),
            departmentEmployeeUpdatePage.departmentSelectLastOption(),
        ]);

        expect(await departmentEmployeeUpdatePage.getFromDateInput()).to.contain('2001-01-01T02:30', 'Expected fromDate value to be equals to 2000-12-31');
        expect(await departmentEmployeeUpdatePage.getToDateInput()).to.contain('2001-01-01T02:30', 'Expected toDate value to be equals to 2000-12-31');

        await departmentEmployeeUpdatePage.save();
        expect(await departmentEmployeeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await departmentEmployeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last DepartmentEmployee', async () => {
        const nbButtonsBeforeDelete = await departmentEmployeeComponentsPage.countDeleteButtons();
        await departmentEmployeeComponentsPage.clickOnLastDeleteButton();

        departmentEmployeeDeleteDialog = new DepartmentEmployeeDeleteDialog();
        expect(await departmentEmployeeDeleteDialog.getDialogTitle())
            .to.eq('testDigLabApp.departmentEmployee.delete.question');
        await departmentEmployeeDeleteDialog.clickOnConfirmButton();

        expect(await departmentEmployeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
