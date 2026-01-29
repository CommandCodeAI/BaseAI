export const runtime = 'edge';

import Content from '../../../components/content';
import learnContent from '../../../../content/learn/learn.json';
import { ContentT } from '@/types/markdown';

export default async function SingleDocPage({
	params
}: {
	params: Promise<{ section: string }>;
}) {
	const { section } = await params;
	let content: ContentT;

	if (process.env.NODE_ENV === 'production') {
		const docContent = learnContent.find(
			doc => doc.slug === section && doc.section === 'learn'
		);

		content = docContent?.content;
	} else {
		// dynamically import the file
		const { getContentBySlugOnDev } = await import('@/lib/get-content-by-slug-on-dev');

		let data = await getContentBySlugOnDev({
			type: 'learn',
			slug: section,
			section: 'learn',
		});

		if (!data.content) {
			data = await getContentBySlugOnDev({
				type: 'learn',
				slug: 'index',
				section: section
			});
		}

		content = data.content;
	}

	return <Content content={content} />;
}
