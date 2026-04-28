import Image from 'next/image'
import { TbArrowUpRight } from "react-icons/tb"
export default function About() {
    return (
        <div>
            <div className="bg-[url('/wallcosmetics_banner.jpg')] bg-center bg-cover ">
                <h1 className="container py-32 text-6xl font-semibold tracking-widest text-center text-white lg:py-64 lg:text-left "></h1>
            </div>
            <div className="container ">
                <div className="py-4 lg:py-14">
                    <h2 className="p-4 text-3xl font-semibold text-center lg:p-20 lg:text-5xl">Singapore's Trusted Korean Wallpaper Specialist</h2>
                    <p className="text-2xl font-medium lg:w-1/2">
                        Wall Cosmetics is an authorised supplier of premium Korean interior films and wallpapers in Singapore. We offer a vast catalogue of textures, finishes, and patterns — sourced directly from Korea's leading manufacturers — for both residential and commercial applications.
                    </p>
                </div>
                <div className="items-center lg:flex gap-x-8">
                    <div className="w-full">
                        <Image src="/wallpaper/56128-4C.jpg" width={700} height={700} alt="" className="" />
                    </div>
                    <div className="">
                        <p className="pb-8 tracking-wide">
                            We started Wall Cosmetics with a simple belief: that beautiful, high-quality wall finishes should be accessible to everyone. Korean interior films offer the look of real wood, stone, and fabric at a fraction of the cost — and we're here to bring that to Singapore homes and businesses.
                            <br />
                            <br />

                            Our team helps clients from product selection all the way to installation, ensuring every project is completed to the highest standard. Whether you're renovating a single room or fitting out an entire commercial space, we have the expertise and the stock to deliver.
                            <br />
                            <br />
                            <span className="text-xl font-extrabold tracking-tight">At Wall Cosmetics, we believe every surface is an opportunity to create something beautiful.</span>
                        </p>
                        <a className="inline-flex items-center gap-1 px-6 py-3 text-sm text-white rounded-full shadow-lg bg-gray-950 hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2" href="">Read More <TbArrowUpRight className="text-xl" /> </a>


                    </div>
                </div>
                <div className="lg:py-20">
                    <div className="pt-8 pb-4">
                        <h1 className="text-4xl font-bold tracking-wider text-center">WHAT WE DO</h1>
                    </div>
                    <div className="grid gap-20 py-8 lg:grid-cols-3">
                        <div className="border-2 border-gray-500 ">
                            <div className="-m-0.5 p-4 text-center transition hover:-translate-y-3 hover:-translate-x-3 aspect-square bg-zinc-100 ">
                                <Image src="/wallpaper/56132-3C.jpg" width={200} height={200} alt="" className="mx-auto rounded-full " />
                                <h2 className="py-4 text-2xl font-semibold " >PRODUCT SOURCING</h2>
                                <p className="text-sm text-gray-400">
                                    We work directly with Korean manufacturers to bring you the freshest collections and exclusive patterns.
                                </p>
                            </div>
                        </div>
                        <div className="border-2 border-gray-500 ">
                            <div className="-m-0.5 p-4 text-center transition hover:-translate-y-3 hover:-translate-x-3 aspect-square bg-zinc-100 ">
                                <Image src="/wallpaper/56133-3C.jpg" width={200} height={200} alt="" className="mx-auto rounded-full " />
                                <h2 className="py-4 text-2xl font-semibold " >EXPERT CONSULTATION</h2>
                                <p className="text-sm text-gray-400">
                                    Our team helps you choose the right film for your surface, lighting, and style — every time.
                                </p>
                            </div>
                        </div>
                        <div className="border-2 border-gray-500 ">
                            <div className="-m-0.5 p-4 text-center transition hover:-translate-y-3 hover:-translate-x-3 aspect-square bg-zinc-100 ">
                                <Image src="/wallpaper/56135-1C.jpg" width={200} height={200} alt="" className="mx-auto rounded-full " />
                                <h2 className="py-4 text-2xl font-semibold " >INSTALLATION SUPPORT</h2>
                                <p className="text-sm text-gray-400">
                                    From DIY guides to professional installation teams, we ensure a flawless finish on every project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}