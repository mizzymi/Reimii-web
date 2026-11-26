import Link from 'next/link';
import Image from 'next/image';
import {dictionary,metadata,logo} from '@/lib/site';
import {ProjectCards} from '@/components/project-cards';
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){const {locale}=await params;const t=dictionary(locale);return metadata(locale,'','Reimii Studios — '+t.hero.badge,t.hero.subtitle,logo)}
import HeroSection from '@/components/original/home/HeroSection';import StatsSection from '@/components/original/home/StatsSection';import FeaturedProjects from '@/components/original/home/FeaturedProjects';import CTASection from '@/components/original/home/CTASection';export default function Home(){return <><HeroSection/><StatsSection/><FeaturedProjects/><CTASection/></>}