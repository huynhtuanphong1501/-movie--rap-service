# Movie Cinema Service 🎬🏢

Rap Service là Microservice chịu trách nhiệm quản lý thông tin rạp chiếu phim trong hệ thống đặt vé xem phim.

Service xử lý:

- Hệ thống rạp
- Cụm rạp
- Lịch chiếu
- Thông tin rạp theo hệ thống
- Lịch chiếu theo phim

Rap Service giao tiếp với Gateway thông qua RabbitMQ.

---

# Architecture

```
                         Client
                           |
                           |
                           v

                    +-------------+
                    |   Gateway   |
                    |   NestJS    |
                    +-------------+

                           |
                           |
                      RabbitMQ

                           |
                           v

                    +-------------+
                    | Rap Service |
                    |   NestJS    |
                    +-------------+

                           |
                           v

                    MySQL Database
```

---

# Technology Stack

## Backend

- Node.js
- NestJS
- TypeScript

## Database

- Prisma ORM
- MySQL

## Communication

- RabbitMQ

## Documentation

- Swagger

## Deployment

- Docker
- Docker Compose
- GitHub Actions
- Docker Hub

---

# Project Structure

```
rap-service

├── src

│
├── module-api
│
│   └── quan-ly-rap
│       │
│       ├── quan-ly-rap.controller.ts
│       ├── quan-ly-rap.service.ts
│       └── quan-ly-rap.module.ts
│
│
├── module-system
│
├── prisma
│
├── Dockerfile
├── package.json
└── README.md
```

---

# API Documentation

Swagger:

```
http://localhost:3069/api-docs
```

Swagger hỗ trợ:

- API Testing
- Query Parameters
- Response Preview

---

# Cinema APIs

## 1. Lấy thông tin hệ thống rạp

API:

```
GET

/api/QuanLyRap/LayThongTinHeThongRap
```

Mục đích:

Lấy danh sách hệ thống rạp.

Ví dụ:

```
/LayThongTinHeThongRap
```

Hoặc lọc theo hệ thống:

```
/LayThongTinHeThongRap?heThongRap=CGV
```

Query:

| Parameter | Type | Required | Description |
|---|---|---|---|
| heThongRap | string | false | Hệ thống rạp |

Ví dụ:

```
CGV

BHDStar

Galaxy
```

---

Response example:

```json
[
    {
        "maHeThongRap": "CGV",
        "tenHeThongRap": "CGV Cinema",
        "logo": "logo_url"
    }
]
```

---

# 2. Lấy thông tin cụm rạp theo hệ thống


API:

```
GET

/api/QuanLyRap/LayThongTinCumRapTheoHeThong
```


Query:

```
heThongRap
```


Example:

```
/LayThongTinCumRapTheoHeThong?heThongRap=CGV
```


Parameter:

| Parameter | Type | Required |
|-|-|-|
| heThongRap | string | true |


Response:

```json
[
    {
        "maCumRap": "cgv-bt",
        "tenCumRap": "CGV Bình Thạnh",
        "diaChi": "TP Hồ Chí Minh"
    }
]
```

---

# 3. Lấy lịch chiếu theo hệ thống rạp


API:

```
GET

/api/QuanLyRap/LayThongTinLichChieuHeThongRap
```


Query:

```
heThongRap
```


Example:

```
/LayThongTinLichChieuHeThongRap?heThongRap=CGV
```


Parameter:

| Parameter | Type | Required |
|-|-|-|
| heThongRap | string | false |


Response:

```json
[
    {
        "maPhim":1,
        "tenPhim":"Avengers",
        "lichChieu":[
            {
                "ngayChieu":"2026-08-20",
                "gioChieu":"19:00"
            }
        ]
    }
]
```

---

# 4. Lấy lịch chiếu theo phim


API:

```
GET

/api/QuanLyRap/LayThongTinLichChieuPhim
```


Query:

```
maPhim
```


Example:

```
/LayThongTinLichChieuPhim?maPhim=1
```


Parameter:

| Parameter | Type | Required |
|-|-|-|
| maPhim | number | true |


Response:

```json
{
    "maPhim":1,
    "tenPhim":"Avengers",
    "heThongRap":[
        {
            "tenHeThongRap":"CGV",
            "cumRap":[
                {
                    "tenCumRap":"CGV Vincom",
                    "lichChieu":[
                        {
                            "gioChieu":"20:00"
                        }
                    ]
                }
            ]
        }
    ]
}
```

---

# Communication With Gateway

Flow:

```
Client

 |

HTTP Request

 |

Gateway

 |

RabbitMQ

 |

Rap Service

 |

Database
```

Gateway gửi message tới Rap Service thông qua RabbitMQ.

---

# Environment Variables

Tạo file:

```
.env
```


Example:

```env
PORT=3073


DATABASE_URL=mysql://root:password@database:3306/db_movie


RABBITMQ_URL=amqp://user:password@rabbitmq:5672


NODE_ENV=production
```

---

# Installation


Install dependencies:

```bash
npm install
```

---

# Run Application


Development:

```bash
npm run start:dev
```


Build:

```bash
npm run build
```


Production:

```bash
npm run start:prod
```

---

# Docker


Build image:

```bash
docker build \
-t phonghuynh1501/img-rap-service:latest .
```


Push:

```bash
docker push phonghuynh1501/img-rap-service:latest
```


Run:

```bash
docker compose up -d
```

---

# CI/CD Flow

```
Developer

    |

git push main

    |

GitHub Actions CI

    |

Docker Build

    |

Docker Hub

    |

GitHub Actions CD

    |

EC2 Runner

    |

Docker Compose Deploy
```

---

# Related Services


## Gateway

Repository:

https://github.com/huynhtuanphong1501/-movie--gateway


## User Service

Repository:

https://github.com/huynhtuanphong1501/-movie--user-service


## Phim Service

Repository:

https://github.com/huynhtuanphong1501/-movie--phim-service


## Dat Ve Service

Repository:

https://github.com/huynhtuanphong1501/-movie--dat-ve-service


---

# Author

**Huynh Tuan Phong**

Movie Management System

Microservices Architecture
