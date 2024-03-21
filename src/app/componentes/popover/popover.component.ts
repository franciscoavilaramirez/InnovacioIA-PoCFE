import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isActive = false;

  toggle() {
    this.isActive = !this.isActive;
  }


}