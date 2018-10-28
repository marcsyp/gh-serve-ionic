import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: "Introducing: RESThopper",
            description: "Calculated Grasshopper definitions in the cloud using our new RESTful service!",
            image: 'assets/img/restHopper1.jpg',
          },
          {
            title: "The Front-End of Your Choice",
            description: "We support any platform that can do a REST call.",
            image: 'assets/img/restHopper2.jpg',
          },
          {
            title: "REST Call Schema",
            description: "Using a simple POST request with this schema in the body will return a JSON with Rhino geometry from the Rhino Compute environment.  This can be translated to front end visualizations using Rhino3dm for more complex types.",
            image: 'assets/img/restHopper3.jpg',
          },
          {
            title: "Big Implications",
            description: "There are many potential use cases unlocked by this type of platform. Most significantly, it enables the potential for a cloud-based marketplace for Grasshopper algorithms",
            image: 'assets/img/restHopper4.jpg',
          }
        ];
      });
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
