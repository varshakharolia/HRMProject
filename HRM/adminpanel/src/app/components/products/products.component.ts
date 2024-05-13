import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap'; 
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'] 
})
export class ProductsComponent implements OnInit {
  productForm!: FormGroup;
  productList: any = [];

  constructor(
    private _product:ProductService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getProducts();
  }

  setForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''), 
      productQnty: new FormControl(''), 
      productRate: new FormControl(''),
    })
  }

  submit() {

    this._product.addNewProduct(this.productForm.value).subscribe({next:(resp)=>{
      console.log(resp);
      this.closeModal('addProductModal');
      this.productForm.reset();
    },
    error:(err)=>{
      console.log(err);
    }})

    console.log(this.productForm.value);
    this.productList.push(this.productForm.value);
    //console.log("Product List:", this.productList);
  }
index:any;
openModal(modalId:any,index:any){
  if(modalId=='updateProductModal'){
    const item = this.productList.find((item: { _id: any; })=> item._id==index);
    if(item){
      this.productForm.patchValue({
        productId: item.productId,
        productName: item.productName,
        productQnty: item.productQnty,
        productRate: item.productRate,
      });
    } else {
      console.error('Product not found');
    }
   
  }
  console.log(index);
  this.index=index;

  const modalElement:any = document.getElementById(modalId);
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

closeModal(modalId:any){
  const modalElement:any = document.getElementById(modalId);
  const modal = bootstrap.Modal.getInstance(modalElement);

  if(modal){
  modal.hide();
    }
  }

  delete(){
    console.log(this.index);
    this.productList.splice(this.index,1);
    this.closeModal('deleteModal');
  }

  update() {
    const updatedProduct = this.productForm.value;
    const id = this.productList[this.index]._id; // Assuming _id is the unique identifier for the product

    this._product.updateProduct(id, updatedProduct).subscribe({
      next: (resp) => {
        console.log(resp);
        this.closeModal('updateProductModal');
        this.getProducts(); // Refresh the product list after updating a product
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProducts(){
    this._product.getAllProducts().subscribe({next:(resp)=>{
      console.log(resp);
      this.productList = resp;
    },error:(err)=>{
      console.log(err);
    }})
  }

}
