'use client';
import React, { useEffect, useState } from 'react';
import Link from '../link';
import { Routes } from '@/constants/enums';
import { ShoppingCartIcon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectItemCart } from '@/redux/features/cart';
import { getQuantityCart } from '@/lib/cart';

const CartButton = () => {
  const cart = useAppSelector(selectItemCart);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const quantityCart = getQuantityCart({ cart });
  
  return (
    <Link href={`/${Routes.CART}`} className='block relative group'>
      <span className='absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center'>
        {mounted ? quantityCart : 0}
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  );
};

export default CartButton;