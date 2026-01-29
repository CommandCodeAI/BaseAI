export const runtime = 'edge';

import Content from '../../../../components/content';
import docsContent from '../../../../../content/docs/docs.json';
import { ContentT } from '@/types/markdown';

export default async function SingleDocPage({
	params
}: {
	params: Promise<{ section: string; slug: string }>;
}) {
	const { section, slug } = await params;
	let content: ContentT;

	if (process.env.NODE_ENV === 'production') {
		const docContent = docsContent.find(
			doc => doc.slug === slug && doc.section === section
		);

		content = docContent?.content;
	} else {
		// dynamically import the file
		const { getContentBySlugOnDev } = await import('@/lib/get-content-by-slug-on-dev');

		const data = await getContentBySlugOnDev({
			type: 'docs',
			slug: slug,
			section: section,
		});

		content = data.content;
	}

	return <Content content={content} />;
}
