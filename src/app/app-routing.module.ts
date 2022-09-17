import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { AddEmployeeComponent } from './employee-details/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-details/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './employee-details/update-employee/update-employee.component';
import { PointcloudComponent } from './pointcloud/pointcloud.component';
import { BrowserUtils } from '@azure/msal-browser';

const routes: Routes = [
  {
    path: 'home',
    component: EmployeeListComponent,
    canActivate: [MsalGuard],
  },

  {
    path: 'employee',
    component: AddEmployeeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'updateEmployee/:id',
    component: UpdateEmployeeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'pointcloud',
    component: PointcloudComponent,
    canActivate: [MsalGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
