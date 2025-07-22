import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonList, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, CommonModule, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, IonButtons, IonButton]
})
export class BookPage implements OnInit {

  books: Book[] | undefined;

  constructor(private bookService: BookService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.books = books;
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(res => {
        console.log(res);
        localStorage.removeItem('token');
        this.router.navigate(['home']);
      });
  }

}
