import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  imports: [FormsModule],
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {
constructor(public service: PaymentDetailService, private toastr: ToastrService) { }
  
  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) 
    {
      if(this.service.formData.paymentDetailId == 0) 
      {
        this.insertRecord(form);
      } 
      else 
      {
        this.updateRecord(form);
      }
    }

     
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.service.formData = new PaymentDetail();
    this.service.formSubmitted = false;
  }

  insertRecord(form: NgForm) {
 this.service.postPaymentDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];

        this.resetForm(form);

        this.toastr.success('Payment detail submitted successfully', 'Success');

        this.service.refreshList();
      },
      error: err => {
        console.error('Error submitting payment detail:', err);
      }
    });
       
  }
  updateRecord(form: NgForm) {
     this.service.putPaymentDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[];

        this.resetForm(form);

        this.toastr.info('Payment detail updated successfully', 'Updated');

        this.service.refreshList();
      },
      error: err => {
        console.error('Error submitting payment detail:', err);
      }
    });
  }

}
