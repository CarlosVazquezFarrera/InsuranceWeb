import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { InsuranceStore } from '@components/store/insurance.store';
import { AppRoutes } from '@routes/AppRoues';

@Component({
  selector: 'app-registros',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.scss'
})
export class RegistrosComponent implements OnInit {
  displayedColumns: string[] = ['companyname', 'contactname', 'email', 'phone'];
  public store = inject(InsuranceStore);
  private router = inject(Router)


  ngOnInit(): void {
    this.store.getPeople();
  }

  public goBack(): void {
    this.router.navigateByUrl(AppRoutes.registro);
  }
  

}
