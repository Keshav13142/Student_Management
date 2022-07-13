import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AddMarksComponent } from './components/student/add-marks/add-marks.component';
import { TeacherApproveComponent } from './components/teacher/teacher-approve/teacher-approve.component';
import { StudentMarksComponent } from './components/student/student-marks/student-marks.component';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';
import { TeacherGuard } from './guard/teacher.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { AdminComponent } from './components/admin/admin-home/admin.component';
import { AdminAddUserComponent } from './components/admin/admin-add-user/admin-add-user.component';
import { AdminAuthorizeComponent } from './components/admin/admin-authorize/admin-authorize.component';
import { TestComponent } from './test/test/test.component';
import { ViewAllMarksComponent } from './components/teacher/view-all-marks/view-all-marks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: UserhomeComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'authorize',
        component: AdminAuthorizeComponent,
      },
      {
        path: 'addUser',
        component: AdminAddUserComponent,
      },
      {
        path: 'dashboard',
        component: AdminComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
    canActivate: [AdminGuard],
  },
  {
    path: 'student',
    component: UserhomeComponent,
    children: [
      {
        path: '',
        component: StudentMarksComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'marks',
        component: StudentMarksComponent,
      },
      {
        path: 'add',
        component: AddMarksComponent,
      },
    ],
    canActivate: [UserGuard],
  },
  {
    path: 'teacher',
    component: UserhomeComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'add',
        component: AddMarksComponent,
      },
      {
        path: 'allMarks',
        component: ViewAllMarksComponent,
      },
      {
        path: 'approve',
        component: TeacherApproveComponent,
      },
    ],
    canActivate: [TeacherGuard],
  },
  {
    path: 'test',
    component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
