import Link from "next/link";


export default function Footer() {

    return (
        <div className="bg-zinc-100">
            <div className="container lg:grid lg:grid-cols-2 py-14">
                <div className="grid gap-4 pb-4 text-left lg:pb-0 lg:grid-cols-2">
                    <div>
                        <h2 className="pb-4 text-xl font-semibold">COMPANY</h2>
                        <div className="flex flex-col ">
                            <Link className="py-1 hover:underline" href="/about">About Us</Link>
                            <Link className="py-1 hover:underline" href="/catalog">Catalog</Link>
                            <Link className="py-1 hover:underline" href="/projects">Projects</Link>
                            <Link className="py-1 hover:underline" href="/gallery">Gallery</Link>
                            <Link className="py-1 hover:underline" href="/contact">Contact</Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="pb-4 text-xl font-semibold">CONNECT</h2>
                        <div className="flex flex-col ">
                            <a className="py-1 hover:underline" href="https://www.facebook.com/wallcosmestics" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm text-gray-500">enquiry@wallcosmetics.com.sg</p>
                            <p className="text-sm text-gray-500 mt-1">+65 9649 7929</p>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Copy Right */}
            <div className="py-10 bg-zinc-200">
                <div className="container text-center text-gray-500 lg:justify-between lg:flex">
                    <div className="pb-4 lg:pb-0">
                        <p>&copy;2022 Wall Cosmetics. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
