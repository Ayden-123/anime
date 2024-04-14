import Detail from "@/components/shared/Detail";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { getImageDetailed } from '@/models/image';
import { Metadata } from "next";

export async function generateMetadata({
    params,
  }: {
    params: { lang: string; id: string }
  }): Promise<Metadata> {
    const dict = await getDictionary(params.lang);
  
    let description = ""
    if (params.id) {
        let image: Image = await getImageDetailed(params.id)
        if (image) {
            description = image.prompt
        }
    }

    return {
      description: `${dict.meta.meta_title} | ${description}`,
    };
  }

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
