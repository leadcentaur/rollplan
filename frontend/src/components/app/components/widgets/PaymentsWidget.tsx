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
                        Payments
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
                                
                            </Text>
                        </div>
                        <div>

                        </div>
                </div>
            </div>
        </div>
    );
}