import Image from "next/image";



export default function Projects() {
    const projects = [
        {
            id: 1,
            name: 'Marble Feature Wall — Bodaq Architectural Film',
            description: 'Stunning marble-effect Bodaq architectural film applied to a residential feature wall. A dramatic before-and-after transformation completed with minimal downtime.',
            image: '/image/fb_project1.jpg',
        },
        {
            id: 2,
            name: 'Kitchen Cabinet Makeover — Bodaq Film',
            description: 'Old walnut wood laminate kitchen cabinets refreshed with clean white Bodaq architectural film. Cost-effective renovation without full replacement.',
            image: '/image/fb_project2.jpg',
        },
        {
            id: 3,
            name: 'HDB Main Door Wrap — Wood-Grain Film',
            description: 'HDB main door and gate wrapped in light oak wood-grain Bodaq film for a fresh, modern look. Durable and easy to maintain.',
            image: '/image/fb_project3.jpg',
        },
        {
            id: 4,
            name: "Children's Bedroom — Unicorn Wallpaper",
            description: 'Playful pink unicorn and rainbow wallpaper installed in a child\'s bedroom. A fun and imaginative space created with premium Korean wallpaper.',
            image: '/image/fb_project4.jpg',
        },
        {
            id: 5,
            name: 'Living Room Feature Wall — Woven Texture Wallpaper',
            description: 'Plain white wall transformed with warm woven-texture wallpaper. The subtle pattern adds depth and warmth to the living area.',
            image: '/image/fb_project5.jpg',
        },
        {
            id: 6,
            name: 'TV Wall — Botanical Silver Wallpaper',
            description: 'Living room TV wall refreshed with a luxurious botanical silver-emboss wallpaper, instantly elevating the entire living space.',
            image: '/image/fb_project6.jpg',
        },
        {
            id: 7,
            name: 'HDB Living Room — Wood Slat Effect Film',
            description: 'Bare HDB wall transformed with Bodaq wood slat architectural film, creating a striking feature wall with a natural timber panel appearance.',
            image: '/image/fb_project7.jpg',
        },
    ];
    return (
        <div className="">
            <div className="bg-[url('/wallcosmetics_banner.jpg')] bg-center bg-cover ">
                <h1 className="container py-64 text-6xl font-semibold tracking-widest text-white "></h1>
            </div>
            <div className="container grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">

                {projects.map((project) => (
                    <div key={project.id} className="relative overflow-hidden rounded-xl group">
                        <div>
                            <Image src={project.image} width={480} height={380} alt="" className="w-full" />
                        </div>
                        <div className="absolute bottom-0 flex-col items-center justify-end w-full gap-32 p-12 text-xl text-white transition duration-300 ease-in-out translate-y-full bg-gradient-to-b from-transparent to-black group-hover:translate-y-0">
                            <h1 className="text-2xl font-semibold">{project.name}</h1>
                            <p className="py-4 ">{project.description}</p>
                        </div>
                    </div>


                ))}
            </div>
        </div>
    )
}