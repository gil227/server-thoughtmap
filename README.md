# Thoughtmap Server

> Thoughtmap의 백엔드 API 서버

---

## 기술 스택

| 항목 | 기술                                 |
|------|------------------------------------|
| 언어 | TypeScript                         |
| 프레임워크 | NestJS                             |
| DB | Supabase                           |
| ORM | TypeORM                            |
| 인증 | JWT (Access Token + Refresh Token) |
| 배포 | Render                             |

---

## 주요 기능

- 회원가입 / 로그인 (JWT 인증)
- Access Token + Refresh Token 발급 및 갱신
- 캔버스 CRUD
- 노드 CRUD
- 엣지 CRUD

---

## DB 설계

```
users
├── id           UUID (PK)
├── email        VARCHAR (unique)
├── password     VARCHAR (hashed)
└── created_at   TIMESTAMP

canvases
├── id           UUID (PK)
├── user_id      UUID (FK → users)
├── title        VARCHAR
├── created_at   TIMESTAMP
└── updated_at   TIMESTAMP

nodes
├── id           UUID (PK)
├── canvas_id    UUID (FK → canvases)
├── type         ENUM (text | image)
├── content      TEXT
├── position_x   FLOAT
├── position_y   FLOAT
├── width        FLOAT
├── height       FLOAT
└── created_at   TIMESTAMP

edges
├── id               UUID (PK)
├── canvas_id        UUID (FK → canvases)
├── source_node_id   UUID (FK → nodes)
├── target_node_id   UUID (FK → nodes)
├── edge_type        ENUM (arrow | hierarchy)
└── created_at       TIMESTAMP
```

---

## API 엔드포인트

### 인증
```
POST /auth/signup       회원가입
POST /auth/login        로그인
POST /auth/refresh      토큰 갱신
POST /auth/logout       로그아웃
```

### 캔버스
```
GET    /canvases         내 캔버스 목록
POST   /canvases         캔버스 생성
GET    /canvases/:id     캔버스 단건 조회
PATCH  /canvases/:id     캔버스 수정
DELETE /canvases/:id     캔버스 삭제
```

### 노드
```
GET    /canvases/:id/nodes        노드 목록
POST   /canvases/:id/nodes        노드 생성
PATCH  /canvases/:id/nodes/:nodeId   노드 수정
DELETE /canvases/:id/nodes/:nodeId   노드 삭제
```

### 엣지
```
GET    /canvases/:id/edges        엣지 목록
POST   /canvases/:id/edges        엣지 생성
DELETE /canvases/:id/edges/:edgeId   엣지 삭제
```

---

---

## 환경변수

```env
DATABASE_URL=postgresql://user:password@localhost:5432/thoughtmap
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3000
```

---

## 프로젝트 구조

```
src/
├── auth/            # 인증 모듈 (JWT, Guard)
├── users/           # 유저 모듈
├── canvases/        # 캔버스 모듈
├── nodes/           # 노드 모듈
├── edges/           # 엣지 모듈
├── common/          # 공통 유틸, 인터셉터, 필터
└── main.ts
```