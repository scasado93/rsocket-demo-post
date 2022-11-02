import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotteryComponent } from './lottery/lottery.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lottery', component: LotteryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
