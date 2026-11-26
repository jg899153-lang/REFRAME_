# RE:FRAME — Vercel 배포용

현재 공개 화면의 HTML/CSS/JavaScript와 사용 이미지를 한 폴더로 정리한 독립 실행 배포본입니다. 기존 사이트는 변경하지 않습니다.

## GitHub에 올리기
1. ZIP을 압축 해제합니다.
2. GitHub에서 New repository를 누르고 이름을 `reframe-cinema`로 입력합니다. Private으로 만들어도 됩니다.
3. Create repository를 누릅니다.
4. uploading an existing file 또는 Add file → Upload files를 누릅니다.
5. 압축 해제한 폴더 **안의 내용물**을 올립니다. 저장소 첫 화면에 index.html, style.css, app.js, vercel.json, assets 폴더가 있어야 합니다. ZIP 자체를 올리지 마세요.
6. Commit changes를 누릅니다.

## Vercel에서 배포하기
1. Add New → Project를 누릅니다.
2. GitHub의 reframe-cinema 저장소에서 Import를 누릅니다. 안 보이면 GitHub 연결의 저장소 접근 권한을 확인합니다.
3. Framework Preset: Other, Root Directory: ./, Build Command: 비워 두기, Output Directory: . 으로 둡니다. vercel.json에 이미 설정되어 있습니다.
4. Deploy를 누르고 완료 후 생성된 주소로 접속합니다.

## 확인할 것
- 인트로의 문, 타이틀, 초원 이미지가 정상인지
- 편지 → 포스터 → 영상 구간에서 스크롤이 막히지 않는지
- 영상 드래그, 클릭 재생, 엔딩 전환이 동작하는지
- 휴대전화에서도 글과 버튼이 보이는지

## 수정과 관리자 기능
이 배포본은 내보낸 시점의 화면과 미디어를 포함합니다. 기존 관리자에서 수정해도 이 Vercel 복사본에 자동 반영되지 않습니다. 이 저장소의 파일을 수정하고 커밋하면 Vercel 연결 후 다시 배포됩니다. 기존 관리자 업로드/게시 기능을 Vercel과 연동하는 작업은 별도입니다.
아가씨·헤어질 결심·기생충·살인의 추억 영상 4개는 assets 안에 포함되어 있습니다. 아가씨 영상은 최종 첨부본의 원본 음악을 포함합니다. Google Fonts 사용으로 글꼴 표시에는 인터넷 연결이 필요합니다.
