import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeeComponentsPage, EmployeeDeleteDialog, EmployeeUpdatePage } from './employee.page-object';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeComponentsPage: EmployeeComponentsPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  let employeeDeleteDialog: EmployeeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Employees', async () => {
    await navBarPage.goToEntity('employee');
    employeeComponentsPage = new EmployeeComponentsPage();
    await browser.wait(ec.visibilityOf(employeeComponentsPage.title), 5000);
    expect(await employeeComponentsPage.getTitle()).to.eq('testDigLabApp.employee.home.title');
    await browser.wait(ec.or(ec.visibilityOf(employeeComponentsPage.entities), ec.visibilityOf(employeeComponentsPage.noResult)), 1000);
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.clickOnCreateButton();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle()).to.eq('testDigLabApp.employee.home.createOrEditLabel');
    await employeeUpdatePage.cancel();
  });

  it('should create and save Employees', async () => {
    const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();

    await employeeComponentsPage.clickOnCreateButton();

    await promise.all([
      employeeUpdatePage.setNamesInput('names'),
      employeeUpdatePage.setLastNamesInput('lastNames'),
      employeeUpdatePage.setGenderInput('gender'),
      employeeUpdatePage.setBirthDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      employeeUpdatePage.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await employeeUpdatePage.getNamesInput()).to.eq('names', 'Expected Names value to be equals to names');
    expect(await employeeUpdatePage.getLastNamesInput()).to.eq('lastNames', 'Expected LastNames value to be equals to lastNames');
    expect(await employeeUpdatePage.getGenderInput()).to.eq('gender', 'Expected Gender value to be equals to gender');
    expect(await employeeUpdatePage.getBirthDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected birthDate value to be equals to 2000-12-31'
    );
    expect(await employeeUpdatePage.getHireDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected hireDate value to be equals to 2000-12-31'
    );

    await employeeUpdatePage.save();
    expect(await employeeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Employee', async () => {
    const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
    await employeeComponentsPage.clickOnLastDeleteButton();

    employeeDeleteDialog = new EmployeeDeleteDialog();
    expect(await employeeDeleteDialog.getDialogTitle()).to.eq('testDigLabApp.employee.delete.question');
    await employeeDeleteDialog.clickOnConfirmButton();

    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
