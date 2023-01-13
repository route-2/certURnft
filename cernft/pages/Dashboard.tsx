import * as React from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';

interface IDashboardProps {
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {

    React.useEffect(() => {
        getcert();
    }, []);


    const {address}=useAccount();
    const [nfts, setNfts] = React.useState<any>([]);

    console.log(address);

  const certurl=`https://eth-goerli.g.alchemy.com/nft/v2/gh4d1-dAT4B_1Khy86s7JUbFhQIclYqO/getNFTs?owner=${address}&pageSize=100&contractAddresses\[\]=0xefce618f8a5fcc7f083f78eb69514d279042a9b4&withMetadata=true`

  const getcert=async()=>{
    const res=await axios.get(certurl)
    console.log(res.data.ownedNfts)
    setNfts(res.data.ownedNfts)
  }

  return(
    <div className='flex flex-col w-creen h-screen bg-white pt-[5%]' >
        <p className='text-[3vmax] font-bold text-gray-800 ml-[10%]'>My Dashboard</p>
        <div className='grid grid-cols-4 gap-4 mx-[10%]' >
            {
                nfts.map((nft:any,id:number)=>{
                    const url = 'https://cloudflare-ipfs.com/ipfs/'+(nft.metadata.image).toString().slice(7);
                    console.log(url);
                    return(
                        <div className='flex flex-col bg-gray-100 p-3 rounded-xl' >
                            <img src={url} className='rounded-xl m-2' />
                            <p className='text-lg font-bold text-gray-800 mt-2' >{nft.metadata.name}</p>
                            <p className='text-sm font-medium text-gray-600 mt-1' >{nft.metadata.description}</p>
                            <p className='text-sm font-medium text-gray-600 mt-1' >{nft.metadata.issuer}</p>
                            <p className='text-sm font-medium text-gray-600 mt-1' >{nft.metadata.hackathon}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  ) ;
};

export default Dashboard;
