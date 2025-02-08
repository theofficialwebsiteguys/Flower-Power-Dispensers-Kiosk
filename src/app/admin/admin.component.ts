import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  searchPerformed: boolean = false;
  data: any[] = [];
  selectedItem: any = null;
  selectedFilter: string = 'users';
  tableColumns: string[] = [];

  startDate: string = '';
  endDate: string = '';

  title: string = '';
  body: string = '';
  imageUrl: string = '';

  selectedFileName: string | null = null;

  slideOpts = {
    slidesPerView: 1, // Show one image at a time
    spaceBetween: 10, // Add spacing between slides
    centeredSlides: true,
    loop: true, // Enable infinite loop
    autoplay: {
      delay: 3000, // Auto-play every 3 seconds
      disableOnInteraction: false
    }
  };
  
  carouselImages: string[] = []; // Holds carousel image URLs
  expandedIndex: number | null = null; // Tracks which image dropdown is open
  selectedIndex: number | null = null; // Stores the index of the selected image
  selectedImageFile: (File | undefined)[] = []; // ✅ Allows undefined values
  selectedImageFileName: (string | undefined)[] = []; // ✅ Allows undefined values
  uploadedImagePreviewUrl: (string | undefined)[] = []; // ✅ Allows undefined values

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadCarouselImages();
  }

  // Load images from storage
  loadCarouselImages() {
    this.adminService.getCarouselImages().subscribe(response => {
      this.carouselImages = response.images;
    });
  }

   // Toggle dropdown for banner images (only one open at a time)
   toggleDropdown(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
  
  // Select which image to replace
  // selectImageToReplace(index: number) {
  //   this.selectedIndex = index;
  //   this.selectedImagePreview = this.carouselImages[index]; // Show the current image before replacing
  // }


  onImageFileSelected(event: any, index: number) {
    const file = event.target.files[0];

    if (file) {
      this.selectedImageFile[index] = file;
      this.selectedImageFileName[index] = file.name;

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImagePreviewUrl[index] = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Set selected index
      this.selectedIndex = index;
    }
  }

  replaceImage(index: number) {
    if (!this.selectedImageFile[index]) return;

    this.adminService.replaceCarouselImage(this.selectedImageFile[index]!, index)
      .subscribe(response => {
        // Update the carousel with the new image URL
        this.carouselImages[index] = response.imageUrl;
        this.selectedImageFile[index] = undefined; // ✅ Set to undefined instead of null
        this.selectedImageFileName[index] = undefined; // ✅ Set to undefined instead of null
        this.uploadedImagePreviewUrl[index] = undefined; // ✅ Set to undefined instead of null
        this.selectedIndex = null;
      });
  }
  

  /** Retrieve data based on selected filter */
  fetchData() {
    this.searchPerformed = true;
    
    if (this.selectedFilter === 'users') {
      this.getAllUsers();
      this.tableColumns = ['ID', 'Name', 'Email', 'Phone', 'DOB', 'alleaves_customer_id', 'Points', 'Role', 'created_at'];
    } else if (this.selectedFilter === 'orders') {
      this.getOrdersByDateRange();
      this.tableColumns = [
        'ID', 'user_id', 'pos_order_id', 'points_add', 'points_redeem', 
        'points_locked', 'total_amount', 'points_awarded', 'complete', 'created_at'
      ];
    }
  }

  /** Retrieve all users */
  private getAllUsers() {
    this.adminService.getUsers().subscribe(
      (users) => {
        console.log(users)
        this.data = users.map(user => ({
          id: user.id,
          name: `${user.fname} ${user.lname}`,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          alleaves_customer_id: user.alleaves_customer_id,
          points: user.points,
          role: user.role,
          created_at: user.createdAt
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.data = [];
      }
    );
  }

  /** Retrieve all orders within a date range */
  private getOrdersByDateRange() {
    let queryParams = '';

    // Construct query params only if both dates are selected
    if (this.startDate && this.endDate) {
      queryParams = `?startDate=${this.startDate}&endDate=${this.endDate}`;
    }

    this.adminService.getOrdersByDateRange(queryParams).subscribe(
      (orders) => {
        console.log(orders); // Debugging


        this.data = orders.map(order => ({
          id: order.id,
          user_id: order.user_id,
          pos_order_id: order.pos_order_id,
          points_add: order.points_add,
          points_redeem: order.points_redeem,
          points_locked: order.points_locked,
          total_amount: order.total_amount,
          points_awarded: order.points_awarded ? 'Yes' : 'No',
          complete: order.complete ? 'Yes' : 'No',
          created_at: new Date(order.createdAt).toLocaleString(),
        }));
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.data = [];
      }
    );
  }

  clearNotificationForm() {
    this.title = '';
    this.body = '';
    this.imageUrl = '';
    this.selectedFileName = null;
  
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clears file input
    }
  }
  

  clearDates() {
    this.startDate = '';
    this.endDate = '';
  }
  

  clearQuery() {
    this.searchPerformed = false;
    this.data = [];
    this.selectedItem = null;
    this.startDate = '';
    this.endDate = '';
    this.tableColumns = [];
  }

  /** Open detailed view of a selected item */
  openDetail(item: any) {
    this.selectedItem = item;
  }

  /** Close the detail view */
  closeDetail() {
    this.selectedItem = null;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    console.log(file)

    if (file) {
      this.adminService.uploadImage(file).subscribe({
        next: (response) => {
          this.imageUrl = response.imageUrl; // Get public URL from backend
          console.log('Image uploaded, public URL:', this.imageUrl);
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    }
  }

  sendNotification() {
    this.adminService.sendPushNotification(this.title, this.body, this.imageUrl)
      .subscribe({
        next: (response) => {
          console.log('Notification sent:', response);
        },
        error: (error) => {
          console.error('Error sending notification:', error);
        }
      });
  }
}
