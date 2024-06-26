import {data} from '../../../data/products'
import {Product} from '@/types/type'
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '../../app/globals.css';


interface Props {
    productData: Product | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const { id } = params;

    try {
        const productData = data.find(product => product.id === id);

        if (!productData) {
            throw new Error('Product not found');
        }
        
        return {
            props: {
                productData,
            },
        };
    } catch (error) {
        console.error('Error fetching product data:', error.message);
        return {
            props: {
                productData: null,
            },
        };
    }
};


export default function Product({ productData }: { productData: Product }) {

   
    return (
        <main className="flex justify-center items-center h-screen bg-white">
        <div className="flex">
          {/* Left Column */}
          <div className="mr-8">
            <Image
              src={productData.imageSrc}
              alt={productData.imageAlt}
              width={350}
              height={500}
              className="object-center group-hover:opacity-75 max-h-[368px]"
            />
           <div className='text-pink-700 underline mt-14'>
            <Link href={"/"}>
              Back to view all artworks
            </Link>
          </div>
          </div>
          {/* Right Column */}
          <div>
            <h1 className="mt-4 text-3xl text-black">{productData.name}</h1>
            <p className="mt-1 text-lg font-medium text-gray-900">{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(productData.price / 100)}</p>
          </div>
        </div>
      </main>
    );
}


