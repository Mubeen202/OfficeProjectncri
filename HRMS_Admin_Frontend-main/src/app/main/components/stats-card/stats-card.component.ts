import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {
  @Input() statsJobs
  constructor() { }

  ngOnInit(): void {
    console.log('jjjjjjdssfdf', this.statsJobs)
  }

}
