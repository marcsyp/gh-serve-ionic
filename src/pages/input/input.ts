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

    //Default values1
    this.options.option1 = 150;
    this.options.option2 = 125;
    this.options.option3 = 450;
    this.options.option4 = 45;

    this._buildForm();
  });
}

ngOnChanges() {
  console.log('Ng All Changes');
}

}
