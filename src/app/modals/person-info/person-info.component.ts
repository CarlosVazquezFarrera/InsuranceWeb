import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InsuranceStore } from '@components/store/insurance.store';
import { AppRoutes } from '@routes/AppRoues';

@Component({
  selector: 'app-person-info',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './person-info.component.html',
  styleUrl: './person-info.component.scss'
})
export class PersonInfoComponent {
  public store = inject(InsuranceStore);
  private router = inject(Router);

  public goToTable() {
    this.router.navigateByUrl(AppRoutes.registros);
  }

}
