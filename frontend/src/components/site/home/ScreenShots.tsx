import Image from 'next/image';
import React from 'react';

export default function Screenshots() {
    return (
        <>
            <div className="overflow-hidden rounded-lg w-[100%] sm:w-[65%] md:w-full lg:w-[75%] bg-[#000e19] p-1">
                <Image
                    src="https://i.imgur.com/7mt9unK.jpg"
                    alt="Dashboard screen shot example."
                    className='block'
                    width={200}
                    height={200}
                />
                <Image
                    src="https://i.imgur.com/7mt9unK.jpg"
                    alt="Dashboard screen shot example."
                    className='block'
                    width={200}
                    height={200}
                />
			</div>

            <div className="overflow-hidden rounded-lg w-[100%] sm:w-[65%] md:w-full lg:w-[75%] bg-[#000e19] p-1 absolute bottom-0 right-0 z-10 hidden sm:block">
                 <Image
                    src="https://i.imgur.com/7mt9unK.jpg"
                    alt="Dashboard screen shot example."
                    className='block'
                    width={200}
                    height={200}
                />
			</div>
        </>
    )
}