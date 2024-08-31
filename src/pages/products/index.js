// pages/products/index.js
import Link from 'next/link';
import Navbar from '../../../Components/Home/Navbar';
import Image from 'next/image';

export async function getStaticProps() {
  const res = await fetch('http://localhost:5050/products');
  const products = await res.json();
  console.log(products);

  return {
    props: {
      products,
    },
  };
}

const ProductsPage = ({ products }) => {
  return (
    <div>
      <Navbar />
      <div class="container">
        <h1 className='mt-5 text-center'>Our Products</h1>
        <div className='cardcont'>
          {products.map((product) => (
            <div className='productcard' key={product.id}>
              <Image src={product.image} alt='-' height={150} width={150}/>
              <p>
                <Link href={`/products/${product.name}`}>
                  {product.name}
                </Link>
              </p>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
