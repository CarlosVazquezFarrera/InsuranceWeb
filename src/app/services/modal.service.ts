import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalsKeys } from '@shared/keys/modal-keys';
import { PersonInfoComponent } from '@modals/person-info/person-info.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private dialog: MatDialog = inject(MatDialog)
  private modals: Array<MatDialogRef<unknown>> = new Array<MatDialogRef<unknown>>();

  private config: MatDialogConfig = {
    disableClose: true,
  }

  public openModal(modal: ModalsKeys): MatDialogRef<unknown, unknown> {
    switch (modal) {
      case 'person_info':
        return this.open(PersonInfoComponent);
    }
  }

  private open(componente: ComponentType<unknown>): MatDialogRef<unknown, unknown>{

    const dialog = this.dialog.open(componente, this.config);
    dialog.afterClosed();
    this.modals.push(dialog);
    return dialog;
  }

  public closeModal(): void {
    const modal = this.modals.pop();
    if (modal)
      modal.close();
  }
}
