import Image from 'next/image';
import React from 'react';

export default function Screenshots() {
    return (
        <> 
            <div className='pt-10 hover:scale-105 transition duration-200'>
                <Image
                    src="https://i.imgur.com/7mt9unK.jpg"
                    alt="Dashboard screen shot example."
                    className='block shadow-2xl rounded-xl'
                    width={600}
                    height={500}
                />
            </div>

        </>
    )
}