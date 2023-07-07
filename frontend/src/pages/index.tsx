import React from "react";
import cx from 'clsx';

import { 
  faUniformMartialArts, 
  faCalendarUsers, 
  faBagsShopping, 
  faDisplayChartUp, 
  faDisplayChartUpCircleDollar, 
  faMoneyCheckDollarPen } 
from '@fortawesome/pro-solid-svg-icons'

import Screenshots from "@/components/site/home/ScreenShots";
import Features, { Feature } from "@/components/site/home/Features";
import ProductSection from "@/components/site/home/ProductSection";
import { faArrowUp, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Pricing from "@/components/site/home/Pricing";
import Image from "next/image";

const flowFeatures: Feature[] = [
	{
		title: 'Artifact caching',
		icon: faArrowUp,
		description: 'Cache build artifacts between CI runs to reduce job times and overall costs.',
	},
	{
		title: 'Run history',
		icon: faArrowUp,
		description:
			'Track CI runs to detect flakiness, regressions, and time spent on task execution.',
		status: 'new',
	},
	{
		title: 'Remote distribution',
		icon: faArrowUp,
		description: 'Distribute task execution across multiple remote agents to increase throughput.',
		status: 'coming-soon',
	},
]

export default function Home() {
    return (
		<div>
			<div className="bg-gradient-to-b from-slate-900 to-slate-600">
					<div className="max-w-7xl mx-auto py-10 px-4 pb-6 sm:py-12 sm:px-6 md:py-14 lg:py-16 lg:px-8 xl:py-20 flex flex-col justify-center items-center">
						<h1 className="text-white sm:text-sm flex-no-shrink fill-current">
							<svg xmlns="http://www.w3.org/2000/svg" className="sm:h-20 sm:h-40" version="1.1" viewBox="0 0 11.10195308080719 2.863319001562566"><g transform="matrix(1,0,0,1,2.7037293714023334,0.8961595007812829)"><g><path d=" M 0.0915 1.0709999999999997 L 0.0915 0.005999999999999783 L 0.5805 0.005999999999999783 Q 0.6585 0.005999999999999783 0.7245 0.037499999999999645 Q 0.7905 0.06899999999999973 0.8385 0.12224999999999975 Q 0.8865000000000001 0.17549999999999966 0.9127500000000001 0.24149999999999971 Q 0.9390000000000001 0.30749999999999966 0.9390000000000001 0.37499999999999967 Q 0.9390000000000001 0.43649999999999967 0.921 0.4934999999999997 Q 0.903 0.5504999999999998 0.8685 0.5977499999999998 Q 0.834 0.6449999999999998 0.786 0.6794999999999998 L 1.0110000000000001 1.0709999999999997 L 0.6900000000000001 1.0709999999999997 L 0.5025000000000001 0.7439999999999998 L 0.384 0.7439999999999998 L 0.384 1.0709999999999997 L 0.0915 1.0709999999999997 M 0.384 0.48899999999999977 L 0.5685 0.48899999999999977 Q 0.5865 0.48899999999999977 0.603 0.4754999999999997 Q 0.6195 0.46199999999999974 0.63075 0.43649999999999967 Q 0.642 0.4109999999999997 0.642 0.37499999999999967 Q 0.642 0.3374999999999997 0.62925 0.31274999999999975 Q 0.6165 0.2879999999999997 0.59775 0.27449999999999974 Q 0.579 0.2609999999999997 0.561 0.2609999999999997 L 0.384 0.2609999999999997 L 0.384 0.48899999999999977 M 1.5855234375 1.0799999999999996 Q 1.4640234375 1.0799999999999996 1.3650234375 1.0342499999999997 Q 1.2660234375000001 0.9884999999999997 1.1947734375 0.9112499999999997 Q 1.1235234375 0.8339999999999997 1.0852734375000002 0.7372499999999997 Q 1.0470234375 0.6404999999999997 1.0470234375 0.5369999999999997 Q 1.0470234375 0.43049999999999977 1.0875234375 0.3344999999999997 Q 1.1280234375000002 0.2384999999999997 1.2007734375 0.16274999999999973 Q 1.2735234375000002 0.08699999999999974 1.3732734375000002 0.04349999999999965 Q 1.4730234375000002 -2.220446049250313e-16 1.5915234375000002 -2.220446049250313e-16 Q 1.7130234375000002 -2.220446049250313e-16 1.8120234375000002 0.045749999999999735 Q 1.9110234375000001 0.09149999999999969 1.9815234375000002 0.16949999999999976 Q 2.0520234375 0.24749999999999972 2.0902734375 0.3442499999999997 Q 2.1285234375 0.4409999999999997 2.1285234375 0.5429999999999997 Q 2.1285234375 0.6479999999999997 2.0887734375000004 0.7439999999999998 Q 2.0490234375 0.8399999999999997 1.9762734375000002 0.9157499999999997 Q 1.9035234375 0.9914999999999997 1.8045234375 1.0357499999999997 Q 1.7055234375000001 1.0799999999999996 1.5855234375 1.0799999999999996 M 1.3440234375000002 0.5399999999999997 Q 1.3440234375000002 0.5939999999999996 1.3590234375 0.6442499999999998 Q 1.3740234375 0.6944999999999997 1.4040234375000002 0.7342499999999997 Q 1.4340234375 0.7739999999999998 1.4797734375 0.7972499999999998 Q 1.5255234375000002 0.8204999999999998 1.5885234375000001 0.8204999999999998 Q 1.6515234375000003 0.8204999999999998 1.6980234375000003 0.7964999999999998 Q 1.7445234375000003 0.7724999999999997 1.7737734375 0.7312499999999997 Q 1.8030234375000003 0.6899999999999997 1.8172734375000001 0.6397499999999997 Q 1.8315234375 0.5894999999999997 1.8315234375 0.5369999999999997 Q 1.8315234375 0.48299999999999976 1.8165234375000001 0.43349999999999966 Q 1.8015234375000002 0.3839999999999997 1.7715234375000002 0.3442499999999997 Q 1.7415234375000002 0.30449999999999966 1.6950234375000002 0.2819999999999997 Q 1.6485234375000002 0.25949999999999973 1.5870234375 0.25949999999999973 Q 1.5240234375000001 0.25949999999999973 1.4782734375000002 0.28349999999999975 Q 1.4325234375 0.30749999999999966 1.4025234375000002 0.3472499999999997 Q 1.3725234375000002 0.3869999999999997 1.3582734375 0.4372499999999997 Q 1.3440234375000002 0.4874999999999997 1.3440234375000002 0.5399999999999997 M 2.26804541015625 1.0709999999999997 L 2.26804541015625 0.005999999999999783 L 2.56054541015625 0.005999999999999783 L 2.56054541015625 0.8159999999999997 L 3.0435454101562502 0.8159999999999997 L 3.0435454101562502 1.0709999999999997 L 2.26804541015625 1.0709999999999997 M 3.1605783691406253 1.0709999999999997 L 3.1605783691406253 0.005999999999999783 L 3.4530783691406253 0.005999999999999783 L 3.4530783691406253 0.8159999999999997 L 3.9360783691406254 0.8159999999999997 L 3.9360783691406254 1.0709999999999997 L 3.1605783691406253 1.0709999999999997 M 4.053111328125 1.0709999999999997 L 4.053111328125 0.005999999999999783 L 4.512111328125 0.005999999999999783 Q 4.590111328125 0.005999999999999783 4.656111328125 0.037499999999999645 Q 4.722111328125001 0.06899999999999973 4.770111328125001 0.12224999999999975 Q 4.818111328125001 0.17549999999999966 4.844361328125 0.24149999999999971 Q 4.870611328125 0.30749999999999966 4.870611328125 0.37499999999999967 Q 4.870611328125 0.4694999999999997 4.826361328125 0.5534999999999998 Q 4.7821113281250005 0.6374999999999997 4.703361328125 0.6907499999999998 Q 4.624611328125001 0.7439999999999998 4.519611328125 0.7439999999999998 L 4.345611328125001 0.7439999999999998 L 4.345611328125001 1.0709999999999997 L 4.053111328125 1.0709999999999997 M 4.345611328125001 0.48899999999999977 L 4.5001113281250005 0.48899999999999977 Q 4.518111328125 0.48899999999999977 4.534611328125001 0.4784999999999997 Q 4.551111328125001 0.46799999999999975 4.562361328125 0.44249999999999967 Q 4.573611328125001 0.4169999999999997 4.573611328125001 0.37499999999999967 Q 4.573611328125001 0.32999999999999974 4.560861328125 0.3052499999999997 Q 4.5481113281250005 0.28049999999999975 4.529361328125001 0.2707499999999997 Q 4.510611328125001 0.2609999999999997 4.492611328125 0.2609999999999997 L 4.345611328125001 0.2609999999999997 L 4.345611328125001 0.48899999999999977 M 5.002590087890625 1.0709999999999997 L 5.002590087890625 0.005999999999999783 L 5.2950900878906255 0.005999999999999783 L 5.2950900878906255 0.8159999999999997 L 5.778090087890625 0.8159999999999997 L 5.778090087890625 1.0709999999999997 L 5.002590087890625 1.0709999999999997 M 6.141123046875 0.005999999999999783 L 6.468123046875 0.005999999999999783 L 6.807123046875 1.0709999999999997 L 6.510123046875 1.0709999999999997 L 6.445623046875 0.8624999999999997 L 6.162123046875 0.8624999999999997 L 6.0991230468749995 1.0709999999999997 L 5.800623046875 1.0709999999999997 L 6.141123046875 0.005999999999999783 M 6.399123046875 0.6674999999999998 L 6.304623046875 0.29249999999999976 L 6.205623046875 0.6674999999999998 L 6.399123046875 0.6674999999999998 M 7.203111328125001 0.5474999999999998 L 7.203111328125001 1.0709999999999997 L 6.910611328125 1.0709999999999997 L 6.910611328125 0.005999999999999783 L 7.138611328125 0.005999999999999783 L 7.566111328125 0.5474999999999998 L 7.566111328125 0.005999999999999783 L 7.858611328125001 0.005999999999999783 L 7.858611328125001 1.0709999999999997 L 7.626111328125001 1.0709999999999997 L 7.203111328125001 0.5474999999999998" fill="#ffffff" fillRule="nonzero"></path></g><g></g><g clipPath="url(&quot;#SvgjsClipPath1001&quot;)"><g clipPath="url(&quot;#SvgjsClipPath1000279384c9-94c7-40bd-993b-a35bb83ba848&quot;)"><path d=" M -1.3818780693905026 -0.02561178846178347 L -1.0289424477508695 -0.12019637312784132 C -0.7248304879102889 -0.20162919649747538 -0.5425074408968598 0.29147177156157134 -1.0738025650496297 0.4707320796429566 C -1.4395296257583852 0.5937821202656562 -1.5618590219264874 1.067245526936893 -1.1851421332851033 0.9661751421794488 C -1.0498411369342289 0.9301429194495224 -0.8026600890069309 0.8685278185813473 -0.8675180899207999 1.113907255372149 C -0.9646249301779526 1.4763914160352112 -0.8059029890526248 1.3423515474798844 -0.6378126700175168 1.1301217556006158 C -0.5024080346429349 0.9596155484669554 -0.42087036152264745 0.7526353013154558 -0.40360322227299306 0.5355900805568243 C -0.37168750041932475 0.28979169515457515 -0.4459511057140806 0.04203224509815662 -0.6078089249968937 -0.1456843122557589 C -0.7696667442797067 -0.33340086960967474 -1.0038024641478815 -0.44331125513099856 -1.2516215842218184 -0.44790943885652473 C -1.6560832843652449 -0.4480895999701743 -1.7542710913042945 0.07419746850011355 -1.3818780693905026 -0.02561178846178347 Z" fill="#bf0000" transform="matrix(1,0,0,1,0,0)" fillRule="evenodd"></path></g><g clipPath="url(&quot;#SvgjsClipPath1000279384c9-94c7-40bd-993b-a35bb83ba848&quot;)"><path d=" M -1.2739615623143716 1.0966117884617836 L -1.6268971839540045 1.1910162120141918 C -1.9310091437945858 1.2726291964974759 -2.113332190808015 0.7793480673247791 -1.5818569055415963 0.6002679203570435 C -1.2163100059464902 0.47703771862069444 -1.0938004486647386 0.0035743119494576203 -1.470697498419772 0.10464469670690191 C -1.6059984947706465 0.14067691943682858 -1.8531795426979445 0.20229202030500326 -1.7883215417840757 -0.04290725537214807 C -1.6912147015269237 -0.40557157714886016 -1.8499366426522499 -0.2713515474798835 -2.0180269616873585 -0.0593019167142646 C -2.1534602832746312 0.1111877417756405 -2.2350015357243738 0.3181770749172913 -2.2522364094318816 0.5352297583295265 C -2.2842078490185966 0.7810568547505926 -2.2099697017622844 1.0288658710417131 -2.0481056087544336 1.2166240923765068 C -1.8862415157465806 1.4043823137113 -1.6520729364261846 1.5143172377449785 -1.404218047483057 1.5189094388565247 C -0.9995761862259795 1.5190895999701741 -0.9013883792869302 0.996622370386237 -1.2739615623143716 1.0966117884617836 Z" fill="#bf0000" transform="matrix(1,0,0,1,0,0)" fillRule="evenodd"></path></g></g></g><defs><clipPath id="SvgjsClipPath1001"><path d=" M -2.2556594705912247 -0.4480895999701743 h 1.8556594705912248 v 1.9671791999403483 h -1.8556594705912248 Z"></path></clipPath><clipPath id="SvgjsClipPath1000279384c9-94c7-40bd-993b-a35bb83ba848"><path d=" M -2.2556594705912247 -0.4480895999701743 L -0.3999999999999999 -0.4480895999701743 L -0.3999999999999999 1.5190895999701741 L -2.255659470591225 1.5190895999701741 Z"></path></clipPath></defs></svg>
						</h1>

						<h2 className="mb-3 text-white-500 font-medium text-center text-3xl sm:text-4xl md:text-5xl">
							A New era of Ju-jitsu gym management
						</h2>

						<p className="mm-0 text-white-500 text-md text-center opacity-60 px-4 sm:text-lg md:text-xl md:max-w-3xl">
							Built specifically for ju-jitsu academy&apos;s and gyms, From signup to subscription, rollplan is a better way to manage your gym, save  time,
							and boost your business.
						</p>
					</div>

				<div>
				</div>
			</div>

			<main className="bg-gradient-to-b from-slate-600 via-blurple-600 to-white">
				<ProductSection
					id=""
					color=""
					suptitle="A system for a solid foundation"
					title="Supercharge your gym"
          logo={<Image src="https://i.imgur.com/9r0Ebbx.png" height={40} width={120} className="block" alt="The rollplan logo"/>}
					description={
						<>
							Rollplan streamlines BJJ gym management, from class scheduling and belt tracking to student management and revenue reporting, so you can focus on what matters most to your students.
						</>
					}
					cta={{
						children: 'Get started today',
						color: 'bg-red-500',
						href: '/',
					}}
					items={[
						{
							description:
								"Rollplan's customizable progression trackers keep you updated on member progress and incentivize hard work with rewards.",
							icon: faUniformMartialArts,
							title: 'Belt & Progression tracking',
						},
						{
							description:
								'Organize your rolls, events and seminars. Simplify event planning and management.',
							icon: faCalendarUsers,
							title: 'Scheduling and event organization',
						},
						{
							description: (
								<>
									Rollplan streamlines BJJ gym management and includes an easy store system for selling merchandise within the platform
								</>
							),
							icon: faBagsShopping,
							title: 'Integrated merch shop',
						},
					]}
				/>

				

				<ProductSection
					reversed
					stretched
					id=""
					color="text-charchoal-700"
					logo={<Image src="https://i.imgur.com/9r0Ebbx.png" height={40} width={120} className="block" alt="The rollplan logo"/>}
					suptitle="Transform your gym, empower your students, succeed."
					title="Transform your gym"

					cta={{
						children: 'Request a walkthrough',
						color: 'bg-red-500',
						href: '/home',
					}}
					
					description={
						<>
							Maximize your BJJ gym&apos;s potential with Rollplan&apos;s all-in-one software, providing seamless student management, class scheduling, revenue tracking, and more for your growing business.
						</>
					}
					
				>
					<div className="relative sm:pb-8 h-full">
						<Screenshots/>
					</div>
				</ProductSection>


				<ProductSection
					id=""
					color="text-blurple-400"
					suptitle="A system for a solid foundation"
					title="Membership management and marketing"
					logo={<Image src="https://i.imgur.com/9r0Ebbx.png" height={40} width={120} className="block" alt="The rollplan logo"/>}
					description={
						<>
							Remove the hassle of marketing management and branding, through our partners rollplan will elevate your acdemy's prescense on social media and beyond.
						</>
					}
					cta={{
						children: 'Get started today',
						color: 'bg-red-500',
						href: '/home',
					}}
					items={[
						{
							description: 'Attract new members and promote your gym with our easy to use marketing management platform.',
							icon: faDisplayChartUpCircleDollar,
							title: 'Marketing and promotion',
						},
						{
							description: 'Track billing, student progress and class anlaystics through our easy to use dashboard management system.',
							icon: faChartSimple,
							title: 'Data and Analytics',
						},
						{
							description: 'Download, install, and run tools with lightspeed, thanks to our Rust based foundation',
							icon: faMoneyCheckDollarPen,
							title: 'Simplified Billing',
						},
					]}
				/>
				
	

				<Pricing/>
				
			</main>
		</div>

		

    );
}