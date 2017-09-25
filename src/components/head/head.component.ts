import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'content-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() showsLogo:boolean=true

  ngOnInit() {
  }

}
