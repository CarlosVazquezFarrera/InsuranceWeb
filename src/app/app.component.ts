import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from '@shared/components/banner/banner.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InsuranceStore } from '@components/store/insurance.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BannerComponent, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'insuranceWeb';

  public store = inject(InsuranceStore)
}
