import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../core/auth/auth.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { PhotoService } from "../photo/photo.service";
import { Router } from "@angular/router";

@Component({
    selector: 'ap-photo-form',
    templateUrl: './photo-form.component.html',
})
export class PhotoFormComponent implements OnInit {

    photoForm: FormGroup;
    file: File;
    preview: string;

    constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router
      ) { }

    ngOnInit(): void { 

        this.photoForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.maxLength(300)],
            allowComments: [true]
        });
    }

    upload() {
      const description = this.photoForm.get('description').value;
      const allowComments = this.photoForm.get('allowComments').value;
      this.photoService
        .upload(description, allowComments, this.file)
        .subscribe(() => this.router.navigate(['']));
    }

    handleFile(file: File) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (event: any) => this.preview = event.target.result
      reader.readAsDataURL(file);
    }
}