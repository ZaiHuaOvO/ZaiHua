import { Component, EventEmitter, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from 'xlsx';
import * as echarts from 'echarts';
@Component({
  selector: 'app-expenditure-chart',
  standalone: true,
  imports: [],
  templateUrl: './expenditure-chart.component.html',
  styleUrl: './expenditure-chart.component.scss'
})
export class ExpenditureChartComponent {
  @Output() dataUploaded = new EventEmitter<any>();
  // excel所获得的原数组
  uploadedData: any;
  // 根据类别生成的饼图数组
  pieData: any;
  constructor(
    private message: NzMessageService
  ) { }

  // 映射对象，将中文字段名映射为英文字段名
  private fieldMapping = {
    "DataId": "id",
    "时间": "time",
    "分类": "category",
    "类型": "type",
    "金额": "sum",
    "币种": "currency",
    "账户1": "account1",
    "账户2": "account2",
    "备注": "note",
    "已报销": "reimbursed",
    "手续费": "handlingFee",
    "优惠券": "coupon",
    "记账者": "name",
    "账单标记": "billTag",
    "账单图片": "billImage"
  };

  // 生成图表
  getChart(data: any): void {
    this.convertFieldNames(data).then(res => {
      this.message.create('success', `数据转换成功o(〃’▽’〃)o`);
      this.processArray(res).then(pieArray => {
        this.initCharts(pieArray, res);
      })
    }).catch(error => {
      this.message.create('error', `图表数据转换出现错误(。┰ω┰。): ${error.message}`);
    });
  }


  onFileChange(event: any): void {
    const target = event.target || event.srcElement;
    const files = target.files;
    if (files.length === 0) return;

    const file = files[0];
    this.uploadFile(file);
  }

  upload(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx, .xls, .csv';
    fileInput.addEventListener('change', (event: any) => {
      const target = event.target || event.srcElement;
      const files = target.files;
      if (files.length === 0) return;

      const file = files[0];
      this.uploadFile(file);
    });
    fileInput.click();
  }

  uploadFile(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const content = e.target.result;
      if (file.name.endsWith('.csv')) {
        this.parseAndEmitCSV(content);
      } else {
        this.parseAndEmitExcel(content);
      }
    };
    fileReader.readAsText(file);
  }

  parseAndEmitCSV(content: any): void {
    const rows = content.split('\n');
    const data = [];
    const headers = rows[0].split(',');
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(',');
      const obj: { [key: string]: any } = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = rowData[j].trim();
      }
      data.push(obj);
    }
    this.dataUploaded.emit(data);
    this.getChart(data);
  }

  parseAndEmitExcel(content: any): void {
    const workbook = XLSX.read(content, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    this.dataUploaded.emit(data);
    this.getChart(data);
  }

  initCharts(data: any, mainData: any): void {
    echarts.init(document.getElementById('lineChart1')).setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      title: [
        {
          text: '木有钱花の支出',
          left: 'center',
          top: 20
        },
      ],
      legend: {
        top: 'bottom',
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: ['30%', '50%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            }
          },
          data: data
        }
      ]
    })
    echarts.init(document.getElementById('lineChart1')).on('click', params => {
      this.processArray2(mainData, params.name).then(res => {
        const valueArray = res.map((item: { value: any; }) => item.value);
        const nameArray = res.map((item: { name: any; }) => item.name);
        this.initCharts2(valueArray, nameArray, params.name, params.value);
      })
    });
  }
  initCharts2(valueArray: any, nameArray: any, name: string, value: any): void {
    console.log('nameArray: ', nameArray);
    console.log('valueArray: ', valueArray);
    echarts.init(document.getElementById('lineChart2')).setOption({
      title: {
        text: `${name}的具体支出，总￥${value}元`,
        left: "center",
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        // boundaryGap: [0, 0.01]
      },
      yAxis: {
        data: nameArray
      },
      series: [
        {
          name: name,
          type: 'bar',
          data: valueArray
        },

      ]
    })
  }
  // 转换字段名
  convertFieldNames(data: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const transformedData = data.map(item => {
          const newItem: any = {};
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              const mappedKey = (this.fieldMapping as { [key: string]: string })[key] || key;
              newItem[mappedKey] = item[key];
            }
          }
          return newItem;
        });
        resolve(transformedData);
      } catch (error) {
        reject(error);
      }
    });
  }
  // 获取饼图数组
  processArray(res: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const groupedSums = res.reduce((accumulator, currentValue) => {
          const category = currentValue.category;
          const sum = parseFloat(currentValue.sum);
          if (!accumulator[category]) {
            accumulator[category] = 0;
          }
          accumulator[category] += sum;
          return accumulator;
        }, {});

        const processedArray = Object.keys(groupedSums).map(category => ({
          name: category,
          value: parseFloat(groupedSums[category].toFixed(2))
        }));
        processedArray.sort((a, b) => a.value - b.value);
        resolve(processedArray);
      } catch (error) {
        reject(error);
      }
    })
  }

  // 获取饼图的子柱形图数据
  processArray2(res: any[], name: any): Promise<any[]> {
    console.log('res: ', res);
    return new Promise((resolve, reject) => {
      try {
        // 筛选出所有 category 为 name 的元素
        const filteredElements = res.filter(item => item.category == name);

        // 将 note 字段修改为 name，将 sum 字段修改为 value
        const processedArray = filteredElements.map(item => ({
          id: item.id,
          time: item.time,
          value: parseFloat(item.sum),
          name: item.note ? item.note : '未知'
        }));

        // 按 value 从大到小排序
        processedArray.sort((b, a) => b.value - a.value);

        resolve(processedArray);
      } catch (error) {
        reject(error);
      }
    })
  }
}
