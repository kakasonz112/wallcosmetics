import Image from "next/image";



export default function Projects() {
    const projects = [
        {
            id: 1,
            name: 'Residential Feature Wall — Petaling Jaya',
            description: 'Full living room feature wall wrapped in Korean wood-grain film. Clean, warm finish completed in a single day.',
            image: '/wallpaper/56137-3C.jpg',
            link: '',
        },
        {
            id: 2,
            name: 'Commercial Office Fit-Out — KL City',
            description: 'Stone-effect Korean interior film applied to reception columns and partition walls for a modern corporate look.',
            image: '/wallpaper/56139-3C.jpg',
            link: '',
        },
        {
            id: 3,
            name: 'Café Interior Revamp — Subang',
            description: 'Full café wall and ceiling refresh using a mix of fabric-texture and solid-colour Korean films. Transformed in two days.',
            image: '/wallpaper/56140-3C.jpg',
        },
    ];
    return (
        <div className="">
            <div className="bg-[url('/wallcosmetics_banner.jpg')] bg-center bg-cover ">
                <h1 className="container py-64 text-6xl font-semibold tracking-widest text-white "></h1>
            </div>
            <div className="container grid grid-cols-2 gap-8 py-8">

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