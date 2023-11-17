import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Icon from "../ui/iconography/Icon";
import Heading from "../ui/typography/Heading";
import Text from "../ui/typography/Text";
import Button, { ButtonProps } from "../ui/typography/Button";
import Link from "next/link";

interface TierProps {
    children: React.ReactNode;
    cta: ButtonProps
    items: {label: string; monthly?: boolean; tooltip?: string }[]
    title: string;
}

function Tier({children, cta, items, title}: TierProps) {
    return (
        <div>
            <div className="text-center mb-3 p-5">
                <Heading level={4} className="mb-1">
                    {title}
                </Heading>

                {children}
            </div>

            <div className="bg-gray-100 rounded p-8 lg:h-[260px]">
                <ul className="flex flex-col gap-2 p-1 m-1">
                {items.map((item) => (
						<li key={item.label} className="list-none relative pl-4">
							<abbr title={item.tooltip}>{item.label}</abbr>

							{item.monthly && <span className="text-gray-500 inline-block ml-0.5">/ month</span>}

							<div className="absolute top-0 left-0 text-blurple-400">
								<Icon icon={faCheck} />
							</div>
						</li>
					))}
                </ul>
            </div>

            <div className="flex justify-center mt-2">
				<Button {...cta} />
			</div>

        </div>
    )
}

export default function Pricing() {
    return (
        <div id="pricing" className="relative py-7 sm:py-5 lg:py-6 bg-white-500 mt-8 text-charchoal-500">
			<div className="mx-auto max-w-md px-2 sm:max-w-3xl sm:px-3 lg:max-w-7xl lg:px-4">
			
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<Tier
							title="Start"
							items={[
								{
									label: '0-45 members', 
									tooltip: 'Maximum number of members per organization, including the owner.',
								},
								{ label: 'Roll scheduling and Events', tooltip: 'Maximum number per organization.' },
								// {
								// 	label: '25 projects',
								// 	tooltip:
								// 		'Maximum number of projects aggregated into the registry, across all repositories.',
								// },
								{
									label: 'Belt and Progression tracking',
									tooltip: 'Across all repositories.',
								},
								{ label: 'Analytics and tracking', tooltip: 'Across all repositories.' },
							]}
							cta={{ href: '#', label: 'Get started' }}
						>
							<div className="flex flex-col justify-center gap-2">
								<div>
									<Heading level={2}>Free!</Heading>
									<p className="text-xs pl-2">Per month*</p>
								</div>
							</div>
							
						</Tier>
					</div>
					<div>
						<Tier
							title="Scale"
							items={[
								{ label: '70-100 members', tooltip: 'Get faster replies to support questions.' },
								{
									label: 'Roll scheduling and Events',
									tooltip: 'Increased cost for additional repositories.',
								},
								{ label: 'Data and Analytics', tooltip: 'Across all repositories.' },
								{
									label: 'Belt and Progression tracking',
									tooltip: 'Across all repositories.',
								},
								{
									label: 'Integrated Merch store',
								},
							]}
							cta={{ href: '#', label: 'Upgrade now' }}
						>
							<div className="flex flex-col justify-center gap-2">
								<div>
									<Heading level={2}>Free!</Heading>
									<p className="text-xs pl-2">Per month*</p>
								</div>
								
							</div>
						</Tier>
					</div>
					<div>
						<Tier
							title="Grow"
							items={[
								{
									label: '200+ Members',
								},
						
								{
									label: '15 free repositories',
									tooltip: 'Increased cost for additional repositories.',
								},
								{ label: 'Unlimited CI runs', monthly: true, tooltip: 'Across all repositories.' },
								{
									label: 'Unlimited cloud storage',
									tooltip: 'Across all repositories.',
								},
								{
									label: '+ previous tier',
								},
							]}
							cta={{ disabled: true, label: 'Coming soon' }}
						>
							{/* <div className="flex justify-center gap-2">
								<div>
									<Heading level={1}>$12</Heading>
								</div>
								<div className="text-left">
									per member / repo
									<Text variant="muted">monthly</Text>
								</div>
							</div> */}
							<div className="flex flex-col justify-center gap-2">
								<div>
									<Heading level={2}>Free!</Heading>
									<p className="text-xs pl-2">Per month*</p>
								</div>
							</div>
						</Tier>
					</div>
				</div>

				
			</div>
		</div>
    );
}