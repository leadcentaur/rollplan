import PrevArrow from "@/components/site/ui/iconography/PrevArrow";
import NextArrow from "../../site/ui/iconography/NextArrow";


interface NavigationButtonProps {
    pageCount?: number,
    currentPage: number,
    onNextClicked: () => void,
    onPrevClicked: () => void,
}
    

export default function NavigationButton({pageCount, currentPage, onNextClicked, onPrevClicked}: NavigationButtonProps) {

    return (
        <div className="bg-gray-200">
            <div className="flex flex-row mx-auto">
                { currentPage != 0 &&
                    <>
                        <button type="button" onClick={onNextClicked} className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-1 hover:bg-stroke hover:text-white px-3">
                            <div className="flex flex-row align-middle">
                                <PrevArrow/>
                                <p className="ml-2">Prev</p>
                            </div>
                        </button>

                        <button type="button" onClick={onPrevClicked} className="bg-gray-800 text-white rounded-r-md py-1 border-l border-gray-200 hover:bg-stroke hover:text-white px-3">
                            <div className="flex flex-row align-middle">
                                <span className="mr-2">Next</span>
                                <NextArrow/>
                            </div>
                        </button>
                    </>
                }
            </div>
        </div>
    );
}