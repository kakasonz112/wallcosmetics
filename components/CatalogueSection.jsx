"use client";
import Image from "next/image";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function CatalogueSection() {
    const items = [
        {
            id: "01",
            catagory: "WOOD GRAIN",
            title: "Natural Wood Texture",
            image: "/wallpaper/56113-5C.jpg",
            description: "Realistic wood-grain interior film — warm, natural tones that bring organic beauty to any surface.",
        },
        {
            id: "02",
            catagory: "STONE & MARBLE",
            title: "Marble Stone Finish",
            image: "/wallpaper/56116-2C.jpg",
            description: "Luxurious stone and marble patterns that add elegance to walls, counters, and furniture.",
        },
        {
            id: "03",
            catagory: "FABRIC & LEATHER",
            title: "Soft Fabric Weave",
            image: "/wallpaper/56117-2C.jpg",
            description: "Premium fabric and leather-effect films for a sophisticated, tactile finish in any room.",
        },
        {
            id: "04",
            catagory: "SOLID COLOURS",
            title: "Clean Solid Palette",
            image: "/wallpaper/56118-2C.jpg",
            description: "Hundreds of solid-colour films — matte, gloss, and satin — for a crisp, minimal look.",
        },
    ]

    return (
        <div className="grid gap-8 divide-gray-300 lg:divide-x lg:gap-0 lg:grid-cols-4 md:grid-cols-2">
            {items.map((item) => (
                <div key={item.id} className="relative overflow-hidden group">
                    <div>
                        <Image src={item.image} width={380} height={100} alt="" className="w-full " />
                    </div>
                    <div className="absolute top-0 p-8 m-12 bg-white bg-opacity-60 backdrop-blur">
                        <div className="flex justify-between pb-4 ">
                            <p className="text-sm">{item.catagory}</p>
                            <span className="text-sm ">{item.id}</span>
                        </div>
                        <a className="block text-xl font-semibold" href="">{item.title}</a>
                        <p className="py-4 text-gray-500">{item.description}</p>
                        <a className="inline-flex items-center font-medium" href="">See Details <TbArrowNarrowRight className="ml-2 text-xl " /></a>
                    </div>

                    <div className="inset-0 flex-col items-center justify-end hidden gap-32 pb-16 text-xl transition duration-300 ease-in-out border-b-2 md:flex md:absolute group-hover:translate-y-full md:border-b-0 bg-zinc-100">
                        <p className="tracking-wider -rotate-90 ">{item.catagory} </p>
                        <span className="">
                            {item.id}
                        </span>

                    </div>
                </div>
            ))}
        </div>
    )
}