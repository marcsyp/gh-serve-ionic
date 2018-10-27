import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers';

/**
 * Generated class for the InputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})
export class InputPage {

// Our local settings object
options: any;

//Defaul slider values
private radiusXVal = 105;
private radiusYVal = 155;
private heightVal = 475;
private twistVal = 45;

settingsReady = false;

form: FormGroup;

profileSettings = {
  page: 'profile',
  pageTitleKey: 'SETTINGS_PAGE_PROFILE'
};

page: string = 'main';
pageTitleKey: string = 'SETTINGS_TITLE';
pageTitle: string;


constructor(public navCtrl: NavController,
  public formBuilder: FormBuilder,
  public navParams: NavParams,
  public settings: Settings,) {
}

_buildForm() {
  let group: any = {
    //testOption: [this.options.testOption],
    radiusXVal: [this.options.radiusXVal],
    radiusYVal: [this.options.radiusYVal],
    heightVal: [this.options.heightVal],
    twistVal: [this.options.twistVal],
    option1: [this.options.option1],
    option2: [this.options.option2],
    option3: [this.options.option3],
    option4: [this.options.option3]
  };



  switch (this.page) {
    case 'main':
      break;
    case 'profile':
      group = {
        option4: [this.options.option4]
      };
      break;
  }

  this.form = this.formBuilder.group(group);

  // Watch the form for changes, and
  this.form.valueChanges.subscribe((v) => {
    this.settings.merge(this.form.value);
  });
}

ionViewDidLoad() {
  // Build an empty form for the template to render
  this.form = this.formBuilder.group({});
}

ionViewWillEnter() {
  // Build an empty form for the template to render
  this.form = this.formBuilder.group({});

  this.page = this.navParams.get('page') || this.page;
  this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

  this.settings.load().then(() => {
    this.settingsReady = true;
    this.options = this.settings.allSettings;

    this._buildForm();
  });
}

/*
get testOption(): number {
  return this.form.value['testOption'];
}
*/

ngOnChanges() {
  console.log('Ng All Changes');
}

onSubmit(value: any) {
  var data = {
    algo:null, 
    input:{
      radiusX: this.options.radiusXVal, 
      radiusY: this.options.radiusYVal, 
      height: this.options.heightVal,
      twist: this.options.twistVal}
    };

  console.log("Submission: " + data.input.radiusX + " / " + data.input.radiusY + " / " + data.input.height + " / " + data.input.twist)
}

}
