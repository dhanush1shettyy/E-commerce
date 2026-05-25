"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, use, Suspense } from 'react';
import styles from '../shop.module.css';
import { PerfumeDetailInfo } from '../../../types/perfume';
import Image from 'next/image';
import Link from 'next/link';
import { addOrder, addToCart } from '@/lib/cartStorage';
import { toggleFavourite, isFavourite } from '@/lib/favoritesStorage';
import { Heart } from 'lucide-react';
import Footer from '@/components/Footer';
import { Product } from '@/lib/api';

function PerfumeDetailContent({ id }: { id: string }) {
    const [perfume, setPerfume] = useState<PerfumeDetailInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [isFav, setIsFav] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const from = searchParams.get('from');
    const backUrl = from === 'favourites' ? '/favourites' : '/shop';
    const backLabel = from === 'favourites' ? 'Back to Favourites' : 'Back to Shop';

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/shop/perfumes/${id}`);
                const data = await response.json();
                setPerfume(data);
            } catch (error) {
                console.error('Failed to fetch perfume', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfume();
    }, [id]);

    useEffect(() => {
        if (perfume) {
            setIsFav(isFavourite(perfume.id));
        }
    }, [perfume]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[var(--color-brand-black)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    if (!perfume) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-black)]">
                <h1 className="text-white text-center text-2xl font-[var(--font-playfair)]">Fragrance Not Found</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href={backUrl} className="text-[#D4AF37] hover:text-white transition-colors mb-8 inline-block group flex items-center gap-2">
                <span className="transition-transform group-hover:-translate-x-1">&larr;</span> {backLabel}
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                <div className={styles.productImageWrapper} style={{ height: '600px' }}>
                    <Image 
                        src={perfume.image_url} 
                        alt={`${perfume.brand_name} ${perfume.model_name}`}
                        width={320}
                        height={450}
                        className={styles.bottleImg}
                        style={{ width: 'auto', height: '80%', objectFit: 'contain' }}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <div className={styles.productBrand} style={{ textAlign: 'left', fontSize: '1.4rem' }}>{perfume.brand_name}</div>
                    <h1 className={styles.productTitle} style={{ textAlign: 'left', fontSize: '3.5rem', margin: '10px 0 20px', color: '#D4AF37', fontWeight: 300 }}>
                        {perfume.model_name}
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light tracking-wide">
                        {perfume.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8 text-gray-400">
                        <div><span className="text-[#D4AF37]">Form:</span> {perfume.item_form}</div>
                        <div><span className="text-[#D4AF37]">Volume:</span> {perfume.item_volume}</div>
                        <div><span className="text-[#D4AF37]">Audience:</span> {perfume.target_audience}</div>
                        <div><span className="text-[#D4AF37]">Scent:</span> {perfume.scent}</div>
                    </div>

                    <div className="flex items-center gap-6 mb-10">
                        <div className="text-4xl text-white font-light tracking-widest">
                            ₹{perfume.price.toLocaleString('en-IN')}
                        </div>
                        <button
                            onClick={() => {
                                const product: Product = {
                                    id: perfume.id,
                                    brand_name: perfume.brand_name,
                                    model_name: perfume.model_name,
                                    name: `${perfume.brand_name} ${perfume.model_name}`,
                                    description: perfume.description || "",
                                    price: perfume.price,
                                    image: perfume.image_url,
                                    image_url: perfume.image_url,
                                    gender: perfume.gender,
                                    rating: 4.5,
                                };
                                toggleFavourite(product);
                                setIsFav(!isFav);
                            }}
                            className={`p-3 rounded-full border transition-all ${
                                isFav 
                                    ? "bg-[var(--color-brand-gold)] border-[var(--color-brand-gold)] text-black" 
                                    : "border-white/10 text-white/40 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)]"
                            }`}
                        >
                            <Heart size={24} className={isFav ? "fill-current" : ""} />
                        </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                addToCart(perfume);
                                setActionMessage("Successfully added to your shopping bag.");
                            }}
                            className="bg-[#D4AF37] text-black font-semibold py-4 px-10 rounded hover:bg-white transition-colors uppercase tracking-widest text-sm w-max shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                addOrder(perfume);
                                router.push("/orders");
                            }}
                            className="border border-[#D4AF37] text-[#D4AF37] font-semibold py-4 px-10 rounded hover:bg-[#D4AF37] hover:text-black transition-colors uppercase tracking-widest text-sm w-max"
                        >
                            Buy Now
                        </button>
                    </div>
                    
                    {actionMessage && (
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
                            <span>{actionMessage}</span>
                            <Link
                                href="/cart"
                                className="uppercase tracking-widest text-[var(--color-brand-gold)] hover:text-white transition-colors text-xs underline underline-offset-4"
                            >
                                View shopping bag
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PerfumeDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    
    return (
        <>
            <div className={styles.pageContainer + " pt-32"}>
                <Suspense fallback={
                    <div className="flex justify-center items-center h-screen bg-[var(--color-brand-black)]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
                    </div>
                }>
                    <PerfumeDetailContent id={resolvedParams.id} />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}
