import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { saveAs } from 'file-saver';
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

  selectedCategory: string = ''; // Holds the selected category
  categories: string[] = ['PREROLL', 'EDIBLE', 'FLOWER', 'CONCENTRATES', 'BEVERAGE', 'TINCTURES', 'ACCESSORIES'];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadCarouselImages();
  }

  // Load images from storage
  loadCarouselImages() {
    this.adminService.getCarouselImages().subscribe(response => {
      this.carouselImages = response.images.map(imgUrl => `${imgUrl}?v=${new Date().getTime()}`);
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
        if (response.imageUrl) {
          // Force browser to load the new image
          this.carouselImages[index] = `${response.imageUrl}?v=${new Date().getTime()}`;
        }

        // Reset the file selection states
        this.selectedImageFile[index] = undefined;
        this.selectedImageFileName[index] = undefined;
        this.uploadedImagePreviewUrl[index] = undefined;
        this.selectedIndex = null;
      });
}

  

  /** Retrieve data based on selected filter */
  fetchData() {
    this.searchPerformed = true;

    this.adminService.getUserData().subscribe(
      (data) => {
        this.exportToCSV(data);
      },
      (error) => {
        console.error('Error fetching admin data:', error);
      }
    );

    // if (this.selectedFilter === 'users') {
    //   this.getAllUsers();
    //   this.tableColumns = ['id', 'name', 'email', 'phone', 'dob', 'alleaves_customer_id', 'points', 'role', 'created_at'];
    // } else if (this.selectedFilter === 'orders') {
    //   this.getOrdersByDateRange();
    //   this.tableColumns = [
    //     'id', 'user_id', 'pos_order_id', 'points_add', 'points_redeem', 
    //     'points_locked', 'total_amount', 'points_awarded', 'complete', 'created_at'
    //   ];
    // }
  }

  fetchOrdersByEmployees() {
    this.searchPerformed = true;
  
    this.adminService.getOrdersByEmployeesData().subscribe(
      (data) => {
        this.exportToCSV(data);
      },
      (error) => {
        console.error('Error fetching orders by employees:', error);
      }
    );
  
  }
  
  fetchOrders() {
    this.searchPerformed = true;
  
    this.adminService.getOrdersData().subscribe(
      (data) => {
        this.exportToCSV(data);
      },
      (error) => {
        console.error('Error fetching orders by employees:', error);
      }
    );
  
  }
  

  /** Retrieve all users */
  // private getAllUsers() {
  //   this.adminService.getUsers().subscribe(
  //     (users) => {
  //       console.log(users)
  //       this.data = users.map(user => ({
  //         id: user.id,
  //         name: `${user.fname} ${user.lname}`,
  //         email: user.email,
  //         phone: user.phone,
  //         dob: user.dob,
  //         alleaves_customer_id: user.alleaves_customer_id,
  //         points: user.points,
  //         role: user.role,
  //         created_at: user.createdAt
  //       }));
  //     },
  //     (error) => {
  //       console.error('Error fetching users:', error);
  //       this.data = [];
  //     }
  //   );
  // }
  

  /** Retrieve all orders within a date range */
  // private getOrdersByDateRange() {
  //   let queryParams = '';

  //   // Construct query params only if both dates are selected
  //   if (this.startDate && this.endDate) {
  //     queryParams = `?startDate=${this.startDate}&endDate=${this.endDate}`;
  //   }

  //   this.adminService.getOrdersByDateRange(queryParams).subscribe(
  //     (orders) => {
  //       console.log(orders); // Debugging


  //       this.data = orders.map(order => ({
  //         id: order.id,
  //         user_id: order.user_id,
  //         pos_order_id: order.pos_order_id,
  //         points_add: order.points_add,
  //         points_redeem: order.points_redeem,
  //         points_locked: order.points_locked,
  //         total_amount: order.total_amount,
  //         points_awarded: order.points_awarded ? 'Yes' : 'No',
  //         complete: order.complete ? 'Yes' : 'No',
  //         created_at: new Date(order.createdAt).toLocaleString(),
  //       }));
  //     },
  //     (error) => {
  //       console.error('Error fetching orders:', error);
  //       this.data = [];
  //     }
  //   );
  // }

  exportToCSV(data: any[]) {
    if (data.length === 0) {
      console.warn('No data to export');
      return;
    }
  
    let headers: string[] = [];
    let csvRows: string[][] = [];
  
    // Detect the data type by checking key properties
    if (data[0].id !== undefined && data[0].email !== undefined && data[0].role !== undefined) {
      // Case 1: Exporting Users (No Orders)
      headers = [
        'User ID', 'First Name', 'Last Name', 'Email', 'DOB', 'Country', 'Phone',
        'Points', 'Account Created', 'Customer ID', 'Role'
      ];
  
      csvRows = data.map((user: any) => [
        user.id, user.fname, user.lname, user.email, user.dob, user.country, user.phone,
        user.points, user.createdAt, user.alleaves_customer_id, user.role
      ]);
  
    } else if (data[0].Employee !== undefined) {
      // Case 2: Exporting Orders by Employees
      headers = [
        'Employee ID', 'Employee Name', 'Employee Email', 'Employee Role',
        'Order ID', 'POS Order ID', 'Points Added', 'Points Redeemed', 
        'Order Complete', 'Points Awarded', 'Points Locked', 'Total Amount', 'Order Created At'
      ];
  
      csvRows = data.map(order => [
        order.Employee?.id || '', `${order.Employee?.fname || ''} ${order.Employee?.lname || ''}`,
        order.Employee?.email || '', order.Employee?.role || '', order.id, order.pos_order_id, order.points_add, order.points_redeem,
        order.complete ? 'Yes' : 'No', order.points_awarded ? 'Yes' : 'No',
        order.points_locked, order.total_amount, order.createdAt
      ]);
  
    } else if (data[0].user_id !== undefined && data[0].pos_order_id !== undefined) {
      // Case 3: Exporting General Orders (Not Employee-specific)
      headers = [
        'Order ID', 'User ID', 'POS Order ID', 'Points Added', 'Points Redeemed', 
        'Order Complete', 'Points Awarded', 'Points Locked', 'Total Amount', 'Order Created At',
      ];
  
      csvRows = data.map(order => [
        order.id, order.user_id, order.pos_order_id, order.points_add, order.points_redeem,
        order.complete ? 'Yes' : 'No', order.points_awarded ? 'Yes' : 'No',
        order.points_locked, order.total_amount, order.createdAt
      ]);
    } else {
      console.warn('Unknown data structure, cannot export.');
      return;
    }
  
    // Convert to CSV format
    const csvContent = [
      headers.join(','), // Add header row
      ...csvRows.map(row => row.map(value => `"${value}"`).join(',')) // Add data rows
    ].join('\n');
  
    // Create and trigger CSV download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `exported_data.csv`);
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
    if (!this.title || !this.body) {
      console.error('Title and body are required!');
      return;
    }

    if (this.selectedCategory) {
      // Send to a specific category group
      this.adminService.sendPushNotificationToCategory(this.title, this.body, this.selectedCategory, this.imageUrl)
        .subscribe({
          next: (response) => {
            console.log('Category notification sent:', response);
          },
          error: (error) => {
            console.error('Error sending category notification:', error);
          }
        });
    } else {
      // Send to all users
      this.adminService.sendPushNotificationToAll(this.title, this.body, this.imageUrl)
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
}
