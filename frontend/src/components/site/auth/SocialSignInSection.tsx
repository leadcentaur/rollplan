import FacebookSignButton from "./FacebookSignButton";
import GoogleSignButton from "./GoogleSignInButton";

export default function SocialSignInSection() {
    return (
        <div className="pt-2">
            <GoogleSignButton/>
            {/* <FacebookSignButton/> */}
        </div>
    );
}