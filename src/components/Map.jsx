import { MapaCines } from "../components/MapaCines.jsx";

export function Map() {
    return (
        <>
            <div className="w-full pt-20">
                <div className="flex justify-between items-center px-10 py-5">
                    <h1 className="font-semibold text-4xl m-5">Cines cerca de ti</h1>
                </div>


                

                <MapaCines />
             
            </div>

        </>
    )

}