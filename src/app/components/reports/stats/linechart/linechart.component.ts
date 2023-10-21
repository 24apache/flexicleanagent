import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;

  constructor () {

  }

  ngOnInit(): void {
    this.barChart();
  }

  barChart(){
    this.chartOptions = {
      chart:{
        type:'line'
      },
      title:{
        text:'Total Orders'
      },
      // subtitle:{
      //   text: 'Flexi Cleaning'
      // },
      xAxis:{
        categories:[
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ]
      },
      credits:{
        enabled: false
      },
      plotOptions:{
        series:{
          stacking:'normal'
        },
        bar:{
          dataLables:{
            enabled:true
          }
        }
      },
      


      series: this.chartData

    }
  }

  chartData = [
    {
      name: 'ONLINE',
      data: [690, 770, 3200, 700, 320, 4300, 320],
      color: '#311056'
    },{
      name: 'POS',
      data: [450, 970, 1200, 1700, 1100, 1250, 458],
      color: '#489EC1'
    }
  ]


}
