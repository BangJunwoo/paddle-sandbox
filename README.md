# 작업 중

- 검증 로직을 분리해서 작업 전에 검증하고 리프레쉬 시도하고, 되면 넘어가고 안되면 로그아웃 처리
- 리프레시 동작 원리
  - 엑세스랑 리프레쉬를 같이 보내면 갱신된 코드를 받음
  - 엑세스가 있는 것도 있고 없어도 되는 것도 있음
  - 리프레쉬 없이 보내는 것은 만료를 받을 수 있음

# 해야할 일

로그인 구조

- [x] 엑세스 토큰이랑 비밀번호 어떻게 같이 던지고 있나
  - [x] type 별 optional 이다
  - [x] 실패할 경우 user 정보와 토큰 정보를 없앤다
  - [x] server에서 요청해서 쿠키 부여하고 필요할 때 바꿔가며 핸들링하는 방식을 사용한다
    - [x] 브라우저에서는 정보를 주입할 수 없게 하지만? 쿠키부여를 하는게 핵심?
    - [x] 서버에서 쿠키가 위변조 되지 않았는지 확인하는 방법 > 마땅히 없음
- [ ] 리프레쉬
  - [x] 엑세스가 만료 되었을 때 함 > 만료 체크는 일단 쏴보는 방식으로 하고 있음
  - 엑세스 / 리프레쉬 = 30min / 14day
- [x] 토큰 발급
  - [x] 로그인 할 때 [loginFetch](./src/model/apis/fetch.ts)
  - 헤더에 리프레쉬가 있을 때 기존 요청과 같이 헤더로 보내줌
  -
- [x] 일반적인 요청
  - [x] 자바스크립트 쿼리스트링 생성 코드스니펫 [url](./src/model/apiUtils/urlInit.ts)
  - [x] 서버에서 요청하는 인터페이스 [serverFetch](./src/model/apis/authFetch.ts)

# 구조 계획

# 주요 기능

## user data 관리

- [x] redux toolkit 설정
- [ ] redux persist 설정 > dexie 로 대체하기 > 공수가 너무 크게 들어서 미룸

  - 관리되야하는 것들

    - 유저 정보
    - 그 외 정보 후보 > 연동을 위한 고유번호
    - 유저 인터페이스 데이터 보존

  - [ ] 미들웨어로 persist를 dexie로 구현하기

- [ ] auth wrap > 인증 방법에 대해 고려해볼 필요 있음
- [ ] redux provider 의 정보가 paddle에 필요함
  - paddle 보다 상위에 provider 있어야 데이터를 가져올 때 인증함
  - 리덕스는 루트에 있어야할 듯

## 프론트 필요 기능

- 토너먼트 인터페이스
- 자신의 토너먼트 포지션 확인
- 개최한 크루 정보 확인
-

## 백엔드 필요 기능

- 로그인
  - 로그인에 대한 세부 기능
  - customer , 생성된 address id 관리
  - 스테핀 연동 > 어떻게 할 건지
- 상품 정보
  - 상품 구매 시 유저 정보 변경
- 고객 거래 정보 조회

  - 셀러 기반구매 조회에 필요 ( 트랜잭션 조회 )

- 거래 중인 트랜잭션에 대한 조회? > 가능한 기능임
  - 거래 중인 트랜잭션에 대한 복귀도 가능함
  - 마찬가지로 트랜잭션에 대한 캔슬도 가능
- 구독 가능

- 크루 그룹 데이터

## 요청 필수 요소 분류

- client에서 server 갈 때 body나 특정 규칙으로 path 넣어서 받을 수 있게 해야함
- 쿼리 스트링 > ?b=123&b=456
- server
  - query
    - array 되야함
  - ## path

### 없어도 됨

- 헤더에 엑세스 토큰
  - 필요 없을 때도 있음
  - header에 엑세스 토큰 외 + N이 지금 당장은 없음
    - header를 추가할 수 있는 걸 지금은 고려하지 않아도 됨
