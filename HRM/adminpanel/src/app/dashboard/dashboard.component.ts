import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    constructor(private authService: AuthService, private router: Router) { }
  
  
    logout() {
      // Remove token from local storage
      localStorage.removeItem('token');
      this.router.navigate(['/register']);
  
      // Display logout successful message
      console.log('Logout successful');
    }
   
  }