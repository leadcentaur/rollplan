import Heading from "@/components/site/ui/typography/Heading";
import BookingWidgetButton from "../../buttons/BookingWidgetButton";
import * as UsersApi from "../../../../network/api/event";
import WidgetButton from "../../buttons/WidgetButton";
import { GetServerSideProps } from "next";
import useRegisteredEvents from "@/hooks/useRegisteredEvents";
import { User } from "@/models/user";
import { CalendarEvent } from "@/models/event";
import { toHumanDate } from "@/utils/utils";
import { toDate } from "date-fns";


export default function BookingsWidget() {

    const {registeredEvents, registeredEventsLoading, registeredEventsLoadingError } = useRegisteredEvents();


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

            { registeredEvents && !registeredEventsLoading &&

            

            <div className="flex flex-row rounded-sm mb-13">

                {registeredEvents.map((event: CalendarEvent, index: number) => (
                    <div>
                        <div>{event.title}</div>
                        <div>{toHumanDate(event.start!)}</div>
                        <div>{registeredEvents.length + ' Upcoming events'}</div>
                    </div>
                ))}
            </div>

            }

        </div>
    );
}