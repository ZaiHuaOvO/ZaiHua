import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-one-night-ultimate-werewolf',
  templateUrl: './one-night-ultimate-werewolf.component.html',
  styleUrls: ['./one-night-ultimate-werewolf.component.scss']
})
export class OneNightUltimateWerewolfComponent implements OnInit {
  // 游戏人数
  personNum = 5;
  // 身份数组
  godArray = ['狼先知', '爪牙', '预言家', '强盗', '女巫', '捣蛋鬼', '酒鬼', '失眠者'];
  // 弹窗显示
  isVisible = false;
  // 场上的身份牌
  Bright: any[] = [];
  // 身份池中的身份牌
  Dark: any[] = [];
  // 复盘
  Result: any[] = [];
  // 狼先知的选择
  god1: number = 0;
  // 是否有狼先知
  isGod1!: boolean;
  // 狼先知的号数
  god1Num: number = 0;
  // 爪牙
  god2Num!: number;
  // 预言家的选择
  god3: number = 0;
  // 预言家
  god3Num!: number;
  // 强盗的选择
  god4: number = 0;
  // 强盗
  god4Num!: number;
  // 女巫的选择
  god5: number = 0;
  // 女巫看到的牌
  god5random!: string;
  // 女巫看到的牌的号数
  god5R: number = 0;
  // 女巫
  god5Num!: number;
  // 捣蛋鬼的选择
  god61: number = 0;
  god62: number = 0;
  // 捣蛋鬼
  god6Num!: number;
  // 酒鬼
  god7Num!: number;
  // 酒鬼的牌
  god7random!: string;
  // 酒鬼的牌的号数
  god7R: number = 0;
  // 失眠者
  god8Num!: number;
  // 失眠者当前的身份
  god8random!: string;
  // 复盘文字
  review: any[] = []

  current = -1;

  index = 'First-content';

  constructor(
    public message: NzMessageService
  ) { }

  ngOnInit() {
  }

  // 游戏开始
  start(): void {
    // 进入步骤条
    this.current = 0;
    // 重置所需要的号数
    this.god1Num = 0;
    this.god1 = 0;
    this.god3 = 0;
    this.god4 = 0;
    this.god5 = 0;
    this.god61 = 0;
    this.god62 = 0;
    this.Result = [];
    // 随机排列身份数组
    this.godArray.sort(function () {
      return 0.5 - Math.random();
    })

    this.godArray.sort((a, b) => 0.5 - Math.random());
    // 分配身份，没有被分配的身份则留在身份池里
    let i = 0;
    // 格式化身份池，避免出BUG
    this.Bright = [];
    this.Dark = [];
    this.godArray.forEach(index => {
      if (i < this.personNum) {
        this.Bright.push(index);
      } else {
        this.Dark.push(index);
      }
      i++;
    });

    this.Result.push(
      `初始身份从1-${this.personNum}号为：${this.Bright}，身份池中身份牌为：${this.Dark}`
    )

    this.search();
  }

  // 重开游戏，清除所有数据
  reset(): void {
    this.current = -1;
    this.Bright = [];
    this.Dark = [];
    this.Result = [];
  }

