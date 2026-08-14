import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices/exceptions/index';
import { PrismaService } from 'src/module-system/prisma/prisma.service';

@Injectable()
export class GetService {
  constructor(private readonly prisma: PrismaService) {}
  async layThongTinHeThongRap(heThongRap: string) {
    if (!heThongRap) { 
      return await this.prisma.heThongRap.findMany({});
    }

    const data = await this.prisma.heThongRap.findFirst({
      where: { ten_he_thong_rap: heThongRap }
    });

    if (!data) { 
      throw new RpcException({
        statusCode: 404,
        message: 'không tìm thấy hệ thống rạp',
      });
    }
    return data;
  }

  async layThongTinCumRapTheoHeThong(heThongRap: string) {
    const heThongRapData = await this.prisma.heThongRap.findFirst({
      where: { ten_he_thong_rap: heThongRap },
    });

    if (!heThongRapData) {
      return {};
    }

    return heThongRapData ? await this.prisma.cumRap.findMany({
      where: { ma_he_thong_rap: heThongRapData.ma_he_thong },
      select: {
        ten_cum_rap: true,
        dia_chi: true,
        RapPhim: {
          select: {
            ma_rap: true,
            ten_rap: true,
          }
        }
      }
    }) : {};
  }

  async layThongTinLichChieuHeThongRap(heThongRap: string) {
    const heThongRapData = await this.prisma.heThongRap.findFirst({
      where: { ten_he_thong_rap: heThongRap },
    });
    const cumRapData = await this.prisma.cumRap.findMany({
      where: { ma_he_thong_rap: heThongRapData?.ma_he_thong },
      select: {
        ten_cum_rap: true,
        dia_chi: true,
        RapPhim: {
          select: {
            ma_rap: true,
            ten_rap: true,
            LichChieu: {
              select: {
                ma_lich_chieu: true,
                ngay_gio_chieu: true,
                gia_ve: true,
                Phim: {
                  select: {
                    ma_phim: true,
                    ten_phim: true,
                    trailer: true,
                    hinh_anh: true,
                    mo_ta: true,
                    ngay_khoi_chieu: true,
                    danh_gia: true,
                    hot: true,
                    dang_chieu: true,
                    sap_chieu: true,
                  }
                }
              }
            }
          },
        }
      }
    });
    return cumRapData;
  }

  async layThongTinLichChieuPhim(maPhim: number) {
  const phimId = Number(maPhim);

  const checkMaPhim = await this.prisma.phim.findFirst({
    where: { ma_phim: phimId },
  });

  if (!checkMaPhim) {
    throw new RpcException({
      statusCode: 404,
      message: 'không tìm thấy phim',
    });
  }

  const lichChieuData = await this.prisma.lichChieu.findMany({
    where: {
      ma_phim: phimId,
    },
    include: {
      Phim: true,
      RapPhim: {
        include: {
          CumRap: {
            include: {
              HeThongRap: true,
            },
          },
        },
      },
    },
  });

  return lichChieuData;
}
}
