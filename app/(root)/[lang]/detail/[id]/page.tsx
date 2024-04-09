import { getDictionary } from "@/lib/i18n";
import Image from 'next/image'
import Detail from "@/components/shared/Detail";

export default async function ({ params }: { params: { lang: string; id: string } }) {
    const dict = await getDictionary(params.lang)


    return (
        <div className="overflow-hidden px-2 py-20 sm:rounded-3xl sm:px-24">
            <Detail lang={params.lang} dict={dict} id={params.id} />
        </div>
    );
}
