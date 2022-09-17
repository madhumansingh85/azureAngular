import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadPopupComponentComponent } from './fileupload-popup-component.component';

describe('FileuploadPopupComponentComponent', () => {
  let component: FileuploadPopupComponentComponent;
  let fixture: ComponentFixture<FileuploadPopupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileuploadPopupComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileuploadPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