  next(index: any): void {
    let i = 0;
    switch (index) {
      case 0:
        // 判断是否有狼先知
        if (this.god1Num == 0) {
          this.isGod1 = true;
        } else {
          this.isGod1 = false;
        }
        this.current += 1;
        break;
      // 狼先知睁眼
      case 1:
        if (this.god1Num !== 0 && this.god1 == 0) {
          this.message.info('狼先知未执行神职能力');
        } else {
          this.Result.push(
            `${this.god1Num}号狼先知查验${this.god1}号身份为${this.Bright[this.god1 - 1]}`
          )
          this.current += 1;
        }
        break;
      case 2:
        this.current += 1;
        break;
      // 预言家睁眼
      case 3:
        if (this.god3Num !== 0 && this.god3 == 0) {
          this.message.info('预言家未执行神职能力');
        } else {
          if (this.god3Num !== 0) {
            if (this.god3 == 99) {
              this.Result.push(
                `${this.god3Num}号预言家查验身份池里有${this.Dark[0]}和${this.Dark[2]}`
              )
            } else {
              this.Result.push(
                `${this.god3Num}号预言家查验${this.god3}号身份为${this.Bright[this.god3 - 1]}`
              )
            }
          }
          this.current += 1;
        }
        break;
      // 强盗睁眼
      case 4:
        if (this.god4Num !== 0 && this.god4 == 0) {
          this.message.info('强盗未执行神职能力');
        } else {
          if (this.god4Num !== 0) {
            // 交换身份
            this.Result.push(
              `${this.god4Num}号强盗查看并交换了${this.god4}号${this.Bright[this.god4 - 1]}的身份牌`
            )
            const option = this.Bright[this.god4 - 1];
            this.Bright[this.god4 - 1] = '强盗';
            this.Bright[this.god4Num - 1] = option;
          }
          this.current += 1;
        }

        // 提前获取女巫所看到的身份牌
        this.god5R = Math.ceil(Math.random() * (8 - this.personNum) + 0)
        this.god5random = this.Dark[this.god5R - 1];
        break;
      // 女巫睁眼
      case 5:
        if (this.god5Num !== 0 && this.god5 == 0) {
          this.message.info('女巫未执行神职能力');
        } else {
          if (this.god5Num !== 0) {
            this.Result.push(
              `${this.god5Num}号女巫查看了身份池里的${this.god5random}并与${this.god5}号${this.Bright[this.god5 - 1]}的身份牌进行了交换`
            )
            // 交换身份
            const data1 = this.Bright[this.god5 - 1];
            const data2 = this.Dark[this.god5R];
            this.Dark[this.god5R] = data1;
            this.Bright[this.god5 - 1] = data2;
          }
          this.current += 1;
        }
        break;
      // 捣蛋鬼睁眼
      case 6:
        if (this.god6Num !== 0 && (this.god61 == 0 || this.god62 == 0)) {
          this.message.info('捣蛋鬼未执行神职能力');
        } else {
          if (this.god6Num !== 0) {
            this.Result.push(
              `${this.god6Num}号捣蛋鬼交换了${this.god61}号${this.Bright[this.god61 - 1]}和${this.god62}号${this.Bright[this.god62 - 1]}的身份牌`
            )
            // 交换身份
            const data1 = this.Bright[this.god61 - 1];
            const data2 = this.Bright[this.god62 - 1];
            this.Bright[this.god62 - 1] = data1;
            this.Bright[this.god61 - 1] = data2;
          }
          this.current += 1;
        }
        // 提前获取酒鬼所拿到的身份牌
        this.god7R = Math.ceil(Math.random() * (8 - this.personNum) + 0)
        this.god7random = this.Dark[this.god7R - 1];
        break;
      case 7:
        // 交换酒鬼的身份牌
        if (this.god7Num !== 0) {
          this.Result.push(
            `${this.god7Num}号酒鬼和卡池中的${this.god7random}进行了交换`
          )
          const data = this.Bright[this.god7Num];
          this.Bright[this.god7Num] = this.god7random;
          this.Dark[this.god7R] = data;
        }
        // 提前获取失眠者的身份
        this.god8random = this.Bright[this.god8Num - 1];
        this.current += 1;
        break;
      case 8:
        if (this.god8Num !== 0) {
          this.Result.push(
            `${this.god8Num}号失眠者得知了自己当前的身份为${this.Bright[this.god8Num - 1]}`
          )
        }
        this.current += 1;
        break;
      case 9:
        this.Result.push(
          `最后每个人手里的身份牌从1-${this.personNum}号为：${this.Bright}，身份池中身份牌为：${this.Dark}`
        )
        break;
      default:
        break;
    }

  }

  // 生成复盘 打开对话框，生产复盘文字
  done(): void {
    this.review = [];
    this.isVisible = true;
    this.Result.forEach(index => {
      this.review.push(
        index + '<wait.2>'
      )
    })
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  resetGod(): void {
    this.start();
  }
  // 查询每个身份的号数
  search(): void {
    let i = 0;
    // 查询狼先知的号数
    this.Bright.some(index => {
      if (index === '狼先知') {
        this.god1Num = i + 1;
        return true;
      } else {
        this.god1Num = 0;
        return false;
      }
      i++;
    });

    i = 0;
    // 查询爪牙的号数
    this.Bright.some(index => {
      if (index === '爪牙') {
        this.god2Num = i + 1;
        return true;
      } else {
        this.god2Num = 0;
        return false;
      }
      i++;
    });

    i = 0;
    // 查询预言家的号数
    this.Bright.some(index => {
      if (index === '预言家') {
        this.god3Num = i + 1;
        return true;
      } else {
        this.god3Num = 0;
        return false;
      }
      i++;
    });

    i = 0;
    // 查询强盗的号数
    this.Bright.some(index => {
      if (index === '强盗') {
        this.god4Num = i + 1;
        return true;
      } else {
        this.god4Num = 0;
        return false;
      }
      i++;
    });
    i = 0;
    // 查询女巫的号数
    this.Bright.some(index => {
      if (index === '女巫') {
        this.god5Num = i + 1;
        return true;
      } else {
        this.god5Num = 0;
        return false;
      }
      i++;
    });

    i = 0;
    // 查询捣蛋鬼的号数
    this.Bright.some(index => {
      if (index === '捣蛋鬼') {
        this.god6Num = i + 1;
        return true;
      } else {
        this.god6Num = 0;
        return false;
      }
      i++;
    });

    i = 0;
    // 查询酒鬼的号数
    this.Bright.some(index => {
      if (index === '酒鬼') {
        this.god7Num = i + 1;
        return true;
      } else {
        this.god7Num = 0;
        return false;
      }
      i++;
    });

    i = 0;
    // 查询失眠者的号数
    this.Bright.some(index => {
      if (index === '失眠者') {
        this.god8Num = i + 1;
        return true;
      } else {
        this.god8Num = 0;
        return false;
      }
      i++;
    });
  }

  showModal(): void {
    this.isVisible = true;
  }
}
