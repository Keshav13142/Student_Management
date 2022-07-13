import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentMarksComponent } from './components/student/student-marks/student-marks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMarksComponent } from './components/student/add-marks/add-marks.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ViewMarksComponent } from './components/student/view-marks/view-marks.component';
import { ViewUserComponent } from './components/admin/view-user/view-user.component';
import { TeacherApproveComponent } from './components/teacher/teacher-approve/teacher-approve.component';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/admin/delete-user/delete-user.component';
import { ViewFileComponent } from './components/student/view-file/view-file.component';
import { AdminComponent } from './components/admin/admin-home/admin.component';
import { AdminAddUserComponent } from './components/admin/admin-add-user/admin-add-user.component';
import { AdminAuthorizeComponent } from './components/admin/admin-authorize/admin-authorize.component';
import { TeacherDeclineComponent } from './components/teacher/teacher-decline/teacher-decline.component';
import { TestComponent } from './test/test/test.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewAllMarksComponent } from './components/teacher/view-all-marks/view-all-marks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserhomeComponent,
    SidebarComponent,
    ProfileComponent,
    StudentMarksComponent,
    AddMarksComponent,
    ViewMarksComponent,
    AdminComponent,
    ViewUserComponent,
    TeacherApproveComponent,
    EditUserComponent,
    DeleteUserComponent,
    ViewFileComponent,
    AdminAddUserComponent,
    AdminAuthorizeComponent,
    TeacherDeclineComponent,
    TestComponent,
    ViewAllMarksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    NgxUiLoaderModule,
    MatGridListModule,
    ReactiveFormsModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
    MatSelectModule,
    Ng2SearchPipeModule,
    MatRadioModule,
  ],
  providers: [
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserhomeComponent,
    SidebarComponent,
    ProfileComponent,
    StudentMarksComponent,
    AddMarksComponent,
    ViewMarksComponent,
    AdminComponent,
    ViewUserComponent,
    TeacherApproveComponent,
    EditUserComponent,
    DeleteUserComponent,
    ViewFileComponent,
    AdminAddUserComponent,
    AdminAuthorizeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
