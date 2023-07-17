import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.productForm = this.formBuilder.group({
      name: [''],
      price: [''],
      quantity: [''],
    });
  }

  ngOnInit() {}

  onSubmit(): any {
    this.crudService.AddProduct(this.productForm.value).subscribe(
      (res: any) => {
        console.log('Data added successfully!' + res);
        this.ngZone.run(() => this.router.navigateByUrl('/products-list'));
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
}