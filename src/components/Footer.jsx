import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {

    return (
        <footer className="w-full bg-gray-800 flex items-center justify-center p-4 text-white flex-col mt-auto">
            <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-7">

                {/* About */}
                <div >
                    <h2 className="text-lg">About Us</h2>
                    <p className="mt-2">
                        CineGalaxy is your destination for the latest blockbusters and indie gems. 
                    Enjoy top-notch cinema experiences with comfy seats, premium sound, and exclusive screenings.
                    </p>

                </div>

                {/* Contact */}
                <div className="flex flex-col">
                    <h2 className="text-lg">Contact Us</h2>
                    
                    <div className="flex items-center mt-2">
                        <Phone className="text-blue-400 w-4 h-4 mr-2" />
                        <span>(555) 123-45674</span>
                    </div>

                    <div className="flex items-center">
                        <Mail className="text-blue-400 w-4 h-4 mr-2" />
                        <span>support@cinegalaxy.com</span>
                    </div>

                    <div className="flex items-center">
                        <MapPin className="text-blue-400 w-4 h-4 mr-2" />
                        <span>456 Movie Blvd, Film City</span>
                    </div>
                </div>

                {/* Store Hours */}

                <div>
                    <h2 className="text-lg">Theater Hours</h2>
                    <p className="mt-2">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                </div>

            </div>

            {/* Copyright */}
            <div className="border-t p-5 w-full text-center">
                <p>© 2025 CineGalaxy. All rights reserved.</p>
            </div>

        </footer>
    )
}