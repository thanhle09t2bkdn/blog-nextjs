'use client';

import { useRouter } from 'next/navigation';
import MenuAccount from '@/components/molecules/MenuAccount';
import { ShoppingBasket } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useIsClient } from '@/hooks/use-is-client';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  activePath?: string;
};

const Header = ({ activePath }: Props) => {
  const router = useRouter();
  const isClient = useIsClient();
  const { products } = useCart();

  const handleClick = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const lastKnownScrollY = window.scrollY;
      const stickyDiv = document.getElementById('sticky_header');
      if (stickyDiv) {
        if (lastKnownScrollY > 10) {
          stickyDiv.classList.remove('md:h-28');
          stickyDiv.classList.add('md:h-16');
        } else {
          stickyDiv.classList.remove('md:h-16');
          stickyDiv.classList.add('md:h-28');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id="sticky_header"
      className={cn(
        'sticky -top-0.5 z-50',
        'transition-all duration-300 ease-in-out',
        'flex justify-center items-center h-20 md:h-28 bg-blue',
      )}
    >
      <div className="max-w-[90%] md:max-w-[1200px] px-0 md:px-5 xl:px-0 w-full flex justify-between items-center">
        <div className="flex items-center gap-6 md:gap-20">
          <Link
            className="text-white text-2xl font-bold cursor-pointer"
            href="/"
          >
            COMPANY
          </Link>
          <div className="flex items-center gap-4 text-white">
            <Link
              className={`text cursor-pointer hover:text-blue-500 hover:scale-110 font-medium transition-all duration-300 rounded-md px-2 py-1 ${
                activePath === '/products' ? 'text-blue-500' : 'text-white'
              }`}
              href="/products"
            >
              Products
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <ShoppingBasket
              className="w-7 h-7 text-white hover:scale-110 hover:text-blue-500 transition-all duration-300"
              onClick={() => handleClick('/cart')}
            />
            {products.length > 0 && isClient && (
              <span className="absolute -top-2 -right-2.5 w-5 h-5 p-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {products.reduce((sum, product) => sum + product.quantity, 0) >
                99
                  ? '99+'
                  : products.reduce(
                      (sum, product) => sum + product.quantity,
                      0,
                    )}
              </span>
            )}
          </div>
          <MenuAccount />
        </div>
      </div>
    </div>
  );
};

export default Header;
