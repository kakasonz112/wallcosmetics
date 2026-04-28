import Image from "next/image";

export default function AboutComponent() {
    return (
        <div className="container py-16">
            <div className="flex items-center justify-between pb-4">
                <a className="py-4 text-3xl font-extrabold leading-tight text-gray-800 lg:text-5xl" href="">Premium surfaces, <br />Korean craftsmanship</a>
                <p className="tracking-wider text-gray-400">CERTIFIED SUPPLIER</p>
            </div>
            <div className="grid lg:grid-cols-2 place-items-center ">
                <div>
                    <Image src="/wallpaper/56124-5C.jpg" width={900} height={500} alt="" className="max-md:hidden" />
                </div>

                <div className="items-center">
                    <p className="px-12 pb-4 ">
                        At Wall Cosmetics, we aim to provide affordable yet durable wallpaper to all residential and commercial clients. As an authorised distributor of premium Korean interior films, our products are trusted by homeowners, contractors, and commercial fit-out teams. We carry a wide range of textures — wood, stone, fabric, metal, and solid colours — all designed to last.
                    </p>
                    <div className="flex px-12 pt-4 gap-x-4 ">
                        <Image src="/wallpaper/56125-3C.jpg" width={100} height={80} alt="" className=" h-[100px]" />
                        <Image src="/wallpaper/56126-1C.jpg" width={100} height={80} alt="" className=" h-[100px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}