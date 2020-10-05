import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-employee div table .btn-danger'));
  title = element.all(by.css('jhi-employee div h2#page-heading span')).first();
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

export class EmployeeUpdatePage {
  pageTitle = element(by.id('jhi-employee-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  namesInput = element(by.id('field_names'));
  lastNamesInput = element(by.id('field_lastNames'));
  genderInput = element(by.id('field_gender'));
  birthDateInput = element(by.id('field_birthDate'));
  hireDateInput = element(by.id('field_hireDate'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNamesInput(names: string): Promise<void> {
    await this.namesInput.sendKeys(names);
  }

  async getNamesInput(): Promise<string> {
    return await this.namesInput.getAttribute('value');
  }

  async setLastNamesInput(lastNames: string): Promise<void> {
    await this.lastNamesInput.sendKeys(lastNames);
  }

  async getLastNamesInput(): Promise<string> {
    return await this.lastNamesInput.getAttribute('value');
  }

  async setGenderInput(gender: string): Promise<void> {
    await this.genderInput.sendKeys(gender);
  }

  async getGenderInput(): Promise<string> {
    return await this.genderInput.getAttribute('value');
  }

  async setBirthDateInput(birthDate: string): Promise<void> {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput(): Promise<string> {
    return await this.birthDateInput.getAttribute('value');
  }

  async setHireDateInput(hireDate: string): Promise<void> {
    await this.hireDateInput.sendKeys(hireDate);
  }

  async getHireDateInput(): Promise<string> {
    return await this.hireDateInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async genderSelectLastOption(): Promise<void> {
    await this.genderInput.all(by.tagName('option')).last().click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EmployeeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-employee-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-employee'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
