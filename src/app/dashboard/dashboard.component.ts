import { Component, OnInit } from '@angular/core';
import { chartAreaDemo } from '../chartAreaDemo';
import { chartPieDemo } from '../chartPieDemo';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    chartAreaDemo();
    chartPieDemo();
  }

}
