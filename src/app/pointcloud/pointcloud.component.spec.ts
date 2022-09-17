import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointcloudComponent } from './pointcloud.component';

describe('PointcloudComponent', () => {
  let component: PointcloudComponent;
  let fixture: ComponentFixture<PointcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointcloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
