import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, AlertController, IonCardHeader, IonItem, IonCard, IonCardTitle, IonCardContent, IonLabel, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonCardContent, IonCardTitle, IonCard, IonItem, IonCardHeader, FormsModule, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    public alertController: AlertController) {
    this.registerForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: (res) => {
          this.presentAlert('Register Successfully', 'Please login with your new username and password');
        }, error: (err) => {
          console.log(err);
        }
      });
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['login']);
        }
      }]
    });

    await alert.present();
  }

}
