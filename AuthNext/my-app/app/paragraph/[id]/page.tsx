import ParagraphReader from '@/components/features/LanguageParagraph/ParagraphReader';

interface Params {
    params: { id: string };
}

export default function ParagraphPage({ params }: Params) {
    return <ParagraphReader />;
}
