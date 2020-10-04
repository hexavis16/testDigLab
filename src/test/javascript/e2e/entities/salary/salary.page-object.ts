import { element, by, ElementFinder } from 'protractor';

export class SalaryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-salary div table .btn-danger'));
  title = element.all(by.css('jhi-salary div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SalaryUpdatePage {
  pageTitle = element(by.id('jhi-salary-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  amountInput = element(by.id('field_amount'));
  fromDateInput = element(by.id('field_fromDate'));
  toDateInput = element(by.id('field_toDate'));

  employeeSelect = element(by.id('field_employee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getAttribute('value');
  }

  async setFromDateInput(fromDate: string): Promise<void> {
    await this.fromDateInput.sendKeys(fromDate);
  }

  async getFromDateInput(): Promise<string> {
    return await this.fromDateInput.getAttribute('value');
  }

  async setToDateInput(toDate: string): Promise<void> {
    await this.toDateInput.sendKeys(toDate);
  }

  async getToDateInput(): Promise<string> {
    return await this.toDateInput.getAttribute('value');
  }

  async employeeSelectLastOption(): Promise<void> {
    await this.employeeSelect.all(by.tagName('option')).last().click();
  }

  async employeeSelectOption(option: string): Promise<void> {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect(): ElementFinder {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption(): Promise<string> {
    return await this.employeeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SalaryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-salary-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-salary'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
