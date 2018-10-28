import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as THREE from 'three';
//import * as RH from '../../assets/lib/rhino3dm.js'

import { Settings } from '../../providers';
import { Api } from '../../providers/api/api';

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
  private slider1 = 50;
  private slider2 = 50;
  private slider3 = 50;
  private slider4 = 50;
  private slider5 = 50;
  private slider6 = 50;
  private slider1name = "";
  private slider2name = "";
  private slider3name = "";
  private slider4name = "";
  private slider5name = "";
  private slider6name = "";
  private ghXml = "";

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
    public settings: Settings, 
    public api: Api,
    public http: HttpClient) {
  }

  _buildForm() {
    let group: any = {
      //testOption: [this.options.testOption],
      slider1: [this.options.slider1],
      slider2: [this.options.slider2],
      slider3: [this.options.slider3],
      slider4: [this.options.slider4],
      slider5: [this.options.slider5],
      slider6: [this.options.slider6],
      slider1name: [this.options.slider1name],
      slider2name: [this.options.slider2name],
      slider3name: [this.options.slider3name],
      slider4name: [this.options.slider4name],
      slider5name: [this.options.slider5name],
      slider6name: [this.options.slider6name],
    };



    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option12: [this.options.slider6name]
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

  onChange(value: any) {
    // 
    var requestBody;

    // this.api.post('grasshopper', requestBody).subscribe(result => {
    //   console.log(result);
    // });
  }

  onSubmit(value: any) {
    // pi
        
    // var requestBody = {
    //   algo: grasshopperBase64,
    //   input: {
    //     radiusX: this.options.radiusXVal,
    //     radiusY: this.options.radiusYVal,
    //     height: this.options.heightVal,
    //     twist: this.options.twistVal
    //   }
    // };

    this.http.get('../../assets/algos/defaults.json').subscribe(data => {
      var defaultBase64 = data["default1"];
      // console.log('jsonData', data["default1"]);
      console.log(this.slider1name);
      console.log(this.ghXml);

      var algo = (this.ghXml != "") ? window.btoa(this.ghXml) : defaultBase64;


      var requestBody = {
        "algo": algo,
        "values": {}
      }

      if (this.options.slider1name != "") {
        console.log(this.options.slider1name);
        requestBody.values[this.options.slider1name] = this.options.slider1
      }
      if (this.options.slider2name != "") {
        console.log(this.options.slider2name);
        requestBody.values[this.options.slider2name] = this.options.slider2
      }
      if (this.options.slider3name != "") {
        requestBody.values[this.options.slider3name] = this.options.slider3
      }
      if (this.options.slider4name != "") {
        requestBody.values[this.options.slider4name] = this.options.slider4
      }
      if (this.options.slider5name != "") {
        requestBody.values[this.options.slider5name] = this.options.slider5
      }
      if (this.options.slider6name != "") {
        requestBody.values[this.options.slider6name] = this.options.slider6
      }

      console.log('requestBody', requestBody);

      this.api.post('grasshopper', requestBody).subscribe(result=>{
        console.log(result);
      });
    });
    
    // var thing = this.api.get('version').subscribe(response => {
    //   console.log('response', response);

    // });

    // // console.log("Submission: " + requestBody.input.radiusX + " / " + requestBody.input.radiusY + " / " + requestBody.input.height + " / " + requestBody.input.twist)

    

    // var crv = new rhino3dm.LineCurve(new Array(0, 0, 0), new Array(1, 1, 1));

    // console.log(crv.degree);
    // console.log(crv.isClosed);
  }
}