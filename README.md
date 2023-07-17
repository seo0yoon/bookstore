## 서점 사이트 구축

도서 검색/필터링, 장바구니, 도서 관리(관리자용) 등의 기능을 갖추고 있습니다. 이 프로젝트는 React를 사용하여 개발되었으며, Firebase를 통해 사용자 인증을 처리하고 AWS Amplify를 사용하여 배포하였습니다.

DEMO : https://main.d174sokswz35yr.amplifyapp.com/

### 구성

프론트엔드 1명

### 기간

2023.07.06 ~ 2023.07.16

### 주요 기술 스택

- React
- Firebase
- Context API
- Scss
- AWS amplify

### 주요 기능

1. 로그인/회원가입 기능

사용자는 이메일(ID)와 비밀번호를 통해 로그인 및 회원가입을 할 수 있습니다. Firebase Authentication을 사용하여 인증 과정을 처리하며, 로그인 성공시 사용자의 상태가 Firebase에서 관리됩니다. 사용자의 ID는 로컬 스토리지에 저장되어, 다음 방문 때 사용자의 편의를 위해 자동으로 입력 필드에 입력됩니다.

2. 도서 검색 및 필터링

사용자는 편리하게 도서를 검색하고, 사용자가 도서를 검색하면 "search" 탭이 활성화되며, 검색 쿼리를 통해 도서 데이터를 가져옵니다. 도서는 크게 "bestseller", "new", "search" 등의 카테고리로 분류됩니다. 사용자는 이 중 원하는 카테고리를 선택하여 해당 도서 목록을 볼 수 있습니다.
더욱 세분화된 검색을 위해, 각 대분류 카테고리 내에서도 "외국도서", "국내도서", "무료배송", "추천도서" 등의 세부 카테고리로 필터링이 가능합니다. 이를 통해 사용자는 자신의 선호도에 맞는 도서를 효율적으로 찾아볼 수 있습니다.

3. 장바구니 기능

장바구니 기능은 사용자의 로그인 상태, 배송비 계산, 총 결제 금액 계산, 그리고 주문 완료 기능을 포함하고 있습니다.

로그인 상태 확인: Firebase의 getAuth를 통해 현재 로그인한 사용자가 있는지 확인하고, 로그인한 사용자가 있다면 해당 사용자의 ID를 저장합니다.

배송비 계산: 사용자가 선택한 도서의 총 가격이 20,000원 이상일 경우, 배송비는 자동으로 0원이 됩니다. 만약 총 가격이 20,000원 미만이라면, 배송비는 3,000원으로 적용됩니다.

총 결제 금액 계산: 도서 가격과 배송비를 합산하여 총 결제금액을 계산합니다.

주문 완료: 사용자가 선택한 도서와 사용자 ID를 통해 Firebase에 주문 정보를 저장합니다. 주문이 성공적으로 저장되면, 해당 도서는 장바구니에서 자동으로 삭제됩니다.

장바구니 표시: 장바구니에 담긴 도서들을 리스트 형식으로 표시하며, 장바구니가 비었을 경우에는 관련 메시지를 표시합니다. 또한, 사용자가 로그인하지 않은 상태에서 장바구니를 이용하려 할 경우, 로그인 페이지로 이동할 수 있는 버튼을 제공합니다.

4. 도서 관리 기능 (관리자용)

도서의 정보를 확인하고, 새로운 도서를 추가하거나 기존 도서를 삭제/수정할 수 있습니다. 도서 정보는 Firebase에 저장되며, 이미지는 firebase storge에 저장됩니다. 도서 목록은 페이지가 렌더링 될 때마다 Firebase에서 도서 목록을 가져와 업데이트됩니다.

### 개발 실행 방법

패키지 설치: npm install
Firebase 설정: Firebase에서 새 프로젝트를 생성하고, 생성한 프로젝트의 설정 정보를 .env 파일에 추가합니다. (예: REACT_PUBLIC_FIREBASE_API_KEY=your-api-key)
개발 서버 실행: npm start
주의 사항
이 프로젝트는 개발 및 테스트 환경에서 사용하기 위한 목적으로 제작되었습니다.
