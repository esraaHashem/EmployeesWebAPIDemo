import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result-message-dialog',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './result-message-dialog.component.html',
  styleUrl: './result-message-dialog.component.css'
})
export class ResultMessageDialogComponent {
  title: string;
  message: string;
  isSuccess: boolean;
  buttonText: string = 'OK';


  constructor(public dialogRef: MatDialogRef<ResultMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title?: string;
      message: string;
      isSuccess: boolean;
      buttonText?: string;
    } , 
    private router : Router
  ) {

    this.title = data.title || (data.isSuccess ? 'Success!' : 'Error');
    this.message = data.message;
    this.isSuccess = data.isSuccess;
    this.buttonText = data.buttonText || 'OK';

  }


  onClose(): void {
    this.dialogRef.close();
  
    
  }

}
