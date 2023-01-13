import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as React from 'react';
import Link from 'next/link';

interface INavbarProps {
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return(
    <div className='flex flex-row w-screen h-fit py-4 px-[10%] bg-bgcolor justify-between items-center ' >
        <Link href='/' className='text-[1.5vmax] font-bold text-black'>CerNFT</Link>
        <div className='flex flex-row ' >
          <Link href='/'>
          <Link href='./Minter' ><button className='bg-purple-800 w-fit h-fit px-4 py-2 rounded-xl text-1xl mr-4'>Mint Certificate</button></Link>
          </Link>
        <ConnectButton />
        </div>
    </div>
  ) ;
};

export default Navbar;
