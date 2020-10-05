import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SalaryComponentsPage,
  /* SalaryDeleteDialog, */
  SalaryUpdatePage,
} from './salary.page-object';

const expect = chai.expect;

describe('Salary e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salaryComponentsPage: SalaryComponentsPage;
  let salaryUpdatePage: SalaryUpdatePage;
  /* let salaryDeleteDialog: SalaryDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Salaries', async () => {
    await navBarPage.goToEntity('salary');
    salaryComponentsPage = new SalaryComponentsPage();
    await browser.wait(ec.visibilityOf(salaryComponentsPage.title), 5000);
    expect(await salaryComponentsPage.getTitle()).to.eq('testDigLabApp.salary.home.title');
    await browser.wait(ec.or(ec.visibilityOf(salaryComponentsPage.entities), ec.visibilityOf(salaryComponentsPage.noResult)), 1000);
  });

  it('should load create Salary page', async () => {
    await salaryComponentsPage.clickOnCreateButton();
    salaryUpdatePage = new SalaryUpdatePage();
    expect(await salaryUpdatePage.getPageTitle()).to.eq('testDigLabApp.salary.home.createOrEditLabel');
    await salaryUpdatePage.cancel();
  });

  /* it('should create and save Salaries', async () => {
        const nbButtonsBeforeCreate = await salaryComponentsPage.countDeleteButtons();

        await salaryComponentsPage.clickOnCreateButton();

        await promise.all([
            salaryUpdatePage.setAmountInput('5'),
            salaryUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            salaryUpdatePage.setToDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            salaryUpdatePage.employeeSelectLastOption(),
        ]);

        expect(await salaryUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
        expect(await salaryUpdatePage.getFromDateInput()).to.contain('2001-01-01T02:30', 'Expected fromDate value to be equals to 2000-12-31');
        expect(await salaryUpdatePage.getToDateInput()).to.contain('2001-01-01T02:30', 'Expected toDate value to be equals to 2000-12-31');

        await salaryUpdatePage.save();
        expect(await salaryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await salaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Salary', async () => {
        const nbButtonsBeforeDelete = await salaryComponentsPage.countDeleteButtons();
        await salaryComponentsPage.clickOnLastDeleteButton();

        salaryDeleteDialog = new SalaryDeleteDialog();
        expect(await salaryDeleteDialog.getDialogTitle())
            .to.eq('testDigLabApp.salary.delete.question');
        await salaryDeleteDialog.clickOnConfirmButton();

        expect(await salaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
