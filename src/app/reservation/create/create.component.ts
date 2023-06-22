import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  form!: FormGroup;
  //Api Variabel
  resources: any;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.initialForm();
    forkJoin(apiService.resourcesGet()).subscribe(([resources]) => {
      this.resources = resources;
    });
  }
  get f() {
    return this.form.controls;
  }
  initialForm() {
    this.form = this.formBuilder.group({
      userId: [],
      resourceId: ['', Validators.required],
      laptop: [false, Validators.required],
      panaboard: [false, Validators.required],
      papanTulis: [false, Validators.required],
      projector: [false, Validators.required],
      pocari: [false, Validators.required],
      soyjoy: [false, Validators.required],
      begin: ['', Validators.required],
      end: ['', Validators.required],
      length: ['', Validators.required],
      repeat: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {
    let body = {
      userId: this.f['userId'].value,
      resourceId: this.f['resourceId'].value,
      laptop: this.f['laptop'].value,
      panaboard: this.f['panaboard'].value,
      papanTulis: this.f['papanTulis'].value,
      projector: this.f['projector'].value,
      pocari: this.f['pocari'].value,
      soyjoy: this.f['soyjoy'].value,
      begin: this.f['begin'].value,
      end: this.f['end'].value,
      length: '',
      repeat: this.f['laptop'].value,
      title: this.f['laptop'].value,
      description: this.f['laptop'].value,
    };
    console.log(this.f['laptop'].value);
    console.log(this.f['panaboard'].value);
    console.log(this.f['resourceId'].value);
  }
}
