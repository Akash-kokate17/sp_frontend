import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  images: any[] = [
    '456234428_17897405037044967_2454608081148300862_n.jpg',
    // '491439543_17930099187044967_1527618315661678867_n.jpg',
    '491449908_17967235841894971_1571709496804662024_n.jpg',
    '494610770_17929152204044967_2056455900390284349_n.jpg',
  ];

  videos: any[] = [
    'AQMFqSMK0bhZPdxuZkmAJRkEpZX4nbPwI_DJ0MkVyn3avhS_e_ZOv6GWUbFM3Hes_eFWmo8QBE6p5HoR8_jWEAYb2Wshfx8FNAsYGz8.mp4',
    'AQNNEbCP_Fx_Ls-qdC2hSXPGywOgvi0fBE_0NQvZsovFp_y54s7cfBWtgcq7osYjGj79ZIMto_W1G1effSLXF5xsL3g5pUbmj9Zpu58.mp4',
    'AQNNNx6GUqb3QNag8LOf38CoIBOVLkLpA_2JJoTRyI-NUnQBoH3szmxv-8FSMx2dU9FArfGgOAh3Mp-H3VyEtfdNxyVfgNdUf1_Hxz0.mp4',
  ];

  @ViewChildren('videoElement') videoBox: any;

  onVideoPlay(e: any) {
    const currentVideo = e.target;

    this.videoBox.forEach((videoRef: any) => {
      const video = videoRef.nativeElement;
      if (video !== currentVideo) {
        video.pause();
      }
    });
  }
}
