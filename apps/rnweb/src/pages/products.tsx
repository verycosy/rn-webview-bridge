import { NextPage } from 'next';
import Head from 'next/head';
import AppSchemeUtil from '../utils/AppSchemeUtil';

// literl template으로 command 만들기

const ProductsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>웹페이지 제목 상품목록</title>
      </Head>

      <div>
        상품목록
        <button onClick={() => AppSchemeUtil.setHeaderTitle('얍얍얍')}>
          제목 바꾸기 얍
        </button>
        <button onClick={() => AppSchemeUtil.closeWebView()}>닫혀라</button>
        <div onClick={() => AppSchemeUtil.goToScreen('sample')}>
          샘플 스크린으로
        </div>
        <div
          onClick={() =>
            AppSchemeUtil.share('https://gogogle.com', '구글', '구글이에요')
          }
        >
          공유
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
