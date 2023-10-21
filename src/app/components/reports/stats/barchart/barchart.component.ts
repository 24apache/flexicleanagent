import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

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
        type:'column'
      },
      title:{
        text:'Total Orders'
      },
      // subtitle:{
      //   text: 'Flexi Cleaning'
      // },
      xAxis:{
        categories:[
          'Africa', 'America', 'Asia', 'Europe', 'India', 'Dubai'
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
      data: [690, 770, 3200, 700, 320, 4300],
      color: '#311056'
    },{
      name: 'POS',
      data: [450, 970, 1200, 1700, 4900, 1250],
      color: '#489EC1'
    }
  ]

}
