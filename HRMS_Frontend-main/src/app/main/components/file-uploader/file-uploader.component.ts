import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from 'environments/environment';

import { FileUploader } from 'ng2-file-upload';
import { CareersService } from 'app/main/careers/careers.service';

const URL = `${environment.apiUrl}/file/file`;

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent  {
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  uploadFlag:boolean; 
  public resumeUpload: String

  uploadFile(event: Event) {
  
    console.log('file uploaded');
    this.uploadFlag=true;
}




 
  constructor (private careerService: CareersService){
    this.uploader = new FileUploader({
   
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      autoUpload: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            file: item._file.name,
            // length: item._file.size,
            // contentType: item._file.type,
            // date: new Date()
          });
        });
      }
      
    });
  
   
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );
  }

  uploadResume(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
  
    this.careerService.uploadFile(formData).then((response:any)=>{
      this.resumeUpload= response?.result?.items?.file
      alert(response.message)
    }).catch((error)=>
    {
      alert(error.message)
    })
    
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  
}

