"use client";

import React, { useState } from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import Image from 'next/image';
import styles from "@/app/ui/home/assuranceSection/assurance.module.css"
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
 


const slideLeft = () => {
    let slider = document.getElementById('slider');
    if (slider) {
        slider.scrollLeft -= 235; // Adjust the scroll amount
    }
};

const slideRight = () => {
    let slider = document.getElementById('slider');
    if (slider) {
        slider.scrollLeft += 235; // Adjust the scroll amount
    }
};

export default function AssuranceSection() {
    const filteredItems = [
        // Add your product data (images, descriptions, prices) here
        // Example:
        { id: 1, img: '/Anytime-1.jpg', description: 'Camera', price: 200 },
        { id: 2, img: '/Appointment.webp', description: 'Camera', price: 200 },
        { id: 3, img: '/Comfortable.webp', description: 'Camera', price: 200 },
        { id: 4, img: '/security.webp', description: 'Camera', price: 200 },
        { id: 5, img: '/Travel.webp', description: 'Camera', price: 200 }
        // Add more items as needed
      ];
    
    
    return (
        <section>
            <div className="trending">
        
                <Carousel showThumbs={false} autoPlay centerMode centerSlidePercentage={50}>
                    {filteredItems.map((item) => (
                        <div key={item.id} className={styles.slideItem}>
                            <Image
                                src={item.img}
                                fill={true}
                                alt="Image of a doctor"
                                sizes="640px" 
                                className={styles.img}
                            />
                    
                        </div>
                    ))}
                </Carousel>
                
                
            
            </div>

        </section>
        
    )
}




// {/* <div className={styles.slideContainer} id="slider">
                    // {filteredItems.map((item) => (
                    //     <div key={item.id} className={styles.slideItem}>
                    //         <Image
                    //             src={item.img}
                    //             layout="fill"
                    //             alt="Image of a doctor"
                    //             style={{objectFit: "cover"}}
                    //         />
                    
                    //     </div>
                    // ))}
                // </div> */}