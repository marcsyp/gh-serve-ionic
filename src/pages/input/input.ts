import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';
//import * as RH from '../../assets/lib/rhino3dm.js'

import { Settings } from '../../providers';

// tslint:disable-next-line
var rhino3dm = Module;

/**
 * Generated class for the InputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var test;

@IonicPage()

@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})
export class InputPage {
  @ViewChild('domObj') canvasEl: ElementRef;

  private _ELEMENT: any;
  private _SCENE: any;
  private _CAMERA: any;
  public renderer;
  private _GEOMETRY;
  public _MATERIAL;
  public _CUBE;

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
    public settings: Settings, ) {
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

    this.initialiseWebGLObjectAndEnvironment();
    this.renderAnimation();
  }

  initialiseWebGLObjectAndEnvironment(): void {
    this._ELEMENT = this.canvasEl.nativeElement;
    this._SCENE = new THREE.Scene();
    this._CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this._ELEMENT.appendChild(this.renderer.domElement);
    this._GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
    this._MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    this._CUBE = new THREE.Mesh(this._GEOMETRY, this._MATERIAL);
    this._SCENE.add(this._CUBE);
    this._CAMERA.position.z = 5;
  }

  private _animate(): void {
    requestAnimationFrame(() => {
      this._animate();
    });

    this._CUBE.rotation.x += 0.015;
    this._CUBE.rotation.y += 0.015;

    this.renderer.render(this._SCENE, this._CAMERA);
  }

  renderAnimation(): void {
    this._animate();
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
      algo: null,
      input: {
        radiusX: this.options.radiusXVal,
        radiusY: this.options.radiusYVal,
        height: this.options.heightVal,
        twist: this.options.twistVal
      }
    };

    console.log("Submission: " + data.input.radiusX + " / " + data.input.radiusY + " / " + data.input.height + " / " + data.input.twist)

    var req = new XMLHttpRequest();
    req.open("GET", "https://files.mcneel.com/rhino3dm/models/RhinoLogo.3dm");
    req.responseType = "arraybuffer";
    req.addEventListener("loadend", loadEnd);
    req.send(null);

    var model;

    function loadEnd(e) {
      var longInt8View = new Uint8Array(req.response);
      model = rhino3dm.File3dm.fromByteArray(longInt8View);

      console.log("Objects: " + model.objects);
    }

    var crv = new rhino3dm.LineCurve(new Array(0, 0, 0), new Array(1, 1, 1));

    console.log(crv.degree);
    console.log(crv.isClosed);
  }
}