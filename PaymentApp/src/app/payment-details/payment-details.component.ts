import { Component,OnInit } from '@angular/core';
import { PaymentDetailFormComponent } from "./payment-detail-form/payment-detail-form.component";
import { PaymentDetailService } from '../shared/payment-detail.service';
import { NgFor } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  imports: [PaymentDetailFormComponent,NgFor,],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) { 
    this.service.refreshList();
     
  }

  ngOnInit() :void 
  {
   this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (!confirm('Are you sure you want to delete this payment detail?')) {
      return;
    } 

    this.service.deletePaymentDetail(id).subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];
        this.toastr.error('Payment detail Deleted successfully', 'Deleted');

        this.service.refreshList();
      },
      error: err => {
        console.error('Error submitting payment detail:', err);
      }
    });
  }
}
