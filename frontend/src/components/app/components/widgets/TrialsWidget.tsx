import Heading from "@/components/site/ui/typography/Heading";
import WidgetButton from "../../buttons/WidgetButton";
import Text from "@/components/site/ui/typography/Text";

interface TrialsWidgetProps {
    className?: string;
}

export default function TrialsWidget({className}: TrialsWidgetProps) {
    return (
        <div className="rounded-lg border border-stroke bg-white-500 m-5">
            <div>
                <div className="flex justify-between p-5 flex-row bg-gradient-to-b from-slate-900 to-slate-600 p-2 rounded-t-md">
                    <Heading level={3} className="text-white-500">
                        Trial
                    </Heading>
                    <div className="justify-">
                        <WidgetButton buttonTitle="Start Membership"/>
                    </div>
                </div>
            </div>
            <div className="rounded-sm mb-8 mt-8">
                <div className="flex flex-col justify-center items-center">
                        <div className="p-3">
                            <Text className="text-siteGray-400 ">
                                No currently active memberships
                            </Text>
                        </div>
                        <div>
                            <WidgetButton buttonTitle="1 Previous Membership" className="inline-flex items-center rounded-full bg-white-500 shadow shadow-lg text-black-500 py-1 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"/>
                        </div>
                </div>
            </div>
        </div>
    );
}