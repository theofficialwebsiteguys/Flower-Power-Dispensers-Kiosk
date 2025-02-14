import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  searchQuery: string = '';
  selectedUser: any = null;
  maxPoints: number = 1000;
  showSignup = false;

  constructor(private employeeService: EmployeeService, private authService: AuthService) {}

  get progressPercentage(): number {
    return this.selectedUser ? (this.selectedUser.points / this.maxPoints) * 100 : 0;
  }

  get progressSteps(): number[] {
    return [0, 250, 500, 750, this.maxPoints];
  }

    onSearch() {
      const trimmedQuery = this.searchQuery.trim();
  
      if (trimmedQuery.length > 0) {
        if (this.isEmail(trimmedQuery)) {
          this.employeeService.getUserByEmail(trimmedQuery).subscribe(
            (user) => {
              this.selectedUser = user || null;
              this.employeeService.setSelectedUser(user); // ✅ Save the user globally
              this.authService.getUserOrders(user.id).then(() => {
                console.log("Orders refreshed.");
              });
            },
            (error) => {
              console.error('Error fetching user by email:', error);
              this.selectedUser = null;
            }
          );
        } else if (this.isPhone(trimmedQuery)) {
          this.employeeService.getUserByPhone(trimmedQuery).subscribe(
            (user) => {
              this.selectedUser = user || null;
              this.employeeService.setSelectedUser(user); // ✅ Save the user globally
              this.authService.getUserOrders(user.id).then(() => {
                console.log("Orders refreshed.");
              });
            },
            (error) => {
              console.error('Error fetching user by phone:', error);
              this.selectedUser = null;
            }
          );
        } else {
          console.warn('Invalid search format. Please enter a valid email or phone number.');
          this.selectedUser = null;
        }
      } else {
        this.selectedUser = null;
      }
    }

    toggleSignup() {
      this.showSignup = !this.showSignup; // Toggle form visibility
    }
  
    onClearSearch() {
      this.searchQuery = '';
      this.selectedUser = null;
      this.employeeService.clearSelectedUser(); // ✅ Clear globally stored user
    }
  
    private isEmail(query: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query);
    }
  
    private isPhone(query: string): boolean {
      return /^[0-9]{10,15}$/.test(query); // Adjust for different phone number formats if needed
    }
  }
  