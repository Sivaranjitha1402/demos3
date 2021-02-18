import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// import * as AWS from 'aws-sdk';
// import * as S3 from 'aws-sdk/clients/s3';
import { Router } from '@angular/router';
import { S3 } from 'aws-sdk';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input() fileinput:any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private datepipe: DatePipe
  ) {}
  @ViewChild('fileUpload', { static: false }) fileUpload: any;
  files :any[]= [];
  public filelist: any[]=[];

  bucket = new S3({
    accessKeyId: 'ASIA4Y2YIVR437JG2NG7',
    secretAccessKey: 'DNt6d0M9e/4fp/K0f8XkN+6dEdil5QtKYbFHU/7R',
  });

  ngOnInit() {}

  onFileChange() {
      this.uploadFile(this.fileinput)
  }

  uploadFile(file: any) {
    console.log(file)
    var params = {
      Bucket: 'testing-s3demo',
      Key: "test.png",
      Expires: 3600,
      ContentType: "png",
    };
    var url = this.bucket.getSignedUrl('putObject', params);
    console.log(url)
    this.http.put(url, file).subscribe({
      next: (data) => {
        console.log(file.data.name + 'data uploaded successfully');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
