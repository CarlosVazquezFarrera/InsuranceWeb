import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import json from './registro.json';
import { ErrorMessageHandle } from '@shared/utils/error-message-handle';
import { onlyNumbers } from '@shared/validators/only-numbers';
import { PersonDTO } from '@models/DTOs/personDTO';
import { InsuranceStore } from '@components/store/insurance.store';
import { ModalService } from '@services/modal.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, MatButtonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  constructor() {
    ErrorMessageHandle(this.companyName, this.companyNameError, json.errors.companyName);
    ErrorMessageHandle(this.contactName, this.contactNameError, json.errors.contactName);
    ErrorMessageHandle(this.email, this.emailError, json.errors.email);
    ErrorMessageHandle(this.phone, this.phoneError, json.errors.phone);
    
  }


  
  //#region Properties

  private fb = inject(FormBuilder);
  public store = inject(InsuranceStore);
  private modalService = inject(ModalService);
  public form = this.fb.group({
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    contactName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(2), Validators.email]],
    phone: ['', [Validators.required, onlyNumbers(), Validators.minLength(10)]],
  });
  
  public accepted = this.fb.control(false);

  public companyNameError = signal(json.errors.companyName.required);
  public contactNameError = signal(json.errors.contactName.required);
  public emailError = signal(json.errors.email.required);
  public phoneError = signal(json.errors.phone.required);

  private control(name: string): AbstractControl {
    return this.form.get(name)!;
  }

  public async save() {
    if (this.form.invalid) return;
    await this.store.addPerson(this.person);
    await  await lastValueFrom(this.modalService.openModal('person_info').afterClosed());

  }

  //#endregion

  //#region Getters
  public get companyName(): AbstractControl {
    return this.control('companyName');
  }
  public get contactName(): AbstractControl {
    return this.control('contactName');
  }
  public get email(): AbstractControl {
    return this.control('email');
  }
  public get phone(): AbstractControl {
    return this.control('phone');
  }

  private get person(): PersonDTO {
    const person: PersonDTO = {
      companyname: this.companyName.value,
      contactname: this.contactName.value,
      email: this.email.value,
      phone: this.phone.value
    }
    return person;
  }
  //#endregion
}
