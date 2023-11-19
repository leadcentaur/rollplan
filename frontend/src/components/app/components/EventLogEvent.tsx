import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function EventlogEvent() {
    return (
        <div>
                        {/* <FontAwesomeIcon icon={faInfoCircle} className="text-xl"/> */}
                    
                            <div className="p-10">
                            <div className="group relative">
                                <FontAwesomeIcon className="text-lg text-center" icon={faInfoCircle}/>
                                <span
                                className="pointer-events-none absolute bg-stroke rounded-lg p-1 -top-7 w-max opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                This is a button.
                                </span>
                            </div>
                            </div>
                    </div>
    );
}