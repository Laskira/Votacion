import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ],
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;

  public file: File | null = null;
  photoSelected: string | ArrayBuffer = 'assets/photo.svg';

  @HostListener("change", ["$event.target.files"]) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    // image preview
    const reader = new FileReader();
    reader.onload = e => (this.photoSelected = reader.result);
    reader.readAsDataURL(this.file);
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = "";
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  reset(){
    this.photoSelected = "assets/photo.svg"
  }
  registerOnTouched(fn: Function) {}
}
