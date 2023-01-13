import * as React from 'react';
import { NFTStorage,File } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import { useSigner,useContract } from 'wagmi';
import {ABI} from '../contract/NftABI.js';

interface IMinterProps {
}

const Minter: React.FunctionComponent<IMinterProps> = (props) => {

    const [file, setFile] = React.useState<File | null>(null);
    const [metadata, setMetadata] = React.useState<any>(null);
    const[name, setName] = React.useState<string>('');
    const[description, setDescription] = React.useState<string>('');
    const[issuer, setIssuer] = React.useState<string>('');
    const[hackathon, setHackathon] = React.useState<string>('');
    const[loading, setLoading] = React.useState<boolean>(false);
    const[recipient, setRecipient] = React.useState<string>('');

    const{data:signer}=useSigner();

    const contract = useContract({
        address: '0xeFce618F8A5fCc7f083f78EB69514D279042a9b4',
        abi: ABI,
        signerOrProvider: signer,
    })

    const NFT_API = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFmMTI5MjY3QTA0QjBERUY5M0U0Y2NGQzMwNjUwNDM3ZTI0QmZkRDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzYwOTc5NjI2MSwibmFtZSI6ImNlcm5mdCJ9.2fw-CnuGfDYEXCX-c4BIuHBPzqFM9ep-eHit8idLKDI'

    const uploadNFT = async (file: File | null,name: string,description: string,issuer: string,hackathon: string ) => {
        if(!file) {
            return;
        }
        setLoading(true);
        const client = new NFTStorage({ token: NFT_API });
        const metadata = await client.store({
            name: name,
            description: description,
            issuer: issuer,
            hackathon: hackathon,
            image: file
        });
        setLoading(false);
        setMetadata(metadata);
        console.log(metadata);        
    }

    const mintNFT = async (recipient:string, metadata: any) => {
        if(!metadata) {
            return;
        }
        console.log(recipient);
        setLoading(true);
        const tx = await contract.safeMint(recipient,metadata.url);
        await tx.wait();
        setLoading(false);
        console.log(tx);
    }

  return (
    <div className='flex flex-row w-screen h-screen bg-white p-7' >
        <div className='flex flex-col w-1/2 min:h-screen h-fit ml-[10%]'>
        <p className='text-[3vmax] font-bold text-gray-800 mt-[5%]'>Mint Certificate</p>
            <p className='text-[1.5vmax] font-bold text-gray-800 mt-7'>Name</p>
            <input type='text' className='w-[70%] bg-white text-black border-[1px] px-4 py-2' placeholder='Enter NFT Name' onChange={(e) => setName(e.target.value)} />
            <p className='text-[1.5vmax] font-bold text-gray-800 mt-7'>Description</p>
            <input type='text' className='w-[70%] bg-white text-black border-[1px] px-4 py-2' placeholder='Enter NFT Description' onChange={(e) => setDescription(e.target.value)} />
            <p className='text-[1.5vmax] font-bold text-gray-800 mt-7'>Issuer</p>
            <input type='text' className='w-[70%] bg-white text-black border-[1px] px-4 py-2' placeholder='Enter Issuer Name' onChange={(e) => setIssuer(e.target.value)} />
            <p className='text-[1.5vmax] font-bold text-gray-800 mt-7'>Hackathon</p>
            <input type='text' className='w-[70%] bg-white text-black border-[1px] px-4 py-2' placeholder='Enter Hackathon Name' onChange={(e) => setHackathon(e.target.value)} />
            <p className='text-[1.5vmax] font-bold text-gray-800 mt-7'>Recipient</p>
            <input type='text' className='w-[70%] bg-white text-black border-[1px] px-4 py-2' placeholder='Enter Recipient Address' onChange={(e) => setRecipient(e.target.value)} />
            <p className='text-[1.5vmax] font-bold text-gray-800 mt-7'>Upload Image</p>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
            
            <button className='bg-purple-800 w-[70%] h-fit px-4 py-2 rounded-xl text-1xl mt-7'  >
                {
                    !loading ? (
                        <div className='flex flex-row items-center justify-center ' onClick={()=>uploadNFT(file,name,description,issuer,hackathon)} >
                            <p className='text-white text-1xl'>Upload to IPFS</p>
                        </div>
                    ):(
                        <div className='flex flex-row items-center justify-center ' >
                            <p className='text-white text-1xl'>Uploading...</p>
                            <div className='animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-purple-500 ml-2' ></div>
                        </div>
                    )
                }
                
            </button>
            <button className='bg-purple-800 w-[70%] h-fit px-4 py-2 rounded-xl text-1xl mt-3' >
                {
                    !loading ? (
                        <div className='flex flex-row items-center justify-center ' onClick={()=>mintNFT(recipient,metadata)} >
                            <p className='text-white text-1xl'>Mint NFT</p>
                        </div>
                    ):(
                        <div className='flex flex-row items-center justify-center ' >
                            <p className='text-white text-1xl'>Minting...</p>
                            <div className='animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-purple-500 ml-2' ></div>
                        </div>
                    )
                }
            </button>
        </div>
        <div className='flex flex-col w-1/2  mt-7 items-centr justify-center' >
            <div className='flex flex-col w-fit h-fit p-4 rounded-xl bg-white shadow-lg items-center' >
            {
                file && (
                    <div className='flex flex-col items-center ' >
                        <img src={URL.createObjectURL(file)} className='w-1/2' />
                    </div>
                )
            }
            {
                (name || description || issuer || hackathon)&&(
                    <div className='flex flex-col items-center' >
                        <p className='text-[1vmax] font-medium text-gray-800 mt-1'>Name: {name}</p>
                        <p className='text-[1vmax] font-medium text-gray-800 mt-1'>Description: {description}</p>
                        <p className='text-[1vmax] font-medium text-gray-800 mt-1'>Issuer: {issuer}</p>
                        <p className='text-[1vmax] font-medium text-gray-800 mt-1'>Hackathon: {hackathon}</p>
                    </div>
                )
            }
            </div>
        </div>
    </div>
  );
};

export default Minter;
