import Icon from "@/components/site/ui/iconography/Icon";
import { faCartShoppingFast } from "@fortawesome/pro-solid-svg-icons";


export default function PurchaseIconButton() {
    return (
        <div
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <span>
          <Icon className="text-lg" icon={faCartShoppingFast}/>
        </span>
        $200
      </div>
    );
}