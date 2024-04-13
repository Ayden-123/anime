import Detail from "@/components/shared/Detail";
import { getDictionary } from "@/lib/i18n";
import { getImageDetailed } from '@/models/image';

const DetailPage = async ({ params }: { params: { lang: string; id: string } }) => {
    const dict = await getDictionary(params.lang)
    let image: Image = await getImageDetailed(params.id)

    return (
        <div className="overflow-hidden px-2 py-20 sm:rounded-3xl sm:px-24">
            <Detail lang={params.lang} dict={dict} id={params.id} image={image}/>
        </div>
    );
}

export default DetailPage;
