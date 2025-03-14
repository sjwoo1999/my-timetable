<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>2025년 1학기 시간표 관리 애플리케이션</h1>
  <p>
    이 프로젝트는 사용자가 2025년 1학기 강의 일정을 시각적으로 확인하고, 각 강의에 대한 학습 기록을 게시판 형태로 관리할 수 있는 웹 애플리케이션입니다. Next.js와 Firebase를 활용하여 빠르고 안전한 사용자 경험을 제공합니다.
  </p>

  <h2>목차</h2>
  <ul>
    <li><a href="#프로젝트-개요">프로젝트 개요</a></li>
    <li><a href="#기술-스택">기술 스택</a></li>
    <li><a href="#주요-기능">주요 기능</a></li>
    <li><a href="#설치-및-실행-방법">설치 및 실행 방법</a></li>
    <li><a href="#배포-방법">배포 방법</a></li>
    <li><a href="#기여-가이드라인">기여 가이드라인</a></li>
    <li><a href="#라이선스">라이선스</a></li>
  </ul>

  <h2 id="프로젝트-개요">프로젝트 개요</h2>
  <p>
    이 애플리케이션은 학생들이 자신의 강의 시간표를 확인하고, 각 과목별로 학습 내용과 시간을 기록할 수 있도록 설계되었습니다. Firebase를 통해 사용자 인증과 데이터베이스를 관리하며, Next.js의 SSR/SSG 기능을 활용해 빠른 페이지 로드를 보장합니다.
  </p>

  <h2 id="기술-스택">기술 스택</h2>
  <table>
    <thead>
      <tr>
        <th>기술</th>
        <th>설명</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Next.js</strong></td>
        <td>서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)으로 성능 최적화 및 SEO 향상</td>
      </tr>
      <tr>
        <td><strong>React</strong></td>
        <td>UI 컴포넌트 구축, 상태 관리, 이벤트 핸들링</td>
      </tr>
      <tr>
        <td><strong>TypeScript</strong></td>
        <td>타입 안전성을 통한 코드 안정성과 유지보수성 강화</td>
      </tr>
      <tr>
        <td><strong>Firebase</strong></td>
        <td>인증(Auth), Firestore 데이터베이스, 클라우드 기능 제공</td>
      </tr>
      <tr>
        <td><strong>CSS Modules</strong></td>
        <td>컴포넌트별 스타일링으로 스타일 충돌 방지 및 모듈화</td>
      </tr>
    </tbody>
  </table>

  <h2 id="주요-기능">주요 기능</h2>
  <ul>
    <li><strong>사용자 인증</strong>: Firebase Auth를 활용한 이메일/비밀번호 로그인 및 로그아웃.</li>
    <li><strong>시간표 시각화</strong>: 주간 시간표를 그리드 형태로 표시하며, 과목별 색상 구분.</li>
    <li><strong>게시판 관리</strong>: Firestore를 통해 과목별 게시물 생성, 조회, 수정, 삭제(CRUD).</li>
    <li><strong>보호된 라우트</strong>: 인증된 사용자만 접근 가능한 페이지 설정.</li>
    <li><strong>반응형 UI</strong>: CSS Modules로 일관된 디자인과 다양한 디바이스 지원.</li>
  </ul>

  <h2 id="설치-및-실행-방법">설치 및 실행 방법</h2>
  <ol>
    <li>
      <strong>저장소 클론</strong>:
      <pre><code>git clone https://github.com/sjwoo1999/my-timetable.git
cd my-timetable</code></pre>
    </li>
    <li>
      <strong>환경 변수 설정</strong>:
      <p>루트 디렉토리에 <code>.env.local</code> 파일을 생성하고 Firebase 설정을 추가합니다.</p>
      <pre><code>NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id</code></pre>
    </li>
    <li>
      <strong>의존성 설치</strong>:
      <pre><code>npm install</code></pre>
    </li>
    <li>
      <strong>개발 서버 실행</strong>:
      <pre><code>npm run dev</code></pre>
      <p>브라우저에서 <a href="http://localhost:3000">http://localhost:3000</a>에 접속합니다.</p>
    </li>
  </ol>

  <h2 id="배포-방법">배포 방법</h2>
  <p>
    <strong>Vercel</strong>을 추천합니다:
  </p>
  <ol>
    <li>프로젝트를 GitHub에 푸시합니다.</li>
    <li>Vercel 대시보드에서 프로젝트를 가져옵니다.</li>
    <li>환경 변수 설정에 Firebase 키를 추가합니다.</li>
    <li>배포를 진행합니다.</li>
  </ol>
  <p>배포 후 제공된 URL로 애플리케이션에 접근할 수 있습니다.</p>

  <h2 id="기여-가이드라인">기여 가이드라인</h2>
  <ol>
    <li><strong>이슈 생성</strong>: 버그나 기능 제안을 위해 GitHub 이슈를 작성합니다.</li>
    <li><strong>브랜치 생성</strong>: <code>feature/기능명</code> 또는 <code>fix/버그명</code> 형식으로 브랜치를 만듭니다.</li>
    <li><strong>코드 작성</strong>: ESLint와 Prettier를 준수하며 작업합니다.</li>
    <li><strong>풀 리퀘스트</strong>: PR을 생성하고 코드 리뷰를 요청합니다.</li>
  </ol>

  <h2 id="라이선스">라이선스</h2>
  <p>이 프로젝트는 <a href="https://opensource.org/licenses/MIT">MIT 라이선스</a>를 따릅니다.</p>

  <h2>추가 고려 사항</h2>
  <ul>
    <li><strong>보안</strong>: Firebase 보안 규칙을 설정하여 데이터 접근을 제어합니다.</li>
    <li><strong>테스트</strong>: Jest와 React Testing Library로 단위 및 통합 테스트를 작성합니다.</li>
    <li><strong>접근성</strong>: WCAG 2.1 지침을 준수하여 모든 사용자를 지원합니다.</li>
  </ul>
</body>
</html>