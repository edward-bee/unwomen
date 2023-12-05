









import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../../Service/user.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  imgSrc: string | ArrayBuffer | null = 'https://andysw90.files.wordpress.com/2023/02/profile_avatar_placeholder_large.png';
  user: any = {};
  selectedFile: File | undefined;
  isLoading: boolean = false;
  loadingMessage = 'Creating your Account .....';
  countries: any[] = [];


  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
    this.fileInput = {} as ElementRef
  }
  hasError(field: NgModel, errorName: string): boolean {
    return field.hasError(errorName);
  }

  isPasswordValid(field: NgModel): boolean {
    const valid =
      !this.hasError(field, 'required') &&
      !this.hasError(field, 'minlength') &&
      !this.hasError(field, 'pattern');
    console.log('Is Password Valid:', valid);
    return valid;
  }

  // onFileSelected(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.selectedFile = inputElement.files?.[0];
  // }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    const maxSize = 4.5 * 1024 * 1024; // 5MB maximum size
  
    if (selectedFile && selectedFile.size <= maxSize) {
      this.selectedFile = selectedFile;
  
      // Read the selected image as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target?.result as string;
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile) {
      alert('Please select an image that is less than 5MB in size.');
      inputElement.value = '';
    }
  }
  
  fetchCountries() {
    const apiUrl = 'https://restcountries.com/v2/all';
    this.http.get(apiUrl).subscribe(
      (data: any) => {  // Change from any[] to any
        this.countries = Array.isArray(data) ? data : [];  // Ensure it's an array or provide a default value
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
  
  

  onSubmit(): void {
    this.isLoading = true;
    this.loadingMessage = 'Creating your Account .....';
    if (!this.selectedFile) {
      return;
    }
    this.userService
      .createUser(this.user, this.selectedFile)
      .subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
        this.loadingMessage = '';
      });
  }

  ngOnInit() {
    this.fetchCountries();
  }
  
}
