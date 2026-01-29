import Content from '../../../components/content';
import docsContent from '../../../../content/docs/docs.json';
import { ContentT } from '@/types/markdown';

export default async function SingleDocPage({
	params
}: {
	params: Promise<{ section: string }>;
}) {
	const { section } = await params;
	let content: ContentT;

	if (process.env.NODE_ENV === 'production') {
		const docContent = docsContent.find(
			doc => doc.slug === section && doc.section === 'docs'
		);

		content = docContent?.content;
	} else {
		// dynamically import the file
		const { getContentBySlugOnDev } = await import('@/lib/get-content-by-slug-on-dev');

		let data = await getContentBySlugOnDev({
			type: 'docs',
			slug: section,
			section: 'docs',
		});

		if (!data.content) {
			data = await getContentBySlugOnDev({
				type: 'docs',
				slug: 'index',
				section: section
			});
		}

		content = data.content;
	}

	return <Content content={content} />;
}
