import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-full-page-loader',
  templateUrl: './full-page-loader.component.html',
  styleUrls: ['./full-page-loader.component.scss']
})
export class FullPageLoaderComponent implements OnInit {

  @Input() data: string;

  constructor() { }

  ngOnInit() {
  }

}
