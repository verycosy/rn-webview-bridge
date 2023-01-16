import { NextPage } from 'next';
import Head from 'next/head';

// literl template으로 command 만들기

const ProductsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>웹페이지 제목 상품목록</title>
      </Head>

      <div>
        상품목록
        <button
          onClick={() => {
            window.location.href = 'sample-action://setHeader?title=얍얍얍';
          }}
        >
          제목 바꾸기 얍
        </button>
        <button
          onClick={() => {
            window.location.href = 'sample-action://close';
          }}
        >
          닫혀라
        </button>
      </div>
    </>
  );
};

export default ProductsPage;
