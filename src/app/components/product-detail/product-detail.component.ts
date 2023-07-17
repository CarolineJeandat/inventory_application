import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetProductById(this.getId).subscribe((data: any) => {
      this.updateForm.setValue({
        name: data.data.name,
        price: data.data.price,
        quantity: data.data.quantity
      });
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      quantity: ['']
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.crudService.updateProduct(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/products-list'))
      }, (err) => {
        console.log(err);
    });
  }
  
}