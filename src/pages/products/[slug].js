// pages/products/[slug].js
import { useRouter } from 'next/router';
import Image from 'next/image';

export async function getStaticPaths() {
    // Fetch all products from the backend
    const res = await fetch('http://localhost:5050/products'); // Replace with your backend API
    const products = await res.json();
  
    // Generate paths for each product based on its name
    const paths = products.map((product) => ({
      params: { slug: product.name },
    }));
  
    return {
      paths,
      fallback: false, // Or true/false depending on your use case
    };
  }
  
  

  export async function getStaticProps({ params }) {
    // Fetch all products from the backend
    const res = await fetch('http://localhost:5050/products'); // Replace with your backend API
    const products = await res.json();
  
    // Find the product that matches the name (used as slug)
    const product = products.find((p) => p.name === params.slug);
  
    if (!product) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        product,
      },
    };
  }
  

const ProductPage = ({ product }) => {
  const router = useRouter();

  // If the page is not yet generated, you can show a loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Image src={product.image} alt={product.name} width={500} height={500} />
    </div>
  );
};

export default ProductPage;
