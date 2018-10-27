import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import * as Rhino3dm from 'rhino3dm';

import { Api } from '../../providers/api/api';




/**
 * Generated class for the SandboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sandbox',
  templateUrl: 'sandbox.html',
})
export class SandboxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SandboxPage');
    // console.log(Rhino3dm);
    console.log('getting version')
    var thing = this.api.get('version').subscribe(response=> {
      console.log('response', response);

    }
      
    );

  }

}
