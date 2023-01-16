import Link from 'next/link';

export function Index() {
  return (
    <div>
      <div>Hello World</div>

      <div>
        <Link href="/products#상품 목록">제목과 함께 상품 목록 페이지로</Link>
      </div>

      <div>
        <Link href="/products">제목없이 상품 목록 페이지로</Link>
      </div>
    </div>
  );
}

export default Index;
