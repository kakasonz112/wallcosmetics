"use client";
import Image from "next/image";
import { TbArrowUpRight } from "react-icons/tb";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function CatalogSwiperSection() {

    return (
        <div className="py-8 lg:py-28">
            <div className="container grid pb-8 lg:grid-cols-2">
                <div className="text-left ">
                    <h1 className="py-4 text-4xl font-medium lg:text-6xl lg:py-0">Korean Film Collection</h1>
                </div>
                <div>
                    <h2 className="pb-6 text-xl font-bold tracking-wider">PREMIUM INTERIOR FILMS FOR EVERY SURFACE</h2>
                    <div className="grid grid-cols-2 text-gray-500 gap-x-8">
                        <div>
                            <p>
                                Our Korean interior films are crafted with cutting-edge technology, delivering stunning finishes that are durable, easy to clean, and simple to install on any surface.
                            </p>
                        </div>
                        <div>
                            <p>
                                From wood grain and marble to solid colours and abstract patterns — each film is designed to transform your space affordably and beautifully.
                            </p>
                            <a href="" className="inline-flex items-center pt-4 text-lg font-bold text-black underline">View Gallery <TbArrowUpRight /> </a>
                        </div>
                    </div>
                </div>
            </div>

            <Swiper
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Autoplay]}

            >
                <SwiperSlide>
                    <Image src="/wallpaper/56119-2C.jpg" alt="LOGO" width={520} height={220} className="w-full" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/wallpaper/56120-2C.jpg" alt="LOGO" width={520} height={220} className="w-full" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/wallpaper/56121-5C.jpg" alt="LOGO" width={520} height={220} className="w-full" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/wallpaper/56122-1C.jpg" alt="LOGO" width={520} height={220} className="w-full" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/wallpaper/56123-3C.jpg" alt="LOGO" width={520} height={220} className="w-full" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}