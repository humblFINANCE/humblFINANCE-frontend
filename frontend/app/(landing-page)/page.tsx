import HumblFinanceHeading from "@/components/landing-page/HumblFinanceHeading";
import { title } from "@/components/Primitives";

export default function HomePage() {
	return (
		<section className="flex flex-col items-center justify-center gap-1">
				<HumblFinanceHeading />
				<br />
			<div className="inline-block w-full text-center">
				<h2 className={title({ size: "xs" })}>
					a modern investing framework built for everyone
				</h2>
			</div>
		</section>
	);
}
