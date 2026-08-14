import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetService } from './get.service';
import { RAP_PATTERN } from 'src/common/patterns/rabbitmq.pattern';


@Controller()
export class GetController {
  constructor(private readonly getService: GetService) {}

  @MessagePattern(RAP_PATTERN.LAYTHONGTINHE_THONGRAP)
  layThongTinHeThongRap(@Payload() heThongRap: string) {
    return this.getService.layThongTinHeThongRap(heThongRap);
  }

  @MessagePattern(RAP_PATTERN.LAYTHONGTINCUMRAPTHEOHETHONG)
  layThongTinCumRapTheoHeThong(@Payload() heThongRap: string) {
    return this.getService.layThongTinCumRapTheoHeThong(heThongRap);
  }

  @MessagePattern(RAP_PATTERN.LAYTHONGTINLICHCHIEUHETHONGRAP)
  layThongTinLichChieuHeThongRap(@Payload() heThongRap: string) {
    return this.getService.layThongTinLichChieuHeThongRap(heThongRap);
  }

  @MessagePattern(RAP_PATTERN.LAYTHONGTINLICHCHIEUPHIM)
  layThongTinLichChieuPhim(@Payload() maPhim: number) {
    return this.getService.layThongTinLichChieuPhim(maPhim);
  }
}
