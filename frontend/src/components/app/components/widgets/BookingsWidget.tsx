import Heading from "@/components/site/ui/typography/Heading";
import BookingWidgetButton from "../../buttons/BookingWidgetButton";
import WidgetButton from "../../buttons/WidgetButton";

interface BookingProps {
    className?: string;
}

export default function BookingsWidget({className}: BookingProps) {
    return (
        <div className="rounded-lg border border-stroke bg-white-500 mb-5 mt-5 shadow-default">
            <div>
                <div className="flex justify-between p-5 flex-row bg-gradient-to-b from-slate-900 to-slate-600 p-2 rounded-t-md">
                    <Heading level={3} className="text-white-500">
                        Bookings
                    </Heading>
                    <div className="justify-">
                        <WidgetButton buttonTitle="Bookings"/>
                    </div>
                </div>
            </div>
            <div className="rounded-sm mb-13">

            </div>
        </div>
    );
}