import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const Potree: any;
declare const THREE: any;
@Component({
  selector: 'app-pointcloud',
  templateUrl: './pointcloud.component.html',
  styleUrls: ['./pointcloud.component.css']
})
export class PointcloudComponent implements OnInit {

  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.getThreeDPointCloud()
  }

  getThreeDPointCloud() {
   
    const viewer = new Potree.Viewer(document.getElementById('mapContainer'));
    console.log(document.getElementById('mapContainer'))
    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(1_000_000);
    viewer.setBackground("skybox");
    Potree.loadPointCloud(
     
       'https://nodeapp1fordmp.azurewebsites.net/PointCloud/0129010108/0129010108/cloud.js',
        "lion",
      function (e:any) {
        viewer.scene.addPointCloud(e.pointcloud);
        console.log(viewer)
        const material = e.pointcloud.material;
        material.size = 1;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

        e.pointcloud.position.x += 3;
        e.pointcloud.position.y -= 3;
        e.pointcloud.position.z += 4;

        viewer.fitToScreen();
     ;
      }
    );
  }

  onBack(){
    this.router.navigate(['/home']);
  }
}
